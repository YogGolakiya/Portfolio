import { MapPin, Mail, Phone, GraduationCap, Briefcase, Layers, Brain, Rocket } from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { PERSONAL, EDUCATION } from '../../data/portfolio'

export default function About() {
  return (
    <section id="about" className="py-[clamp(70px,10vh,120px)] px-[clamp(20px,5vw,64px)] max-w-[1160px] mx-auto">
      <SectionHeader num="01 — ABOUT" title="The" italic="real story" sub="Where I came from, where I am, and where this is all going." />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Story text */}
        <div className="reveal-left space-y-5">
          {[
            `I'm a Full-Stack Developer with 2+ years of real-world experience building and shipping web applications. My stack is deep in React, Node.js, PHP, and the MERN ecosystem — used on actual client projects, not tutorials.`,
            `After my BCA from Veer Narmad South Gujarat University, I spent a year at Goyani Technologies as a trainee developer, then went freelance — delivering 6+ applications across e-commerce, automotive, and construction industries with Stripe, Razorpay, and EmailJS integrations.`,
            `Now pursuing MSc in Digital Transformation at UOWD Dubai, I'm diving deep into AI automation, LLM integration, and enterprise cloud architecture. The future of the web is intelligent — I'm building toward it.`,
          ].map((p, i) => (
            <p key={i} className="text-[15px] font-light leading-[1.9]" style={{ color:'var(--sub)' }}>{p}</p>
          ))}

          {/* Quick info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {[
              { Icon: MapPin,   label:'Location', value:'Dubai, UAE',             color:'a4' },
              { Icon: Mail,     label:'Email',    value:PERSONAL.email,           color:'a3' },
              { Icon: Phone,    label:'Phone',    value:PERSONAL.phone,           color:'a2' },
              { Icon: Briefcase,label:'Status',   value:'Open to opportunities',  color:'a1', green:true },
            ].map(({ Icon, label, value, color, green }) => (
              <div key={label}
                className="flex items-center gap-3 p-3.5 rounded-[10px] border transition-all hover:border-[var(--a1)]"
                style={{ background:'var(--surface)', borderColor:'var(--border)' }}
              >
                <div
                  className="w-8 h-8 rounded-[7px] flex items-center justify-center flex-shrink-0"
                  style={{ background:`var(--${color}t)` }}
                >
                  <Icon size={15} style={{ color:`var(--${color})` }} />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[.18em] mb-0.5" style={{ color:'var(--muted)' }}>{label.toUpperCase()}</p>
                  <p className="text-[13px] font-medium" style={{ color: green ? 'var(--a2)' : 'var(--text)' }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education + journey cards */}
        <div className="reveal-right space-y-4">
          {/* Education */}
          <div
            className="rounded-[12px] p-5 border"
            style={{ background:'var(--card)', borderColor:'var(--border)', backdropFilter:'blur(8px)' }}
          >
            <p className="font-mono text-[9px] tracking-[.3em] mb-4 flex items-center gap-2" style={{ color:'var(--a1)' }}>
              <GraduationCap size={12} /> EDUCATION
            </p>
            <div className="space-y-5">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="flex gap-3">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                    style={{ background:`var(--${edu.color})`, boxShadow:`0 0 8px color-mix(in srgb,var(--${edu.color}) 50%,transparent)` }}
                  />
                  <div>
                    <p className="text-[14px] font-semibold mb-0.5" style={{ color:'var(--text)' }}>{edu.degree}</p>
                    <p className="text-[12px] mb-1" style={{ color:'var(--muted)' }}>{edu.school}</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-[9px] tracking-[.12em]" style={{ color:`var(--${edu.color})` }}>{edu.period}</span>
                      <span
                        className="font-mono text-[9px] tracking-[.1em] px-2 py-0.5 rounded-[10px] border"
                        style={{ color:`var(--${edu.color})`, background:`var(--${edu.color}t)`, borderColor:`color-mix(in srgb,var(--${edu.color}) 25%,transparent)` }}
                      >
                        {edu.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase cards */}
          {[
            { Icon:Layers,   color:'a1', tag:'2023 – Present', title:'The Craft',   desc:'6+ production applications delivered for real clients — e-commerce, automotive, construction. Full-cycle: requirements to post-launch support.' },
            { Icon:Brain,    color:'a3', tag:'AI-Native',      title:'The Edge',    desc:'Integrating Claude, GPT-4o, LangChain, and n8n into live workflows. Building intelligent systems, not just websites.' },
            { Icon:Rocket,   color:'a2', tag:'Open to Roles',  title:'The Mission', desc:'MSc in Digital Transformation. Seeking senior or lead roles at the intersection of modern web and AI systems in Dubai/GCC.' },
          ].map(({ Icon, color, tag, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 p-4 rounded-[12px] border transition-all hover:translate-x-1"
              style={{ background:'var(--card)', borderColor:'var(--border)', backdropFilter:'blur(8px)' }}
            >
              <div
                className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background:`var(--${color}t)` }}
              >
                <Icon size={16} style={{ color:`var(--${color})` }} />
              </div>
              <div>
                <p className="font-serif text-[14px] font-bold mb-1" style={{ color:'var(--text)' }}>{title}</p>
                <p className="text-[12px] font-light leading-[1.65]" style={{ color:'var(--muted)' }}>{desc}</p>
                <span
                  className="inline-block font-mono text-[9px] tracking-[.15em] px-2 py-0.5 rounded-[10px] border mt-2"
                  style={{ color:`var(--${color})`, background:`var(--${color}t)`, borderColor:`color-mix(in srgb,var(--${color}) 25%,transparent)` }}
                >
                  {tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
