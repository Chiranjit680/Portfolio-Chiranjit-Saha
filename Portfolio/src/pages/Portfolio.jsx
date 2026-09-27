import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Users } from 'lucide-react'
import { Page } from '../components/Motion'
import { PageHeader, Tag } from '../components/Section'
import { GitHubIcon } from '../components/BrandIcons'
import { projectCategories, projects } from '../data/profile'

function ProjectCard({ project: p }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25 }}
      className="card group flex flex-col p-6 transition-colors hover:border-accent/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-white">{p.title}</h2>
          <p className="mt-1 text-sm text-muted">{p.subtitle}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          {p.links.github && (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} on GitHub`}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-raised hover:text-white"
            >
              <GitHubIcon size={17} />
            </a>
          )}
          {p.links.demo && (
            <a
              href={p.links.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${p.title} demo`}
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-raised hover:text-white"
            >
              <ExternalLink size={17} />
            </a>
          )}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
        <span>{p.period}</span>
        {p.collaborative && (
          <span className="flex items-center gap-1 text-accent-2">
            <Users size={12} /> Collaborative
          </span>
        )}
      </div>

      <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-soft">
        {p.points.map((pt) => (
          <li key={pt} className="flex gap-2.5">
            <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
            {pt}
          </li>
        ))}
      </ul>

      <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
        {p.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </motion.article>
  )
}

export default function Portfolio() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? projects : projects.filter((p) => p.categories.includes(filter))

  return (
    <Page>
      <PageHeader eyebrow="Portfolio" title="Selected work">
        AI systems, backend infrastructure, and research: things I've designed, trained, and shipped.
      </PageHeader>

      <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
        {projectCategories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={filter === c}
            onClick={() => setFilter(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
              filter === c
                ? 'border-accent/50 bg-accent/10 text-white'
                : 'border-line text-muted hover:border-line hover:text-soft'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Page>
  )
}
