import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1]

export default function Loader({ onDone }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)

  /* Subtle ambient particles */
  useEffect(() => {
    const c = canvasRef.current
    if (!c) return
    const ctx = c.getContext('2d')
    let W, H
    const fg = getComputedStyle(document.documentElement)
      .getPropertyValue('--loader-fg').trim() || '#f5f0e8'
    const pts = Array.from({ length: 45 }, () => ({
      x: Math.random() * 1400, y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.14, vy: (Math.random() - 0.5) * 0.14,
      r: Math.random() * 0.9 + 0.2, ph: Math.random() * Math.PI * 2,
    }))
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    function loop() {
      ctx.clearRect(0, 0, W, H)
      pts.forEach(p => {
        p.ph += 0.009; p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0
        ctx.globalAlpha = 0.05 + 0.04 * Math.sin(p.ph)
        ctx.fillStyle = fg
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill()
      })
      ctx.globalAlpha = 1
      rafRef.current = requestAnimationFrame(loop)
    }
    loop()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize) }
  }, [])

  /* Smooth percentage counter — 0 → 100 over 2.8 s */
  useEffect(() => {
    let start = null
    function step(ts) {
      if (!start) start = ts
      const p = Math.min((ts - start) / 2800, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * 100))
      if (p < 1) rafRef.counter = requestAnimationFrame(step)
    }
    rafRef.counter = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.counter)
  }, [])

  /* Dismiss at 3.3 s */
  useEffect(() => {
    const t = setTimeout(() => { setShow(false); setTimeout(onDone, 900) }, 3300)
    return () => clearTimeout(t)
  }, [onDone])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: 'var(--loader-bg)' }}
        >
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* ── COUNTER — top left ── */}
          <motion.div
            className="absolute font-mono"
            style={{
              top: 'clamp(28px,5vh,52px)',
              left: 'clamp(28px,5vw,52px)',
              fontSize: 'clamp(11px,1.2vw,13px)',
              letterSpacing: '0.15em',
              color: 'color-mix(in srgb,var(--loader-fg) 30%,transparent)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {String(count).padStart(2, '0')}%
          </motion.div>

          {/* ── CENTRE STAGE ── */}
          <div
            className="relative z-10 flex flex-col items-center w-full px-8 text-center"
            style={{ gap: 0, maxWidth: 700 }}
          >
            {/* Role — slides DOWN into place above the line */}
            <div style={{ overflow: 'hidden', paddingBottom: 20 }}>
              <motion.p
                className="font-mono tracking-[.42em]"
                style={{ fontSize: 'clamp(8px,1vw,11px)', color: 'var(--a1)' }}
                initial={{ y: '-130%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.85, ease }}
              >
                FULL-STACK DEVELOPER
              </motion.p>
            </div>

            {/* Accent line — expands from centre */}
            <motion.div
              style={{
                height: 1,
                width: '100%',
                background: 'linear-gradient(90deg,transparent 0%,var(--a1) 35%,var(--a3) 65%,transparent 100%)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.35, duration: 0.7, ease }}
            />

            {/* Name — slides UP through the line */}
            <div style={{ overflow: 'hidden', paddingTop: 6 }}>
              <motion.h1
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle:  'italic',
                  fontWeight: 900,
                  fontSize:   'clamp(54px,9.5vw,104px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.02em',
                  color: 'var(--loader-fg)',
                  whiteSpace: 'nowrap',
                }}
                initial={{ y: '108%' }}
                animate={{ y: '0%' }}
                transition={{ delay: 0.38, duration: 0.88, ease }}
              >
                Yog{' '}
                <span style={{ color: 'var(--a1)' }}>Golakiya</span>
              </motion.h1>
            </div>

            {/* Second line */}
            <motion.div
              style={{
                height: 1,
                width: '100%',
                marginTop: 6,
                background: 'linear-gradient(90deg,transparent 0%,var(--a3) 35%,var(--a1) 65%,transparent 100%)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.45, duration: 0.7, ease }}
            />

            {/* Location + year */}
            <div style={{ overflow: 'hidden', paddingTop: 16 }}>
              <motion.p
                className="font-mono tracking-[.35em]"
                style={{ fontSize: 'clamp(7px,.9vw,10px)', color: 'color-mix(in srgb,var(--loader-fg) 32%,transparent)' }}
                initial={{ y: '130%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8, ease }}
              >
                DUBAI, UAE · 2026
              </motion.p>
            </div>
          </div>

          {/* ── YG badge — bottom right ── */}
          <motion.div
            className="absolute font-serif font-black"
            style={{
              bottom: 'clamp(28px,5vh,52px)',
              right:  'clamp(28px,5vw,52px)',
              fontSize: 13,
              letterSpacing: '0.08em',
              color: 'color-mix(in srgb,var(--loader-fg) 28%,transparent)',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5, ease: 'backOut' }}
          >
            YG
          </motion.div>

          {/* ── Progress bar ── */}
          <div
            className="absolute bottom-0 left-0 right-0"
            style={{ height: 2, background: 'color-mix(in srgb,var(--loader-fg) 6%,transparent)' }}
          >
            <motion.div
              className="h-full"
              style={{ background: 'linear-gradient(90deg,var(--a2),var(--a1),var(--a3))' }}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ delay: 0.1, duration: 3.05, ease: [0.4, 0, 0.6, 1] }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
