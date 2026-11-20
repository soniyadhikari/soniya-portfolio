const VIEWS_KEY = 'portfolio:profile-views'
const IDEMPOTENCY_TTL_SECONDS = 60 * 60 * 24 * 7
const INCREMENT_ONCE_SCRIPT = `
  if redis.call('SET', KEYS[1], '1', 'NX', 'EX', ARGV[1]) then
    return redis.call('INCR', KEYS[2])
  end
  return tonumber(redis.call('GET', KEYS[2]) or '0')
`

async function redisCommand(url, token, command) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  })
  const result = await response.json()

  if (!response.ok || result.error) {
    throw new Error(`Upstash Redis request failed with status ${response.status}`)
  }

  return result.result
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const env = globalThis.process?.env
  const url = env?.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, '')
  const token = env?.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) {
    console.error('Profile views counter is missing its Upstash configuration')
    return res.status(503).json({ error: 'Profile views counter is not configured' })
  }

  let command
  if (req.method === 'POST') {
    const requestId = req.headers['idempotency-key']
    if (typeof requestId !== 'string' || !/^[\da-f]{8}(?:-[\da-f]{4}){3}-[\da-f]{12}$/i.test(requestId)) {
      return res.status(400).json({ error: 'A valid Idempotency-Key is required' })
    }
    command = [
      'EVAL',
      INCREMENT_ONCE_SCRIPT,
      2,
      `portfolio:profile-views:request:${requestId}`,
      VIEWS_KEY,
      IDEMPOTENCY_TTL_SECONDS,
    ]
  } else {
    command = ['GET', VIEWS_KEY]
  }

  try {
    const result = await redisCommand(url, token, command)
    const count = result === null ? 0 : Number(result)
    if (!Number.isSafeInteger(count) || count < 0) {
      throw new Error('Upstash Redis returned an invalid profile views count')
    }
    return res.status(200).json({ count })
  } catch (error) {
    console.error('Profile views counter request failed:', error)
    return res.status(502).json({ error: 'Unable to retrieve profile views' })
  }
}
