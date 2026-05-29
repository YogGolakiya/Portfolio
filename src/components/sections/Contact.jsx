import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { PERSONAL } from '../../data/portfolio'

export default function Contact() {
  const formRef = useRef(null)
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [form,    setForm]    = useState({ name:'', email:'', subject:'', message:'' })

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email) return

    setLoading(true)
    try {
      // Replace with your real EmailJS credentials
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        'YOUR_PUBLIC_KEY'
      )
      setSent(true)
      setForm({ name:'', email:'', subject:'', message:'' })
      setTimeout(() => setSent(false), 4000)
    } catch {
      // Fallback: open mailto
      const body = `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
      window.open(`mailto:${PERSONAL.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(body)}`)
      setSent(true)
      setTimeout(() => setSent(false), 4000)
    } finally {
      setLoading(false)
    }
  }

  const inputCls = `
    w-full rounded-[7px] border px-4 py-3 text-[13px] font-sans outline-none
    transition-all focus:border-[var(--a1)]
    bg-[rgba(255,255,255,0.07)] text-[var(--text)] placeholder:text-[var(--muted)]
    border-[rgba(255,255,255,0.12)]
  `

  return (
    <section id="contact" className="py-[clamp(70px,10vh,120px)] px-[clamp(20px,5vw,64px)] max-w-[1160px] mx-auto">
      <div
        className="rounded-[20px] overflow-hidden relative"
        style={{ background:'linear-gradient(160deg,var(--btn),color-mix(in srgb,var(--btn) 80%,var(--bg3)))' }}
      >
        {/* Glow blobs */}
        <div className="absolute top-[-30%] right-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,var(--a2t),transparent 70%)' }} />
        <div className="absolute bottom-[-25%] left-[-10%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,var(--a1t),transparent 70%)' }} />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-[clamp(32px,5vw,72px)]">

          {/* Left */}
          <div className="reveal-left">
            {/* Available */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-[20px] border mb-6"
              style={{ background:'rgba(92,122,94,.15)', borderColor:'rgba(92,122,94,.3)' }}>
              <span className="w-[7px] h-[7px] rounded-full animate-pulse" style={{ background:'var(--a2)' }} />
              <span className="text-[13px] font-medium" style={{ color:'var(--a2)' }}>Available for new work</span>
            </div>

            <SectionHeader
              num="05 — CONTACT"
              title="Let's build"
              italic="something"
              sub="Freelance projects, Dubai roles, remote collabs — all welcome."
              colorLine="a2"
            />

            <div className="space-y-3 mt-2">
              {[
                { Icon:Mail,    label:'EMAIL',           value:PERSONAL.email,   href:`mailto:${PERSONAL.email}`, color:'a1' },
                { Icon:Phone,   label:'PHONE / WHATSAPP', value:PERSONAL.phone,  href:`tel:${PERSONAL.phone}`,   color:'a2' },
                { Icon:MapPin,  label:'LOCATION',        value:'Dubai, UAE',     href:'#',                       color:'a4' },
                { Icon:Github,  label:'GITHUB',          value:'github.com/YogGolakiya', href:PERSONAL.github,  color:'a3' },
                { Icon:Linkedin,label:'LINKEDIN',        value:'linkedin.com/in/yog-golakiya', href:PERSONAL.linkedin, color:'a3' },
              ].map(({ Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-[10px] border transition-all hover:translate-x-1"
                  style={{ background:'rgba(255,255,255,0.05)', borderColor:'rgba(255,255,255,0.1)' }}
                >
                  <div
                    className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0"
                    style={{ background:`var(--${color}t)` }}
                  >
                    <Icon size={16} style={{ color:`var(--${color})` }} />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] tracking-[.2em] mb-0.5" style={{ color:'rgba(245,240,232,.35)' }}>{label}</p>
                    <p className="text-[13px]" style={{ color:'rgba(245,240,232,.8)' }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal-right">
            <div
              className="rounded-[12px] p-7 border"
              style={{ background:'rgba(255,255,255,0.06)', borderColor:'rgba(255,255,255,0.12)' }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-mono text-[10px] tracking-[.2em] block mb-1.5" style={{ color:'rgba(245,240,232,.4)' }}>YOUR NAME</label>
                    <input name="name" value={form.name} onChange={handleChange} required
                      placeholder="John Doe" className={inputCls} />
                  </div>
                  <div>
                    <label className="font-mono text-[10px] tracking-[.2em] block mb-1.5" style={{ color:'rgba(245,240,232,.4)' }}>EMAIL</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required
                      placeholder="john@email.com" className={inputCls} />
                  </div>
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[.2em] block mb-1.5" style={{ color:'rgba(245,240,232,.4)' }}>SUBJECT</label>
                  <input name="subject" value={form.subject} onChange={handleChange}
                    placeholder="Project inquiry / Job opportunity..." className={inputCls} />
                </div>
                <div>
                  <label className="font-mono text-[10px] tracking-[.2em] block mb-1.5" style={{ color:'rgba(245,240,232,.4)' }}>MESSAGE</label>
                  <textarea name="message" value={form.message} onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5} className={`${inputCls} resize-y`} />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-[8px] font-mono text-[12px] tracking-[.18em] font-medium text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:-translate-y-px disabled:opacity-60"
                  style={{ background:'linear-gradient(135deg,var(--a2),var(--a3))' }}
                >
                  {sent ? (
                    <><CheckCircle size={15} /> SENT — I'LL RESPOND SOON</>
                  ) : loading ? (
                    'SENDING...'
                  ) : (
                    <><Send size={15} /> SEND MESSAGE</>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
