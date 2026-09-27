import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div aria-hidden className="backdrop pointer-events-none absolute inset-0 -z-10" />
      <div aria-hidden className="edge-glow pointer-events-none fixed inset-0 z-50" />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="mx-auto max-w-6xl px-5 pt-28 pb-24 sm:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
