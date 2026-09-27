import { Component, Suspense, lazy, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import StaticArchitecture from './StaticArchitecture'

// three.js is ~700 KB, so it loads in its own chunk after the page paints.
const ArchitectureScene = lazy(() => import('./ArchitectureScene'))

// Falls back to the static drawing if WebGL is unavailable or the scene throws.
class SceneBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

const isLite = () =>
  window.matchMedia('(max-width: 767px)').matches ||
  (navigator.hardwareConcurrency ?? 8) <= 4 ||
  window.matchMedia('(pointer: coarse)').matches

export default function HeroBackdrop({ containerRef }) {
  const reduceMotion = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const [lite] = useState(isLite)

  // Stop rendering frames once the hero scrolls out of view.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [containerRef])

  const fallback = <StaticArchitecture />

  return (
    <div aria-hidden className="absolute -top-28 bottom-0 left-1/2 w-screen -translate-x-1/2">
      {reduceMotion ? (
        fallback
      ) : (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={fallback}>
            <ArchitectureScene eventSource={containerRef} active={visible} lite={lite} />
          </Suspense>
        </SceneBoundary>
      )}

      {/* Keep the hero text readable over the scene */}
      <div className="pointer-events-none absolute inset-0 bg-ink/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-ink lg:via-ink/70 lg:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
    </div>
  )
}
