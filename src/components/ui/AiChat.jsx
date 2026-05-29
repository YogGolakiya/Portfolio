import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, X, Send, Sparkles, Zap, Gamepad2, MessageSquare } from 'lucide-react'
import MiniGame from './MiniGame'

// ─── Intent engine — no API key needed ───────────────────────────────────────

const has = (text, ...words) => words.some(w => text.includes(w))

const RESPONSES = [
  {
    when: t => has(t, 'hi', 'hello', 'hey', "what's up", 'howdy', 'good morning', 'good evening'),
    say:  "Hi! I'm Yog's AI assistant. Ask me about his skills, projects, experience, or availability — I'll give you a straight answer.",
  },
  {
    when: t => has(t, 'tech stack', 'technology', 'language', 'framework', 'tools', 'skill',
                    'react', 'node', 'flutter', 'php', 'python', 'typescript', 'next.js', 'vue', 'angular',
                    'what does he', 'what can he', 'what do you', 'use'),
    say:  "Yog's core stack: React.js, Node.js, Express.js, MongoDB (MERN) — plus PHP/MySQL for client projects and Flutter for mobile. Frontend toolkit includes Next.js, TypeScript, Tailwind CSS, Framer Motion, and Three.js. He integrates AI tools including Claude, GPT-4o, LangChain, and n8n into real production systems.",
  },
  {
    when: t => has(t, 'ai', 'llm', 'machine learning', 'artificial', 'gpt', 'claude', 'langchain',
                    'watson', 'automation', 'n8n', 'hugging', 'pinecone', 'intelligent'),
    say:  "Yog works with Claude AI, GPT-4o, LangChain, n8n workflow automation, IBM Watson AI Studio, HuggingFace, Pinecone, and GitHub Copilot. He's built AI chat integrations, automated client workflows with n8n, and is currently researching LLM orchestration and vector DB retrieval through his MSc at UOWD Dubai.",
  },
  {
    when: t => has(t, 'project', 'built', 'shipped', 'portfolio', 'work', 'app', 'application',
                    'drwall', 'krishna', 'ecommerce', 'coffee', 'dayly', 'impressive', 'example'),
    say:  "Yog has shipped 6+ production apps: Dr. Wall Care Products (drwallcare.com), Krishna Motors (krishnamotorss.com), a MERN e-commerce platform with Stripe checkout, a Firebase café ordering app, a PHP/MySQL ad management system, and Dayly — a Flutter offline habit & expense tracker. All live, all for real clients or users.",
  },
  {
    when: t => has(t, 'mobile', 'flutter', 'ios', 'android', 'app store', 'play store', 'dayly'),
    say:  "Yog built Dayly — an offline-first Flutter app combining habit tracking with expense management. Features include visual streaks, monthly heatmaps, budget alerts, and full analytics. All data stays on-device, no account required. Built with Flutter, Hive DB, Provider, and FL Chart. A second app is in development.",
  },
  {
    when: t => has(t, 'experience', 'years', 'background', 'history', 'career', 'work history',
                    'previous', 'worked at', 'goyani', 'company', 'past'),
    say:  "2+ years of professional experience: Trainee Full-Stack Developer at Goyani Technologies, Surat (May 2023 – Apr 2024), then independent freelance delivering 6+ production apps for clients in e-commerce, automotive, and construction sectors. Full-cycle ownership from requirements to post-launch support on every project.",
  },
  {
    when: t => has(t, 'available', 'hire', 'job', 'role', 'position', 'open to', 'looking for',
                    'opportunity', 'recruit', 'full.time', 'contract', 'notice', 'join', 'when'),
    say:  "Yog is immediately available for full-time and contract roles. He's looking for senior Full-Stack, Frontend, or AI Integration positions in Dubai/GCC or remote. Open to hybrid too. No notice period needed.",
  },
  {
    when: t => has(t, 'salary', 'pay', 'compensation', 'package', 'ctc', 'how much', 'expect', 'rate'),
    say:  "Yog is open to discussing a competitive package based on the role and scope. Reach out at golakiyayog@gmail.com to start that conversation directly.",
  },
  {
    when: t => has(t, 'education', 'degree', 'university', 'uowd', 'msc', 'bca', 'study', 'college', 'qualification'),
    say:  "Yog holds a BCA (Computer Application) from Veer Narmad South Gujarat University (2020–2023). He's currently pursuing an MSc in Digital Transformation at the University of Wollongong in Dubai (UOWD), started April 2026 — focusing on AI automation, LLM integration, and enterprise cloud architecture.",
  },
  {
    when: t => has(t, 'freelance', 'client', 'independent', 'self-employed', 'own'),
    say:  "Since May 2024, Yog has run a freelance practice delivering full-stack web applications across e-commerce, automotive, and construction industries. He manages the full cycle — requirements gathering, architecture, build, deployment, and post-launch support. Payment integrations include Stripe, Razorpay, and EmailJS.",
  },
  {
    when: t => has(t, 'location', 'based', 'where', 'dubai', 'uae', 'remote', 'relocat', 'gcс', 'gulf'),
    say:  "Yog is based in Dubai, UAE. Open to roles across Dubai/GCC and fully remote positions globally. No relocation required for local roles.",
  },
  {
    when: t => has(t, 'contact', 'email', 'phone', 'reach', 'message', 'linkedin', 'github', 'get in touch'),
    say:  "📧 golakiyayog@gmail.com  |  📱 +971 503 07 8898  |  LinkedIn: yog-golakiya-456b26238  |  GitHub: YogGolakiya. He responds quickly — usually within a few hours.",
  },
  {
    when: t => has(t, 'cv', 'resume', 'download', 'pdf'),
    say:  "Yog's CV is available for download — hit the \"Download CV\" button in the Profile or Hero section. You can also email golakiyayog@gmail.com to request it directly.",
  },
  {
    when: t => has(t, 'strength', 'stand out', 'different', 'unique', 'best', 'why', 'advantage', 'value'),
    say:  "Three things set Yog apart: (1) he ships — 6+ live production apps, not just side projects; (2) he's AI-native — Claude, GPT-4o, LangChain, and n8n are already in his workflow; (3) he owns the full product cycle, from client brief to post-launch support. No hand-holding needed.",
  },
  {
    when: t => has(t, 'weakness', 'improve', 'learning', 'growth', 'challenge'),
    say:  "Yog is actively deepening his mobile expertise through Flutter (Dayly is live), expanding into AI/ML research through his MSc at UOWD, and improving system design skills for large-scale distributed systems.",
  },
  {
    when: t => has(t, 'thank', 'thanks', 'great', 'perfect', 'awesome', 'good', 'helpful'),
    say:  "Happy to help! If you have more questions or want to set up a call with Yog directly, reach out at golakiyayog@gmail.com. He's very responsive.",
  },
]

const FALLBACK = "I can answer questions about Yog's tech stack, projects, experience, availability, education, or how to contact him. What would you like to know?"

function getResponse(text) {
  const t = text.toLowerCase()
  const rule = RESPONSES.find(r => r.when(t))
  return rule ? rule.say : FALLBACK
}

// ─── Typing delay — feels natural ────────────────────────────────────────────
const thinkDelay = () => new Promise(r => setTimeout(r, 650 + Math.random() * 550))

// ─── Component ────────────────────────────────────────────────────────────────

const GREETING = {
  role: 'assistant',
  content: "Hi! I'm Yog's AI assistant — ask me anything about his skills, projects, or availability. I'm here to help you find the right hire.",
}

const CHIPS = [
  { label: 'Tech Stack',    q: "What is Yog's tech stack?" },
  { label: 'Key Projects',  q: "Tell me about Yog's key projects." },
  { label: 'Availability',  q: "Is Yog available for hire?" },
  { label: 'AI Experience', q: "What AI tools has Yog worked with?" },
]

function Dots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--a1)', display: 'block' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.6, delay: i * 0.15, repeat: Infinity }}
        />
      ))}
    </div>
  )
}

export default function AiChat() {
  const [open,      setOpen]      = useState(false)
  const [view,      setView]      = useState('chat')
  const [messages,  setMessages]  = useState([GREETING])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [chipsUsed, setChipsUsed] = useState(false)
  const endRef   = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (view === 'chat') endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading, view])

  useEffect(() => {
    if (open && view === 'chat') setTimeout(() => inputRef.current?.focus(), 300)
  }, [open, view])

  async function send(content) {
    if (!content.trim() || loading) return
    setInput('')
    setChipsUsed(true)

    setMessages(m => [...m, { role: 'user', content }])
    setLoading(true)

    await thinkDelay()

    setMessages(m => [...m, { role: 'assistant', content: getResponse(content) }])
    setLoading(false)
  }

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col items-end gap-3">

      {/* ── Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="w-[340px] rounded-[18px] overflow-hidden shadow-2xl flex flex-col"
            style={{
              height: 500,
              background: 'var(--nav-bg)',
              border: '1px solid var(--border2)',
              backdropFilter: 'blur(24px)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-2.5 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}
            >
              <div
                className="w-8 h-8 rounded-[8px] flex items-center justify-center flex-shrink-0"
                style={{ background: 'var(--a1t)' }}
              >
                {view === 'game'
                  ? <Gamepad2 size={15} style={{ color: 'var(--a1)' }} />
                  : <Bot      size={15} style={{ color: 'var(--a1)' }} />
                }
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold leading-tight" style={{ color: 'var(--text)' }}>
                  {view === 'game' ? 'Mini Game' : 'YG · AI Assistant'}
                </p>
                <div className="flex items-center gap-1">
                  <Sparkles size={9} style={{ color: 'var(--a3)' }} />
                  <p className="font-mono text-[9px] tracking-[.12em]" style={{ color: 'var(--muted)' }}>
                    {view === 'game' ? 'MEMORY MATCH · TECH EDITION' : 'ASK ME ANYTHING'}
                  </p>
                </div>
              </div>

              {/* Online dot */}
              {view === 'chat' && (
                <div className="flex items-center gap-1.5 mr-1">
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ background: 'var(--a2)' }}
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="font-mono text-[9px]" style={{ color: 'var(--muted)' }}>ONLINE</span>
                </div>
              )}

              {/* Game toggle */}
              <button
                onClick={() => setView(v => v === 'chat' ? 'game' : 'chat')}
                title={view === 'game' ? 'Back to chat' : 'Play a game'}
                className="w-7 h-7 rounded-full flex items-center justify-center border transition-all hover:scale-110 mr-1"
                style={{
                  borderColor: 'var(--border2)',
                  background:  view === 'game' ? 'var(--a1t)' : 'transparent',
                  color:       view === 'game' ? 'var(--a1)' : 'var(--sub)',
                }}
              >
                {view === 'game' ? <MessageSquare size={12} /> : <Gamepad2 size={12} />}
              </button>

              {/* Close */}
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{ background: 'var(--border)', color: 'var(--sub)' }}
              >
                <X size={13} />
              </button>
            </div>

            {/* Content area */}
            <AnimatePresence mode="wait">
              {view === 'game' ? (
                <motion.div key="game" className="flex-1 min-h-0"
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.22 }}
                >
                  <MiniGame />
                </motion.div>
              ) : (
                <motion.div key="chat" className="flex flex-col flex-1 min-h-0"
                  initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.22 }}
                >
                  {/* Messages */}
                  <div
                    className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {messages.map((m, i) => (
                      <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        {m.role === 'assistant' && (
                          <div
                            className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                            style={{ background: 'var(--a1t)' }}
                          >
                            <Bot size={11} style={{ color: 'var(--a1)' }} />
                          </div>
                        )}
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.22 }}
                          className="max-w-[232px] px-3.5 py-2.5 text-[12.5px] leading-[1.68]"
                          style={
                            m.role === 'user'
                              ? { background: 'var(--a1)', color: 'var(--btnt)', borderRadius: '14px 14px 4px 14px' }
                              : { background: 'var(--surface)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '14px 14px 14px 4px' }
                          }
                        >
                          {m.content}
                        </motion.div>
                      </div>
                    ))}

                    {loading && (
                      <div className="flex justify-start">
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5"
                          style={{ background: 'var(--a1t)' }}
                        >
                          <Bot size={11} style={{ color: 'var(--a1)' }} />
                        </div>
                        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '14px 14px 14px 4px' }}>
                          <Dots />
                        </div>
                      </div>
                    )}
                    <div ref={endRef} />
                  </div>

                  {/* Quick chips */}
                  <AnimatePresence>
                    {!chipsUsed && (
                      <motion.div
                        initial={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-3 pb-2 flex flex-wrap gap-1.5 overflow-hidden"
                      >
                        {CHIPS.map(c => (
                          <button
                            key={c.label}
                            onClick={() => send(c.q)}
                            disabled={loading}
                            className="font-mono text-[9px] tracking-[.1em] px-2.5 py-1 rounded-[20px] border transition-all hover:-translate-y-0.5 disabled:opacity-40"
                            style={{
                              color:       'var(--a1)',
                              background:  'var(--a1t)',
                              borderColor: 'color-mix(in srgb,var(--a1) 30%,transparent)',
                              cursor:      'pointer',
                            }}
                          >
                            {c.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Input row */}
                  <div
                    className="flex items-center gap-2 px-3 py-2.5 flex-shrink-0"
                    style={{ borderTop: '1px solid var(--border)' }}
                  >
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send(input)}
                      placeholder="Ask about Yog's experience…"
                      disabled={loading}
                      className="flex-1 bg-transparent text-[12.5px] outline-none placeholder:opacity-40 disabled:opacity-40"
                      style={{ color: 'var(--text)' }}
                    />
                    <button
                      onClick={() => send(input)}
                      disabled={!input.trim() || loading}
                      className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110 disabled:opacity-30"
                      style={{ background: 'var(--a1)', color: 'var(--btnt)', border: 'none', cursor: 'pointer' }}
                    >
                      <Send size={12} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(p => !p)}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg relative overflow-hidden"
        style={{ background: 'var(--a1)', color: 'var(--btnt)', border: 'none', cursor: 'pointer' }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        title="Ask Yog's AI"
      >
        {!open && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid var(--a1)' }}
            animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x"
              initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div key="bot"
              initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
            >
              <Zap size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
