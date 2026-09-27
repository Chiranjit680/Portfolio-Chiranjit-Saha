import { Mail } from 'lucide-react'
import { profile, socials } from '../data/profile'
import { GitHubIcon, LeetCodeIcon, LinkedInIcon } from './BrandIcons'

const socialLinks = [
  { href: socials.github, label: 'GitHub', Icon: GitHubIcon },
  { href: socials.linkedin, label: 'LinkedIn', Icon: LinkedInIcon },
  { href: socials.leetcode, label: 'LeetCode', Icon: LeetCodeIcon },
  { href: `mailto:${profile.email}`, label: 'Email', Icon: Mail },
]

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map(({ href, label, Icon }) => {
        const external = !href.startsWith('mailto:')
        return (
          <li key={label}>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              aria-label={label}
              title={label}
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-raised hover:text-white"
            >
              <Icon size={17} />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
