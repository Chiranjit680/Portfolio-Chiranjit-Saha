import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Briefcase, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react'
import { Page, Reveal } from '../components/Motion'
import { PageHeader, Section, Tag } from '../components/Section'
import PhotoSlot from '../components/PhotoSlot'
import { featuredExperience as ex, otherExperience } from '../data/profile'

function Lightbox({ photos, index, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onStep(1)
      if (e.key === 'ArrowLeft') onStep(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onStep])

  const photo = photos[index]
  const navBtn = 'absolute top-1/2 -translate-y-1/2 rounded-full bg-ink/70 p-2 text-soft hover:text-white'

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.caption}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-black/85 p-4 backdrop-blur-sm"
    >
      <figure className="relative max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        <img src={photo.src} alt={photo.caption} className="max-h-[80vh] rounded-xl object-contain" />
        <figcaption className="mt-3 text-center text-sm text-muted">{photo.caption}</figcaption>
        {photos.length > 1 && (
          <>
            <button type="button" aria-label="Previous photo" onClick={() => onStep(-1)} className={`${navBtn} left-2`}>
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label="Next photo" onClick={() => onStep(1)} className={`${navBtn} right-2`}>
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </figure>
      <button type="button" aria-label="Close" onClick={onClose} className="absolute top-5 right-5 p-2 text-soft hover:text-white">
        <X size={22} />
      </button>
    </motion.div>
  )
}

function Gallery() {
  const ready = ex.photos.filter((p) => p.src)
  const [active, setActive] = useState(null)
  const close = useCallback(() => setActive(null), [])
  const step = useCallback((d) => setActive((i) => (i + d + ready.length) % ready.length), [ready.length])

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {ex.photos.map((p, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <figure>
              <button
                type="button"
                disabled={!p.src}
                onClick={() => setActive(ready.indexOf(p))}
                className="group block aspect-[4/3] w-full overflow-hidden rounded-xl border border-line disabled:cursor-default"
                aria-label={p.src ? `Open ${p.caption}` : undefined}
              >
                <PhotoSlot
                  src={p.src}
                  alt={p.caption}
                  label={`Oracle photo ${i + 1}`}
                  position={p.position}
                  className="rounded-xl transition-transform duration-500 group-enabled:group-hover:scale-105"
                />
              </button>
              <figcaption className="mt-2 text-xs text-muted">{p.caption}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && <Lightbox photos={ready} index={active} onClose={close} onStep={step} />}
      </AnimatePresence>
    </>
  )
}

function Featured() {
  return (
    <Reveal className="card overflow-hidden">
      <div className="border-b border-line bg-gradient-to-br from-accent/10 via-transparent to-transparent p-6 sm:p-10">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <p className="mb-2 font-mono text-xs tracking-widest text-accent uppercase">Featured · {ex.period}</p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">{ex.company}</h2>
            <p className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-soft">
              <span className="flex items-center gap-1.5">
                <Briefcase size={15} className="text-muted" /> {ex.role}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={15} className="text-muted" /> {ex.location}
              </span>
            </p>
          </div>
          <dl className="grid grid-cols-3 gap-6">
            {ex.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd className="text-2xl font-semibold text-white">{m.value}</dd>
                <dd className="text-xs text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="mt-8">
          <p className="text-lg text-white">
            {ex.project} <span className="text-muted">— {ex.projectTagline}</span>
          </p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {ex.stack.map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-px bg-line md:grid-cols-2">
        {ex.points.map((p, i) => (
          <div key={p.title} className="bg-surface p-6 sm:p-8">
            <p className="font-mono text-xs text-accent">0{i + 1}</p>
            <h3 className="mt-2 font-medium text-white">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{p.text}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-line p-6 sm:p-8">
        <h3 className="mb-4 text-sm font-medium text-white">Life at Oracle</h3>
        <Gallery />
      </div>
    </Reveal>
  )
}

function Timeline() {
  return (
    <div className="relative ml-2 border-l border-line">
      {otherExperience.map((e, i) => (
        <Reveal key={e.role + e.period} delay={i * 0.05} className="relative pb-10 pl-8 last:pb-0">
          <span aria-hidden className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-ink bg-accent" />
          <div>
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <h3 className="font-medium text-white">
                {e.role} <span className="text-muted">· {e.org}</span>
              </h3>
              <p className="shrink-0 font-mono text-xs text-muted">{e.period}</p>
            </div>
            <p className="mt-1 text-sm text-muted">Supervisor: {e.supervisor}</p>
            <p className="mt-3 max-w-3xl leading-relaxed text-soft">{e.text}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {e.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  )
}

export default function Experience() {
  return (
    <Page>
      <PageHeader eyebrow="Experience" title="Where I've built things">
        From enterprise RAG at Oracle to research on reversible transformers and multi-agent debate.
      </PageHeader>
      <Featured />
      <Section eyebrow="Earlier" title="Research & internships">
        <Timeline />
      </Section>
    </Page>
  )
}
