import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Download, GraduationCap, MapPin, Users } from 'lucide-react'
import { Page, Reveal } from '../components/Motion'
import { Section, Tag } from '../components/Section'
import PhotoSlot from '../components/PhotoSlot'
import SocialLinks from '../components/SocialLinks'
import HeroBackdrop from '../components/hero/HeroBackdrop'
import { achievements, education, highlights, leadership, profile, skills } from '../data/profile'

const ease = [0.22, 1, 0.36, 1]

function Hero() {
  const ref = useRef(null)
  return (
    <section ref={ref} className="relative flex min-h-[min(calc(100svh-7rem),56rem)] items-center pb-16">
      <HeroBackdrop containerRef={ref} />
      <div className="relative w-full max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs text-muted"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
          </span>
          Open to {profile.openTo}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease }}
          className="text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease }}
          className="mt-4 text-2xl font-medium tracking-tight sm:text-3xl"
        >
          <span className="text-gradient">{profile.role}</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18, ease }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
        >
          I build production AI systems: retrieval pipelines, multi-agent orchestration, and the fast, reliable backends
          underneath them.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24, ease }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          {profile.resumeUrl && (
            <a
              href={profile.resumeUrl}
              download={profile.resumeFileName}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              <Download size={16} /> Download CV
            </a>
          )}
          <Link
            to="/portfolio"
            className="group inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-soft transition-colors hover:border-accent/50 hover:text-white"
          >
            View projects
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
          <SocialLinks className="ml-1" />
        </motion.div>
      </div>
    </section>
  )
}

function Highlights() {
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
      {highlights.map((h, i) => (
        <Reveal key={h.label} delay={i * 0.05} className="bg-surface px-6 py-6">
          <p className="text-3xl font-semibold tracking-tight text-white">{h.value}</p>
          <p className="mt-1 text-sm text-muted">{h.label}</p>
        </Reveal>
      ))}
    </div>
  )
}

function About() {
  return (
    <Section id="about" eyebrow="01" title="About">
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <Reveal className="space-y-5 text-lg leading-relaxed text-soft">
          {profile.about.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1} className="space-y-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-surface">
            <PhotoSlot src={profile.photo} alt={profile.name} label="Your photo" position="center top" className="rounded-2xl" />
          </div>
          <div className="card space-y-4 p-6 text-sm">
            <div>
              <p className="font-mono text-xs text-muted uppercase">Focus</p>
              <ul className="mt-2 space-y-1.5 text-soft">
                {profile.focus.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent">▹</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center gap-2 border-t border-line pt-4 text-muted">
              <MapPin size={15} /> {profile.location}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}

function Education() {
  return (
    <Section id="education" eyebrow="02" title="Education">
      <div className="space-y-4">
        {education.map((e) => (
          <Reveal key={e.school} className="card flex flex-col gap-5 p-6 sm:flex-row sm:p-8">
            <div className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-raised text-accent">
              <GraduationCap size={22} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                <h3 className="text-lg font-medium text-white">{e.school}</h3>
                <p className="font-mono text-xs text-muted">{e.period}</p>
              </div>
              <p className="mt-1 text-soft">{e.degree}</p>
              <p className="mt-3 inline-block rounded-md bg-accent/10 px-2.5 py-1 font-mono text-xs text-accent">
                {e.detail}
              </p>
              {e.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {e.coursework.map((c) => (
                    <Tag key={c}>{c}</Tag>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Skills() {
  return (
    <Section id="skills" eyebrow="03" title="Skills">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={(i % 3) * 0.05} className="card p-5">
            <h3 className="mb-3 text-sm font-medium text-white">{s.group}</h3>
            <div className="flex flex-wrap gap-1.5">
              {s.items.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

function Recognition() {
  return (
    <Section id="recognition" eyebrow="04" title="Achievements & Leadership">
      <div className="grid gap-4 md:grid-cols-2">
        <Reveal className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
            <Award size={16} className="text-accent" /> Achievements
          </h3>
          <ul className="space-y-4">
            {achievements.map((a) => (
              <li key={a.title} className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-soft">{a.title}</p>
                  <p className="text-sm text-muted">{a.detail}</p>
                </div>
                {a.year && <span className="font-mono text-xs text-muted">{a.year}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.08} className="card p-6">
          <h3 className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
            <Users size={16} className="text-accent" /> Leadership
          </h3>
          <ul className="space-y-4">
            {leadership.map((l) => (
              <li key={l.title} className="flex items-baseline justify-between gap-4">
                <div>
                  <p className="text-soft">{l.title}</p>
                  <p className="text-sm text-muted">{l.org}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-muted">{l.period}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  )
}

function CallToAction() {
  return (
    <Reveal className="card relative mt-10 overflow-hidden p-8 text-center sm:p-12">
      <div aria-hidden className="absolute inset-x-0 -top-24 mx-auto h-48 w-2/3 rounded-full bg-accent/20 blur-3xl" />
      <h2 className="relative text-2xl font-semibold tracking-tight text-white sm:text-3xl">
        Building something with LLMs or distributed systems?
      </h2>
      <p className="relative mx-auto mt-3 max-w-lg text-muted">I'd love to hear about it.</p>
      <div className="relative mt-7 flex flex-wrap justify-center gap-3">
        <Link
          to="/contact"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
        >
          Get in touch
        </Link>
        <Link
          to="/experience"
          className="rounded-full border border-line px-5 py-2.5 text-sm text-soft transition-colors hover:border-accent/50 hover:text-white"
        >
          See my experience
        </Link>
      </div>
    </Reveal>
  )
}

export default function Home() {
  return (
    <Page>
      <Hero />
      <Highlights />
      <About />
      <Education />
      <Skills />
      <Recognition />
      <CallToAction />
    </Page>
  )
}
