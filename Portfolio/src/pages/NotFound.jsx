import { Link } from 'react-router-dom'
import { Page } from '../components/Motion'

export default function NotFound() {
  return (
    <Page>
      <div className="grid min-h-[50vh] place-items-center text-center">
        <div>
          <p className="font-mono text-sm text-accent">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Page not found</h1>
          <Link to="/" className="mt-6 inline-block text-sm text-muted hover:text-white">
            ← Back home
          </Link>
        </div>
      </div>
    </Page>
  )
}
