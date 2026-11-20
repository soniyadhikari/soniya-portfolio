import { useEffect, useRef, useState } from 'react'
import { Eye } from 'lucide-react'

export default function ProfileViewsCounter() {
  const [count, setCount] = useState(null)
  const [status, setStatus] = useState('loading')
  const requestId = useRef(null)

  if (requestId.current === null) {
    requestId.current = crypto.randomUUID()
  }

  useEffect(() => {
    let active = true

    async function recordView() {
      try {
        const response = await fetch('/api/profile-views', {
          method: 'POST',
          headers: { 'Idempotency-Key': requestId.current },
        })
        const result = await response.json()

        if (!response.ok || !Number.isSafeInteger(result.count) || result.count < 0) {
          throw new Error(result.error || 'Invalid profile views response')
        }

        if (active) {
          setCount(result.count)
          setStatus('success')
        }
      } catch (error) {
        console.error('Unable to load profile views:', error)
        if (active) setStatus('error')
      }
    }

    recordView()
    return () => {
      active = false
    }
  }, [])

  const label = status === 'success'
    ? `Profile views: ${count.toLocaleString()}`
    : status === 'loading' ? 'Loading profile views' : 'Profile views unavailable'
  const displayCount = status === 'success' ? count.toLocaleString() : status === 'loading' ? '…' : '—'

  return (
    <span
      className={`profile-views profile-views-${status}`}
      role="status"
      aria-label={label}
      aria-busy={status === 'loading'}
      title={label}
    >
      <Eye size={16} aria-hidden="true" />
      <span className="profile-views-count" aria-hidden="true">{displayCount}</span>
    </span>
  )
}
