import { Reveal } from './Motion'

export function PageHeader({ eyebrow, title, children }) {
  return (
    <Reveal className="mb-14 max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</p>
      <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h1>
      {children && <p className="mt-5 text-lg leading-relaxed text-muted">{children}</p>}
    </Reveal>
  )
}

export function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-24 py-14 ${className}`}>
      <Reveal className="mb-8 flex items-baseline gap-4">
        <span className="font-mono text-xs tracking-widest text-accent uppercase">{eyebrow}</span>
        <h2 className="text-2xl font-semibold tracking-tight text-white">{title}</h2>
        <span aria-hidden className="h-px flex-1 bg-line" />
      </Reveal>
      {children}
    </section>
  )
}

export function Tag({ children }) {
  return (
    <span className="rounded-md border border-line bg-raised/60 px-2 py-0.5 font-mono text-[11px] text-soft">
      {children}
    </span>
  )
}
