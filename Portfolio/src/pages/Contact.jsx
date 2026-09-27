import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send } from 'lucide-react'
import { Page, Reveal } from '../components/Motion'
import { PageHeader } from '../components/Section'
import { GitHubIcon, LinkedInIcon } from '../components/BrandIcons'
import { formspreeId, profile, socials } from '../data/profile'

const channels = [
  { label: 'LinkedIn', note: 'Best for opportunities', href: socials.linkedin, Icon: LinkedInIcon },
  { label: 'GitHub', note: 'Code & experiments', href: socials.github, Icon: GitHubIcon },
]

const field =
  'w-full rounded-xl border border-line bg-ink/60 px-4 py-3 text-soft placeholder:text-muted/60 transition-colors focus:border-accent/60 focus:outline-none'

function EmailCard() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  }

  return (
    <div className="card flex items-center gap-4 p-5">
      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-raised text-accent">
        <Mail size={19} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-muted">Email</p>
        <a href={`mailto:${profile.email}`} className="block truncate text-white hover:text-accent">
          {profile.email}
        </a>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy email address"
        className="grid size-9 shrink-0 place-items-center rounded-full text-muted hover:bg-raised hover:text-white"
      >
        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
      </button>
    </div>
  )
}

function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)

    // No form service configured yet: hand off to the visitor's mail client.
    if (!formspreeId) {
      const subject = encodeURIComponent(`Portfolio enquiry from ${data.get('name')}`)
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error()
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="card grid min-h-80 place-items-center p-8 text-center">
        <div>
          <div className="mx-auto grid size-12 place-items-center rounded-full bg-emerald-400/10 text-emerald-400">
            <Check size={22} />
          </div>
          <h2 className="mt-4 text-xl font-medium text-white">Message sent</h2>
          <p className="mt-2 text-muted">Thanks for reaching out. I'll get back to you soon.</p>
          <button type="button" onClick={() => setStatus('idle')} className="mt-6 text-sm text-accent hover:underline">
            Send another
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-soft">Name</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Jane Doe" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-soft">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} placeholder="jane@company.com" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-soft">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${field} resize-y`}
          placeholder="Tell me about the role, project, or idea…"
        />
      </label>
      {/* Honeypot for bots; Formspree ignores submissions that fill it */}
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className="text-sm text-muted" aria-live="polite">
          {status === 'error' && <span className="text-red-400">Something went wrong. Please email me directly.</span>}
        </p>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
        >
          {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </button>
      </div>
    </form>
  )
}

export default function Contact() {
  return (
    <Page>
      <PageHeader eyebrow="Contact" title="Let's talk">
        I'm looking for AI engineering, backend, and full-stack roles. If you're hiring or building something interesting,
        drop me a line.
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <Reveal className="space-y-3">
          <EmailCard />
          {channels.map(({ label, note, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="card group flex items-center gap-4 p-5 transition-colors hover:border-accent/40"
            >
              <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-line bg-raised text-soft group-hover:text-white">
                <Icon size={19} />
              </div>
              <div className="flex-1">
                <p className="text-white">{label}</p>
                <p className="text-sm text-muted">{note}</p>
              </div>
              <ArrowUpRight size={18} className="text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </a>
          ))}
        </Reveal>
        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Page>
  )
}
