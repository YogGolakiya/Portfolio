import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw } from 'lucide-react'

const EMOJIS = ['⚛️', '🚀', '🤖', '⚡', '💻', '🔥', '🌐', '🔒']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function makeCards() {
  return shuffle([...EMOJIS, ...EMOJIS]).map((emoji, i) => ({
    id: i, emoji, flipped: false, matched: false,
  }))
}

/* ── Card ── */
function Card({ card, onClick }) {
  const hidden = !card.flipped && !card.matched
  return (
    <div
      onClick={onClick}
      style={{
        width: 68, height: 68,
        perspective: '600px',
        cursor: card.matched ? 'default' : 'pointer',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ rotateY: hidden ? 0 : 180 }}
        transition={{ duration: 0.32, ease: 'easeOut' }}
        style={{
          width: '100%', height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Back (hidden face) */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--surface)',
            border: '1px solid var(--border2)',
          }}
        >
          <span style={{ color: 'var(--a1)', fontSize: 20, fontWeight: 700 }}>?</span>
        </div>

        {/* Front (emoji face) */}
        <div
          style={{
            position: 'absolute', inset: 0, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: card.matched
              ? 'color-mix(in srgb,var(--a2) 22%,transparent)'
              : 'var(--card)',
            border: `1px solid ${card.matched ? 'var(--a2)' : 'var(--border)'}`,
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          <span style={{ fontSize: 26, lineHeight: 1 }}>{card.emoji}</span>
        </div>
      </motion.div>
    </div>
  )
}

/* ── Game ── */
export default function MiniGame() {
  const [cards,   setCards]   = useState(makeCards)
  const [pending, setPending] = useState([])   // IDs of flipped-not-yet-judged cards
  const [locked,  setLocked]  = useState(false)
  const [moves,   setMoves]   = useState(0)
  const [won,     setWon]     = useState(false)

  const matched = cards.filter(c => c.matched).length / 2

  const handleClick = useCallback((id) => {
    if (locked || won) return
    const card = cards.find(c => c.id === id)
    if (!card || card.matched || card.flipped) return
    if (pending.length >= 2) return

    const flippedCards  = cards.map(c => c.id === id ? { ...c, flipped: true } : c)
    const nextPending   = [...pending, id]
    setCards(flippedCards)
    setPending(nextPending)

    if (nextPending.length === 2) {
      setMoves(m => m + 1)
      const [a, b]   = nextPending
      const cardA    = flippedCards.find(c => c.id === a)
      const cardB    = flippedCards.find(c => c.id === b)

      if (cardA.emoji === cardB.emoji) {
        // Match
        setTimeout(() => {
          setCards(prev => {
            const next = prev.map(c =>
              c.id === a || c.id === b ? { ...c, matched: true } : c
            )
            if (next.every(c => c.matched)) setWon(true)
            return next
          })
          setPending([])
        }, 420)
      } else {
        // Mismatch — flip back after pause
        setLocked(true)
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            c.id === a || c.id === b ? { ...c, flipped: false } : c
          ))
          setPending([])
          setLocked(false)
        }, 820)
      }
    }
  }, [cards, pending, locked, won])

  const reset = () => {
    setCards(makeCards())
    setPending([])
    setLocked(false)
    setMoves(0)
    setWon(false)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5 flex-shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div>
          <p className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
            Memory Match
          </p>
          <p className="font-mono text-[10px]" style={{ color: 'var(--muted)' }}>
            {moves} moves · {matched}/8 pairs
          </p>
        </div>
        <button
          onClick={reset}
          title="New game"
          className="w-7 h-7 rounded-full flex items-center justify-center border transition-all hover:scale-110"
          style={{ borderColor: 'var(--border2)', background: 'transparent', color: 'var(--sub)', cursor: 'pointer' }}
        >
          <RotateCcw size={12} />
        </button>
      </div>

      {/* Grid / Win screen */}
      <div className="flex-1 flex items-center justify-center p-3 overflow-hidden">
        <AnimatePresence mode="wait">
          {won ? (
            <motion.div
              key="win"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'backOut' }}
              className="text-center"
            >
              <motion.div
                style={{ fontSize: 52, marginBottom: 10 }}
                animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                🏆
              </motion.div>
              <p
                className="font-serif font-black mb-1"
                style={{ fontSize: 22, color: 'var(--text)' }}
              >
                You won!
              </p>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 18 }}>
                Completed in {moves} moves
              </p>
              <button
                onClick={reset}
                className="font-mono tracking-[.12em] px-5 py-2 rounded-[8px] transition-all hover:opacity-85"
                style={{
                  fontSize: 10, background: 'var(--a1)',
                  color: 'var(--btnt)', border: 'none', cursor: 'pointer',
                }}
              >
                PLAY AGAIN
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 68px)', gap: 8 }}
            >
              {cards.map(card => (
                <Card key={card.id} card={card} onClick={() => handleClick(card.id)} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer tip */}
      {!won && (
        <p
          className="text-center font-mono pb-2 flex-shrink-0"
          style={{ fontSize: 9, color: 'var(--muted)' }}
        >
          Flip cards to find matching tech pairs 🎯
        </p>
      )}
    </div>
  )
}
