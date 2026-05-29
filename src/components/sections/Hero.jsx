import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, MapPin, ArrowRight } from 'lucide-react'
import Typewriter from 'typewriter-effect'
import { PERSONAL, STATS, EDUCATION } from '../../data/portfolio'

const fadeUp = (delay = 0) => ({
  initial: { opacity:0, y:28 },
  animate: { opacity:1, y:0  },
  transition: { delay, duration: 0.7, ease:[0.16,1,0.3,1] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center
                 px-[clamp(20px,5vw,64px)] pt-10 pb-20 max-w-[1160px] mx-auto"
    >
      {/* LEFT */}
      <div>
        {/* Available badge */}
        <motion.div {...fadeUp(0)} className="inline-flex items-center gap-2 mb-6 px-3.5 py-1.5 rounded-[20px] border font-mono text-[10px] tracking-[.3em]"
          style={{ color:'var(--a2)', background:'var(--a2t)', borderColor:'color-mix(in srgb,var(--a2) 25%,transparent)' }}>
          <span className="w-[5px] h-[5px] rounded-full animate-pulse" style={{ background:'var(--a2)' }} />
          DUBAI, UAE · OPEN TO WORK
        </motion.div>

        <motion.p {...fadeUp(0.05)} className="text-base font-light mb-1" style={{ color:'var(--muted)' }}>
          Hello, I'm
        </motion.p>

        <motion.h1 {...fadeUp(0.1)} className="font-serif font-black leading-[1.0] tracking-tight mb-0"
          style={{ fontSize:'clamp(44px,6.5vw,80px)', color:'var(--text)' }}>
          Yog<br />
          <em className="not-italic" style={{ color:'var(--a1)' }}>Golakiya</em>
        </motion.h1>

        <motion.div {...fadeUp(0.15)}
          className="w-14 h-[3px] rounded-full my-5"
          style={{ background:'linear-gradient(90deg,var(--a4),var(--a1))' }}
        />

        {/* Typewriter role */}
        <motion.div {...fadeUp(0.2)} className="text-[clamp(16px,2vw,21px)] font-light mb-4 h-8" style={{ color:'var(--sub)' }}>
          <Typewriter options={{
            strings: [
              'Full-Stack Developer',
              'MERN Stack Engineer',
              'React.js & Node.js Dev',
              'AI Integration Builder',
              'PHP & MySQL Backend Dev',
            ],
            autoStart: true,
            loop: true,
            delay: 55,
            deleteSpeed: 30,
          }} />
        </motion.div>

        <motion.p {...fadeUp(0.25)} className="text-[15px] font-light leading-[1.88] max-w-[490px] mb-9" style={{ color:'var(--muted)' }}>
          {PERSONAL.summary}
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.3)} className="flex gap-3 flex-wrap mb-10">
          <a
            href="#projects"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' }) }}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[.12em] px-6 py-3 rounded-[7px] transition-all hover:opacity-85 hover:-translate-y-px"
            style={{ background:'var(--btn)', color:'var(--btnt)' }}
          >
            View Work <ArrowRight size={13} />
          </a>
          <a
            href="#about"
            onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior:'smooth' }) }}
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[.12em] px-6 py-3 rounded-[7px] border transition-all hover:-translate-y-px"
            style={{ border:'1.5px solid var(--a2)', color:'var(--a2)' }}
          >
            My Story
          </a>
          <a
            href={PERSONAL.cv}
            download
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[.12em] px-6 py-3 rounded-[7px] border transition-all hover:-translate-y-px"
            style={{ border:'1.5px solid var(--a3)', color:'var(--a3)' }}
          >
            <Download size={13} /> Resume
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div {...fadeUp(0.35)} className="flex items-center gap-4 mb-10">
          {[
            { href: PERSONAL.github,   Icon: Github,   label: 'GitHub'   },
            { href: PERSONAL.linkedin, Icon: Linkedin, label: 'LinkedIn' },
            { href: `mailto:${PERSONAL.email}`, Icon: Mail, label: 'Email' },
          ].map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full flex items-center justify-center border transition-all hover:scale-110 hover:border-[var(--a1)]"
              style={{ borderColor:'var(--border2)', background:'var(--surface)', color:'var(--sub)' }}
            >
              <Icon size={16} />
            </a>
          ))}
          <div className="flex items-center gap-1.5 text-[12px]" style={{ color:'var(--muted)' }}>
            <MapPin size={13} style={{ color:'var(--a4)' }} />
            Dubai, UAE
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div {...fadeUp(0.4)} className="flex gap-6 flex-wrap">
          {STATS.map(s => (
            <div key={s.l}>
              <div className="font-serif text-[26px] font-black leading-none" style={{ color:'var(--text)' }}>{s.n}</div>
              <div className="text-[12px] mt-0.5" style={{ color:'var(--muted)' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* RIGHT — cards */}
      <div className="flex flex-col gap-3.5">
        {/* Value card */}
        <motion.div
          {...fadeUp(0.2)}
          className="rounded-[16px] p-5 border relative overflow-hidden"
          style={{ background:'linear-gradient(135deg,var(--btn),color-mix(in srgb,var(--btn) 80%,transparent))', border:'1px solid var(--border)' }}
        >
          <p
            className="font-mono tracking-[.28em] mb-3"
            style={{ fontSize: 9, color:'color-mix(in srgb,var(--btnt) 45%,transparent)' }}
          >
            WHAT I DELIVER
          </p>
          <h3
            className="font-serif text-[18px] italic font-bold mb-2"
            style={{ color:'color-mix(in srgb,var(--btnt) 95%,transparent)' }}
          >
            Code that ships.
          </h3>
          <p
            className="text-[13px] font-light leading-[1.65] mb-4"
            style={{ color:'color-mix(in srgb,var(--btnt) 58%,transparent)' }}
          >
            Full-stack delivery from concept to production — React, Node.js, and AI in live systems.
          </p>
          <div className="flex flex-wrap gap-2">
            {['MERN Stack', 'AI Tools', 'Three.js', '6+ Shipped'].map(t => (
              <span
                key={t}
                className="font-mono tracking-[.1em] px-2.5 py-1 rounded-[6px]"
                style={{ fontSize: 9, background:'color-mix(in srgb,var(--btnt) 10%,transparent)', color:'color-mix(in srgb,var(--btnt) 65%,transparent)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <motion.div {...fadeUp(0.25)} className="grid grid-cols-4 gap-2.5">
          {[
            { n:'MERN', l:'Core stack', c:'a1' },
            { n:'PHP',  l:'Backend',   c:'a2' },
            { n:'AI',   l:'LLM tools', c:'a3' },
            { n:'3D',   l:'Three.js',  c:'a4' },
          ].map(s => (
            <div key={s.n}
              className="py-3.5 px-2 rounded-[10px] text-center border"
              style={{ background:'var(--surface)', borderColor:'var(--border)' }}
            >
              <div className="font-serif text-[18px] font-black leading-none" style={{ color:`var(--${s.c})` }}>{s.n}</div>
              <div className="text-[10px] mt-1.5" style={{ color:'var(--muted)' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>

        {/* UOWD card */}
        <motion.div
          {...fadeUp(0.3)}
          className="rounded-[16px] p-5 border"
          style={{ background:'var(--a2t)', borderColor:'color-mix(in srgb,var(--a2) 25%,transparent)' }}
        >
          <p className="font-mono text-[9px] tracking-[.25em] mb-1.5" style={{ color:'var(--a2)' }}>
            CURRENTLY STUDYING
          </p>
          <p className="font-serif text-[15px] font-bold mb-1" style={{ color:'var(--text)' }}>
            {EDUCATION[0].degree}
          </p>
          <p className="text-[12px]" style={{ color:'var(--muted)' }}>{EDUCATION[0].school}</p>
          <span
            className="inline-block font-mono text-[9px] tracking-[.12em] px-2.5 py-1 rounded-[12px] mt-2.5 border"
            style={{ color:'var(--a2)', background:'var(--a2t)', borderColor:'color-mix(in srgb,var(--a2) 25%,transparent)' }}
          >
            APR 2026 – PRESENT
          </span>
        </motion.div>
      </div>
    </section>
  )
}
