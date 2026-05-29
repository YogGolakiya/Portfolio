import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, MapPin } from 'lucide-react'
import { PERSONAL } from '../../data/portfolio'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.65, ease: [0.16, 1, 0.3, 1] },
})

export default function Profile() {
  return (
    <section
      id="profile"
      className="py-[clamp(60px,9vh,110px)] px-[clamp(20px,5vw,64px)]"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="max-w-[1160px] mx-auto grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-12 lg:gap-16 items-center">

        {/* ── LEFT — Photo frame ── */}
        <motion.div
          className="reveal-left flex justify-center lg:justify-start"
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-full max-w-[380px]">
            {/* Gradient border ring */}
            <div
              className="rounded-[22px] p-[3px] relative"
              style={{
                background: 'linear-gradient(145deg,var(--a1),var(--a3),var(--a4),var(--a2))',
              }}
            >
              {/* Photo container */}
              <div
                className="rounded-[20px] overflow-hidden relative"
                style={{ aspectRatio: '4/5', background: 'var(--bg3)' }}
              >
                {/* Placeholder — shown when no photo */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(160deg,var(--a1t),var(--a3t))',
                  }}
                >
                  <span
                    className="font-serif font-black select-none"
                    style={{ fontSize: 96, lineHeight: 1, color: 'var(--a1)', opacity: 0.25 }}
                  >
                    YG
                  </span>
                  <p
                    className="font-mono text-[9px] tracking-[.2em]"
                    style={{ color: 'var(--muted)' }}
                  >
                    ADD PHOTO → /public/yog-photo.jpg
                  </p>
                </div>

                {/* Actual photo (covers placeholder when present) */}
                <img
                  src="/profile.jpeg"
                  alt="Yog Golakiya"
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  style={{ zIndex: 1 }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />

                {/* Bottom gradient overlay (sits on top of photo) */}
                <div
                  className="absolute inset-x-0 bottom-0 z-[2]"
                  style={{
                    height: '42%',
                    background: 'linear-gradient(to top,rgba(0,0,0,.62),transparent)',
                  }}
                />

                {/* Name overlay at bottom */}
                <div className="absolute bottom-5 left-5 z-[3]">
                  <p
                    className="font-mono tracking-[.2em] mb-1"
                    style={{ fontSize: 9, color: 'rgba(255,255,255,.55)' }}
                  >
                    FULL-STACK DEVELOPER
                  </p>
                  <p
                    className="font-serif font-black"
                    style={{ fontSize: 20, color: '#fff', textShadow: '0 2px 8px rgba(0,0,0,.4)' }}
                  >
                    Yog Golakiya
                  </p>
                </div>
              </div>
            </div>

            {/* YG badge — top right corner */}
            <motion.div
              className="absolute -top-3 -right-3 w-11 h-11 rounded-[11px] flex items-center justify-center font-serif text-[13px] font-black shadow-lg"
              style={{ background: 'var(--btn)', color: 'var(--btnt)', zIndex: 10 }}
              initial={{ scale: 0, rotate: -12 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.55, duration: 0.45, ease: 'backOut' }}
            >
              YG
            </motion.div>

            {/* Available badge — bottom right */}
            <motion.div
              className="absolute -bottom-4 right-4 flex items-center gap-2 px-3.5 py-2 rounded-full border shadow-lg"
              style={{
                background: 'var(--nav-bg)',
                borderColor: 'var(--border)',
                backdropFilter: 'blur(12px)',
                zIndex: 10,
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: 'var(--a2)', flexShrink: 0 }}
              />
              <span
                className="font-mono tracking-[.14em]"
                style={{ fontSize: 9, color: 'var(--a2)' }}
              >
                AVAILABLE FOR HIRE
              </span>
            </motion.div>
          </div>
        </motion.div>

        {/* ── RIGHT — Identity ── */}
        <div className="reveal-right space-y-5">

          {/* Label */}
          <motion.p
            {...fadeUp(0.1)}
            className="font-mono tracking-[.38em]"
            style={{ fontSize: 9, color: 'var(--a1)' }}
          >
            00 — PROFILE
          </motion.p>

          {/* Name */}
          <motion.div {...fadeUp(0.15)}>
            <h2
              className="font-serif font-black tracking-tight leading-[1.0]"
              style={{ fontSize: 'clamp(40px,6vw,72px)', color: 'var(--text)' }}
            >
              Yog
            </h2>
            <h2
              className="font-serif font-black tracking-tight leading-[1.0]"
              style={{ fontSize: 'clamp(40px,6vw,72px)', color: 'var(--a1)' }}
            >
              Golakiya
            </h2>
          </motion.div>

          {/* Accent bar */}
          <motion.div
            {...fadeUp(0.2)}
            className="w-14 h-[3px] rounded-full"
            style={{ background: 'linear-gradient(90deg,var(--a1),var(--a3))' }}
          />

          {/* Quote */}
          <motion.p
            {...fadeUp(0.25)}
            className="text-[15px] font-light italic leading-[1.85]"
            style={{ color: 'var(--sub)', maxWidth: 420 }}
          >
            "Building at the intersection of full-stack engineering and AI — delivering products that work for real clients."
          </motion.p>

          {/* Quick facts */}
          <motion.div {...fadeUp(0.3)} className="space-y-2">
            {[
              { Icon: MapPin, label: 'Dubai, UAE',                      color: 'a4' },
              { Icon: Mail,   label: PERSONAL.email,                    color: 'a3' },
            ].map(({ Icon, label, color }) => (
              <div key={label} className="flex items-center gap-2.5 text-[13px]">
                <Icon size={14} style={{ color: `var(--${color})`, flexShrink: 0 }} />
                <span style={{ color: 'var(--muted)' }}>{label}</span>
              </div>
            ))}
          </motion.div>

          {/* Social links + CV */}
          <motion.div {...fadeUp(0.35)} className="flex items-center gap-3 flex-wrap pt-1">
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
                className="w-10 h-10 rounded-full flex items-center justify-center border transition-all hover:scale-110 hover:border-[var(--a1)]"
                style={{ borderColor: 'var(--border2)', background: 'var(--surface)', color: 'var(--sub)' }}
              >
                <Icon size={16} />
              </a>
            ))}

            <a
              href={PERSONAL.cv}
              download
              className="inline-flex items-center gap-2 font-mono tracking-[.1em] px-5 py-2.5 rounded-[8px] border transition-all hover:-translate-y-px hover:opacity-85"
              style={{
                fontSize: 10,
                background: 'var(--btn)', color: 'var(--btnt)',
                border: '1.5px solid var(--btn)',
              }}
            >
              <Download size={13} /> Download CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
