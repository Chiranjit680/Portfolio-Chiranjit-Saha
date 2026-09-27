import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Experience from './pages/Experience'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

const titles = {
  '/': 'Chiranjit Saha — Backend & AI Systems Engineer',
  '/experience': 'Experience — Chiranjit Saha',
  '/portfolio': 'Portfolio — Chiranjit Saha',
  '/contact': 'Contact — Chiranjit Saha',
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = titles[location.pathname] ?? 'Chiranjit Saha'
  }, [location.pathname])

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
