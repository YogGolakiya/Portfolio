import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Palette, Check } from 'lucide-react'
import { THEMES } from '../../data/portfolio'

const NAV_LINKS = [
  { label: 'Profile',    href: '#profile'    },
  { label: 'About',      href: '#about'      },
  { label: 'Skills',     href: '#skills'     },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects',   href: '#projects'   },
  { label: 'Apps',       href: '#apps'       },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar({ theme, setTheme }) {
  const [scrolled,     setScrolled]     = useState(false)
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [themeOpen,    setThemeOpen]    = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['hero','profile','about','skills','experience','projects','apps','contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.5) {
          setActiveSection(id)
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-[clamp(20px,5vw,64px)] h-16 transition-all"
      style={{
        background: scrolled ? 'var(--nav-bg)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      }}
    >
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        {/* Gradient-ring logo circle */}
        <div
          className="w-9 h-9 rounded-full p-[2.5px] flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,var(--a1),var(--a3))' }}
        >
          <div
            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center"
            style={{ background: 'var(--bg3)' }}
          >
            <img
              src="/logo.png"
              alt="YG"
              className="w-full h-full object-cover"
              onError={e => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.parentElement.innerHTML =
                  `<span style="font-family:'Dancing Script',cursive;font-weight:700;font-size:15px;color:var(--a1)">YG</span>`
              }}
            />
          </div>
        </div>

        {/* Name — two-tone serif */}
        <div className="flex items-baseline gap-1 leading-none">
          <span
            className="font-serif font-black"
            style={{ fontSize: 16, color: 'var(--text)' }}
          >
            Yog
          </span>
          <span
            className="font-serif font-black"
            style={{ fontSize: 16, color: 'var(--a1)' }}
          >
            Golakiya
          </span>
        </div>
      </div>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-1">
        {NAV_LINKS.map(link => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="text-[13px] px-3.5 py-1.5 rounded-[20px] transition-all"
            style={{
              color: activeSection === link.href.slice(1) ? 'var(--a1)' : 'var(--sub)',
              background: activeSection === link.href.slice(1) ? 'var(--a1t)' : 'transparent',
            }}
          >
            {link.label}
          </button>
        ))}

        {/* Theme switcher */}
        <div className="relative ml-2">
          <button
            onClick={() => setThemeOpen(p => !p)}
            className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110"
            style={{ borderColor:'var(--border2)', background:'var(--surface)' }}
            title="Switch theme"
          >
            <Palette size={14} style={{ color:'var(--sub)' }} />
          </button>

          <AnimatePresence>
            {themeOpen && (
              <motion.div
                initial={{ opacity:0, y:-8, scale:0.95 }}
                animate={{ opacity:1, y:0,  scale:1    }}
                exit={{    opacity:0, y:-8, scale:0.95 }}
                transition={{ duration:0.2 }}
                className="absolute right-0 top-10 rounded-[14px] p-3 min-w-[158px] shadow-xl"
                style={{ background:'var(--nav-bg)', border:'1px solid var(--border2)', backdropFilter:'blur(20px)' }}
              >
                <p className="font-mono text-[9px] tracking-[.25em] px-1 mb-2" style={{ color:'var(--muted)' }}>
                  THEME
                </p>
                {THEMES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTheme(t.id); setThemeOpen(false) }}
                    className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-[8px] transition-all"
                    style={{ background: theme === t.id ? 'var(--a1t)' : 'transparent' }}
                  >
                    <div
                      className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white/30"
                      style={{ background: t.swatch }}
                    />
                    <span className="text-[13px]" style={{ color:'var(--text)' }}>{t.label}</span>
                    {theme === t.id && <Check size={12} className="ml-auto" style={{ color:'var(--a1)' }} />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={() => scrollTo('#contact')}
          className="ml-2 font-mono text-[11px] tracking-[.12em] px-5 py-2 rounded-[20px] transition-all hover:opacity-85 hover:-translate-y-px"
          style={{ background:'var(--btn)', color:'var(--btnt)' }}
        >
          Hire Me
        </button>
      </div>

      {/* Mobile toggle */}
      <button
        className="md:hidden p-2 rounded-lg"
        onClick={() => setMobileOpen(p => !p)}
        style={{ color:'var(--sub)' }}
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity:0, y:-10 }}
            animate={{ opacity:1, y:0   }}
            exit={{    opacity:0, y:-10 }}
            transition={{ duration:0.2 }}
            className="absolute top-[65px] left-0 right-0 p-4 flex flex-col gap-1 md:hidden z-50"
            style={{ background:'var(--nav-bg)', backdropFilter:'blur(20px)', borderBottom:'1px solid var(--border)' }}
          >
            {NAV_LINKS.map(link => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left text-[14px] py-3 border-b"
                style={{ color:'var(--sub)', borderColor:'var(--border)' }}
              >
                {link.label}
              </button>
            ))}
            {/* Mobile theme row */}
            <div className="flex gap-2 pt-3 flex-wrap">
              {THEMES.map(t => (
                <button
                  key={t.id}
                  onClick={() => { setTheme(t.id); setMobileOpen(false) }}
                  className="w-6 h-6 rounded-full border-2 transition-all"
                  style={{
                    background: t.swatch,
                    borderColor: theme === t.id ? 'var(--text)' : 'transparent',
                    transform: theme === t.id ? 'scale(1.2)' : 'scale(1)',
                  }}
                  title={t.label}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
