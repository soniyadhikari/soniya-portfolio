import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="not-found">
      <span>404</span>
      <h1>Route not found.</h1>
      <p>The page you’re looking for has moved, or never existed.</p>
      <Link className="button" to="/">Return home</Link>
    </main>
  )
}
