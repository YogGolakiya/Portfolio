import { Briefcase, GraduationCap, Calendar } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { EXPERIENCE } from '../../data/portfolio'

const ICON_MAP = {
  a3: <GraduationCap size={16} />,
  a1: <Briefcase size={16} />,
  a2: <Briefcase size={16} />,
}

export default function Experience() {
  return (
    <section id="experience" className="py-[clamp(70px,10vh,120px)] px-[clamp(20px,5vw,64px)] max-w-[1160px] mx-auto">
      <SectionHeader num="03 — EXPERIENCE" title="Where I've" italic="worked" colorLine="a1" />

      {/* Timeline */}
      <div
        className="relative pl-7 before:content-[''] before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px"
        style={{ '--tw-before-bg':'var(--border2)' }}
      >
        <style>{`.exp-line::before { background: linear-gradient(to bottom, var(--a1), var(--border2), transparent); }`}</style>
        <div className="exp-line relative pl-7 before:content-[''] before:absolute before:left-[3px] before:top-2 before:bottom-2 before:w-px">
          {EXPERIENCE.map((exp, i) => (
            <div key={i} className="relative mb-9 last:mb-0 reveal-up" style={{ '--delay': `${i * 0.1}s` }}>
              {/* Node dot */}
              <div
                className="absolute left-[-28px] top-[6px] w-2 h-2 rounded-full"
                style={{
                  background: `var(--${exp.color})`,
                  boxShadow: `0 0 0 4px color-mix(in srgb,var(--${exp.color}) 15%,transparent)`,
                }}
              />

              <div
                className="rounded-[12px] border p-5 md:p-6 transition-all hover:border-[var(--a1)] group"
                style={{ background:'var(--card)', borderColor:'var(--border)', backdropFilter:'blur(8px)' }}
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-7 h-7 rounded-[6px] flex items-center justify-center flex-shrink-0"
                        style={{ background:`var(--${exp.color}t)`, color:`var(--${exp.color})` }}
                      >
                        {ICON_MAP[exp.color]}
                      </div>
                      <h3
                        className="font-serif text-[17px] font-bold transition-colors group-hover:text-[var(--a1)]"
                        style={{ color:'var(--text)' }}
                      >
                        {exp.title}
                      </h3>
                    </div>
                    <p className="font-mono text-[11px] tracking-[.1em] ml-9" style={{ color:`var(--${exp.color})` }}>
                      {exp.company}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1.5 font-mono text-[10px] tracking-[.12em] px-2.5 py-1.5 rounded-[6px] border flex-shrink-0"
                    style={{ color:'var(--muted)', borderColor:'var(--border)' }}
                  >
                    <Calendar size={11} />
                    {exp.period}
                  </div>
                </div>

                <ul className="mt-3 space-y-1.5 ml-9">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2 text-[13px] font-light leading-[1.7]" style={{ color:'var(--muted)' }}>
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background:`var(--${exp.color})` }} />
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 mt-4 ml-9">
                  {exp.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[11px] px-2 py-0.5 rounded-[4px] border"
                      style={{ color:'var(--sub)', background:'var(--bg2)', borderColor:'var(--border)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
