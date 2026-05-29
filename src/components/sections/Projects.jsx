import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, Calendar } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { PROJECTS } from '../../data/portfolio'

const TAG_FILTERS = ['All', 'CLIENT', 'PERSONAL', 'R&D']

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,
    transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] } },
}

export default function Projects() {
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.tags.includes(filter))

  return (
    <section
      id="projects"
      className="py-[clamp(70px,10vh,120px)] px-[clamp(20px,5vw,64px)]"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="max-w-[1160px] mx-auto">
        <SectionHeader
          num="04 — PROJECTS"
          title="What I've"
          italic="built"
          sub="Production-deployed work — real URLs, real clients, real code."
          colorLine="a3"
        />

        {/* Filter pills */}
        <div className="flex gap-2.5 flex-wrap mb-10 reveal-up">
          {TAG_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="font-mono text-[10px] tracking-[.12em] px-3.5 py-1.5 rounded-[20px] border transition-all"
              style={{
                borderColor: filter === f ? 'var(--a3)' : 'var(--border2)',
                color:       filter === f ? 'var(--a3)' : 'var(--sub)',
                background:  filter === f ? 'var(--a3t)' : 'transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid — AnimatePresence re-mounts cards on filter change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {visible.map(proj => (
              <motion.div
                key={proj.title}
                variants={cardVariants}
                className="rounded-[14px] border overflow-hidden flex flex-col group"
                style={{
                  background:    'var(--card)',
                  borderColor:   'var(--border)',
                  backdropFilter: 'blur(8px)',
                  transition:    'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(0,0,0,.18)' }}
              >
                {/* Thumb */}
                <div
                  className="h-[170px] relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, var(--${proj.color}t), color-mix(in srgb,var(--${proj.color}) 8%,var(--bg3)))`,
                  }}
                >
                  {/* Screenshot */}
                  {proj.image && (
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      style={{ zIndex: 1, opacity: 0.88 }}
                      onError={e => { e.currentTarget.style.display = 'none' }}
                    />
                  )}

                  {/* Gradient overlay for readability over photo */}
                  {proj.image && (
                    <div
                      className="absolute inset-0 z-[2]"
                      style={{ background: 'linear-gradient(to bottom,rgba(0,0,0,.08) 0%,rgba(0,0,0,.32) 100%)' }}
                    />
                  )}

                  {/* Faded text art — shown only when no screenshot */}
                  {!proj.image && (
                    <span
                      className="absolute inset-0 flex items-center justify-center font-serif font-black text-[72px] select-none leading-none"
                      style={{ color: `var(--${proj.color})`, opacity: 0.07 }}
                    >
                      {proj.title.split(' ')[0]}
                    </span>
                  )}

                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] z-[3]"
                    style={{ background: `linear-gradient(90deg,var(--${proj.color}),transparent)` }}
                  />

                  {/* Period badge */}
                  <div
                    className="absolute top-3 right-3 z-[3] font-mono text-[9px] tracking-[.1em] px-2 py-1 rounded-[6px] flex items-center gap-1"
                    style={{ background: 'var(--card)', color: 'var(--muted)', border: '1px solid var(--border)' }}
                  >
                    <Calendar size={9} />
                    {proj.period}
                  </div>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col gap-2.5 flex-1">
                  <div className="flex gap-1.5 flex-wrap">
                    {proj.tags.map(t => (
                      <span
                        key={t}
                        className="font-mono text-[9px] tracking-[.15em] px-2 py-[3px] rounded-[10px] border"
                        style={{
                          color:       t === 'LIVE' ? 'var(--a2)' : t === 'R&D' ? 'var(--a4)' : `var(--${proj.color})`,
                          background:  t === 'LIVE' ? 'var(--a2t)' : t === 'R&D' ? 'var(--a4t)' : `var(--${proj.color}t)`,
                          borderColor: t === 'LIVE'
                            ? 'color-mix(in srgb,var(--a2) 25%,transparent)'
                            : `color-mix(in srgb,var(--${proj.color}) 25%,transparent)`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <h3
                    className="font-serif text-[17px] font-bold tracking-tight transition-colors group-hover:text-[var(--a1)]"
                    style={{ color: 'var(--text)' }}
                  >
                    {proj.title}
                  </h3>

                  <p className="text-[13px] font-light leading-[1.7] flex-1" style={{ color: 'var(--muted)' }}>
                    {proj.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {proj.stack.map(s => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-[4px]"
                        style={{ color: 'var(--btnt)', background: 'var(--btn)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-2">
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.1em] px-3.5 py-2 rounded-[6px] transition-all hover:opacity-85 hover:-translate-y-px"
                        style={{ background: 'var(--btn)', color: 'var(--btnt)' }}
                      >
                        <ExternalLink size={12} /> Live
                      </a>
                    )}
                    <a
                      href={proj.code}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[.1em] px-3.5 py-2 rounded-[6px] border transition-all hover:border-[var(--a2)] hover:text-[var(--a2)]"
                      style={{ border: '1px solid var(--border2)', color: 'var(--sub)' }}
                    >
                      <Github size={12} /> Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
