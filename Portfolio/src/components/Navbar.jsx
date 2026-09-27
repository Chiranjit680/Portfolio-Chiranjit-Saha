import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../data/profile'

const links = [
  { to: '/', label: 'Home' },
  { to: '/experience', label: 'Experience' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled || open ? 'border-b border-line/70 bg-ink/80 backdrop-blur-lg' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" onClick={() => setOpen(false)} className="font-mono text-sm tracking-tight text-white">
          <span className="text-accent">~/</span>
          {profile.name.toLowerCase().replace(' ', '-')}
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative block rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive ? 'text-white' : 'text-muted hover:text-soft'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full border border-line bg-raised"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    {l.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            download={profile.resumeFileName}
            className="hidden rounded-full border border-accent/40 px-4 py-2 text-sm text-accent transition-colors hover:bg-accent/10 md:inline-block"
          >
            Resume
          </a>
        ) : (
          <span className="hidden w-24 md:block" />
        )}

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-lg p-2 text-soft md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block border-b border-line/60 py-3 text-base ${isActive ? 'text-white' : 'text-muted'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
            {profile.resumeUrl && (
              <li className="py-4">
                <a href={profile.resumeUrl} download={profile.resumeFileName} className="text-accent">
                  Download resume
                </a>
              </li>
            )}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  )
}
