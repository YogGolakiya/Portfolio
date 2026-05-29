import { Github, Linkedin, Mail, Globe, ArrowUp } from 'lucide-react'
import { PERSONAL } from '../../data/portfolio'

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top:0, behavior:'smooth' })

  return (
    <footer
      className="border-t px-[clamp(20px,5vw,64px)] py-7 flex items-center justify-between flex-wrap gap-4"
      style={{ background:'var(--btn)', borderColor:'rgba(255,255,255,.06)' }}
    >
      <div className="font-serif text-[18px] font-black" style={{ color:'var(--btnt)' }}>
        Yog Golakiya
      </div>

      <div className="flex items-center gap-5">
        {[
          { href:PERSONAL.github,    Icon:Github,   label:'GitHub'   },
          { href:PERSONAL.linkedin,  Icon:Linkedin, label:'LinkedIn' },
          { href:`mailto:${PERSONAL.email}`, Icon:Mail, label:'Email' },
          { href:PERSONAL.portfolio, Icon:Globe,    label:'Portfolio' },
        ].map(({ href, Icon, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="font-mono text-[10px] tracking-[.15em] flex items-center gap-1.5 transition-colors hover:text-[var(--a1)]"
            style={{ color:'rgba(245,240,232,.35)' }}
          >
            <Icon size={13} />
            <span className="hidden sm:inline">{label}</span>
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <p className="text-[12px]" style={{ color:'rgba(245,240,232,.25)' }}>
          © 2026 · Dubai, UAE
        </p>
        <button
          onClick={scrollTop}
          className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110"
          style={{ borderColor:'rgba(255,255,255,.15)', color:'rgba(245,240,232,.4)' }}
          aria-label="Back to top"
        >
          <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
