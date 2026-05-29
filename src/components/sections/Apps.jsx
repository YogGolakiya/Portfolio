import { motion } from 'framer-motion'
import { ExternalLink, Github, Apple, Smartphone } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import Tag from '../ui/Tag'
import { APPS } from '../../data/portfolio'

const fade = (i) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
})

function PlatformBadge({ label }) {
  const isIOS  = label === 'iOS'
  const isAnd  = label === 'Android'
  return (
    <span
      className="inline-flex items-center gap-1 font-mono text-[9px] tracking-[.12em] px-2 py-0.5 rounded-[6px] border"
      style={{
        color:        isIOS ? 'var(--text)'  : isAnd ? 'var(--a2)' : 'var(--a3)',
        background:   isIOS ? 'var(--surface)' : isAnd ? 'var(--a2t)' : 'var(--a3t)',
        borderColor:  isIOS
          ? 'var(--border2)'
          : isAnd
            ? 'color-mix(in srgb,var(--a2) 30%,transparent)'
            : 'color-mix(in srgb,var(--a3) 30%,transparent)',
      }}
    >
      {isIOS  && <Apple    size={9} />}
      {isAnd  && <Smartphone size={9} />}
      {label}
    </span>
  )
}

export default function Apps() {
  return (
    <section
      id="apps"
      className="py-[clamp(70px,10vh,120px)] px-[clamp(20px,5vw,64px)]"
      style={{ background: 'var(--bg)' }}
    >
      <div className="max-w-[1160px] mx-auto">
        <SectionHeader
          num="05 — APPS"
          title="Mobile"
          italic="applications"
          sub="Shipped apps beyond the browser — real users, real stores."
          colorLine="a4"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 reveal-up">
          {APPS.map((app, i) => (
            <motion.div
              key={app.title}
              {...fade(i)}
              className="rounded-[16px] border overflow-hidden group transition-all hover:-translate-y-1"
              style={{
                background:   'var(--card)',
                borderColor:  'var(--border)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* App hero band — fixed 220px height */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 220,
                  background: `linear-gradient(160deg, var(--${app.color}t), color-mix(in srgb,var(--${app.color}) 10%,transparent))`,
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {/* Screenshot */}
                {app.image ? (
                  <>
                    <img
                      src={app.image}
                      alt={app.title}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      style={{ zIndex: 1 }}
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                    {/* Scrim so badges are readable */}
                    <div
                      className="absolute inset-0 z-[2]"
                      style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,.04) 30%,rgba(0,0,0,.60) 100%)' }}
                    />
                  </>
                ) : (
                  /* No-image fallback — centred glow + icon */
                  <>
                    <div
                      className="absolute inset-0"
                      style={{ background: `radial-gradient(circle at 50% 70%,color-mix(in srgb,var(--${app.color}) 22%,transparent),transparent 68%)` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span
                        className="text-[58px] leading-none select-none"
                        whileHover={{ scale: 1.1, rotate: [-3, 3, -2, 0] }}
                        transition={{ duration: 0.35 }}
                      >
                        {app.icon}
                      </motion.span>
                    </div>
                  </>
                )}

                {/* Status + platform badges — always at bottom */}
                <div
                  className="absolute bottom-4 left-4 z-[3] flex flex-wrap items-center gap-2"
                >
                  <span
                    className="font-mono text-[9px] tracking-[.18em] px-2.5 py-1 rounded-[8px] border"
                    style={{
                      color:          `var(--${app.color})`,
                      background:     'rgba(0,0,0,.42)',
                      borderColor:    `color-mix(in srgb,var(--${app.color}) 50%,transparent)`,
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {app.status}
                  </span>
                  {app.platform.map(p => <PlatformBadge key={p} label={p} />)}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <p
                  className="font-serif text-[18px] font-bold mb-0.5"
                  style={{ color: 'var(--text)' }}
                >
                  {app.title}
                </p>
                <p
                  className="text-[12px] italic mb-3"
                  style={{ color: `var(--${app.color})` }}
                >
                  {app.tagline}
                </p>
                <p
                  className="text-[13px] font-light leading-[1.75] mb-4"
                  style={{ color: 'var(--muted)' }}
                >
                  {app.desc}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {app.tech.map(t => (
                    <span
                      key={t}
                      className="font-mono text-[9px] tracking-[.1em] px-2 py-0.5 rounded-[6px] border"
                      style={{
                        color:       `var(--${app.color})`,
                        background:  `var(--${app.color}t)`,
                        borderColor: `color-mix(in srgb,var(--${app.color}) 22%,transparent)`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {app.ios && (
                    <a
                      href={app.ios}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.1em] px-3.5 py-2 rounded-[8px] border transition-all hover:-translate-y-px"
                      style={{ background: 'var(--surface)', borderColor: 'var(--border2)', color: 'var(--text)' }}
                    >
                      <Apple size={12} /> App Store
                    </a>
                  )}
                  {app.android && (
                    <a
                      href={app.android}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.1em] px-3.5 py-2 rounded-[8px] border transition-all hover:-translate-y-px"
                      style={{ background: 'var(--a2t)', borderColor: 'color-mix(in srgb,var(--a2) 30%,transparent)', color: 'var(--a2)' }}
                    >
                      <Smartphone size={12} /> Play Store
                    </a>
                  )}
                  {app.live && (
                    <a
                      href={app.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.1em] px-3.5 py-2 rounded-[8px] border transition-all hover:-translate-y-px"
                      style={{
                        background:  `var(--${app.color}t)`,
                        borderColor: `color-mix(in srgb,var(--${app.color}) 30%,transparent)`,
                        color:       `var(--${app.color})`,
                      }}
                    >
                      <ExternalLink size={12} /> Live
                    </a>
                  )}
                  {app.code && (
                    <a
                      href={app.code}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110 ml-auto"
                      style={{ borderColor: 'var(--border2)', color: 'var(--sub)', background: 'var(--surface)' }}
                    >
                      <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
