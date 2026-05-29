import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiThreedotjs, SiAngular, SiVuedotjs, SiNodedotjs, SiExpress,
  SiPhp, SiStripe, SiMongodb, SiMysql, SiPostgresql, SiFirebase,
  SiVercel, SiOpenai, SiGithubcopilot,
} from 'react-icons/si'
import {
  Code, Zap, Layers, ShieldCheck, Database, Cloud,
  Brain, Link2, Settings, CreditCard, Bot, Server,
} from 'lucide-react'
import SectionHeader from '../ui/SectionHeader'
import { SKILLS } from '../../data/portfolio'

const ICON_MAP = {
  SiReact:              <SiReact />,
  SiNextdotjs:          <SiNextdotjs />,
  SiTypescript:         <SiTypescript />,
  SiJavascript:         <SiJavascript />,
  SiTailwindcss:        <SiTailwindcss />,
  TbBrandFramerMotion:  <Zap size={16} />,
  SiThreedotjs:         <SiThreedotjs />,
  TbBolt:               <Zap size={16} />,
  TbComponents:         <Layers size={16} />,
  SiAngular:            <SiAngular />,
  SiVuedotjs:           <SiVuedotjs />,
  SiNodedotjs:          <SiNodedotjs />,
  SiExpress:            <SiExpress />,
  SiPhp:                <SiPhp />,
  TbApi:                <Code size={16} />,
  TbShieldLock:         <ShieldCheck size={16} />,
  SiStripe:             <SiStripe />,
  TbCreditCard:         <CreditCard size={16} />,
  SiMongodb:            <SiMongodb />,
  SiMysql:              <SiMysql />,
  SiPostgresql:         <SiPostgresql />,
  SiFirebase:           <SiFirebase />,
  SiVercel:             <SiVercel />,
  TbBrain:              <Brain size={16} />,
  SiOpenai:             <SiOpenai />,
  TbLink:               <Link2 size={16} />,
  TbSettingsAutomation: <Settings size={16} />,
  SiIbm:                <Server size={16} />,
  TbRobot:              <Bot size={16} />,
  TbDatabase:           <Database size={16} />,
  SiGithubcopilot:      <SiGithubcopilot />,
}

const FILTERS = ['All', 'Frontend', 'Backend', 'Database & Cloud', 'AI & Emerging Tech']

/* Category card — animates in when filter changes */
const catVariants = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

export default function Skills() {
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? SKILLS
    : SKILLS.filter(c => c.category === active)

  return (
    <section
      id="skills"
      className="py-[clamp(70px,10vh,120px)] px-[clamp(20px,5vw,64px)]"
      style={{ background: 'var(--bg2)' }}
    >
      <div className="max-w-[1160px] mx-auto">
        <SectionHeader
          num="02 — SKILLS"
          title="Tech I"
          italic="actually use"
          sub="Tools from real projects — not just a résumé list."
          colorLine="a2"
        />

        {/* Filter pills */}
        <div className="flex gap-2.5 flex-wrap mb-10 reveal-up">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="font-mono text-[10px] tracking-[.12em] px-3.5 py-1.5 rounded-[20px] border transition-all"
              style={{
                borderColor: active === f ? 'var(--a1)' : 'var(--border2)',
                color:       active === f ? 'var(--a1)' : 'var(--sub)',
                background:  active === f ? 'var(--a1t)' : 'transparent',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Categories — AnimatePresence re-mounts on filter change, triggering entrance */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="space-y-10"
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10, transition: { duration: 0.18 } }}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            {visible.map(cat => (
              <motion.div key={cat.category} variants={catVariants}>
                <h3
                  className="font-serif text-[17px] font-bold mb-4 flex items-center gap-3"
                  style={{ color: 'var(--text)' }}
                >
                  {cat.category}
                  <span className="flex-1 h-px" style={{ background: 'var(--border2)' }} />
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {cat.items.map(skill => (
                    <motion.div
                      key={skill.name}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-[8px] border text-[13px] cursor-default"
                      style={{
                        color:        `var(--${cat.color})`,
                        background:   `var(--${cat.color}t)`,
                        borderColor:  `color-mix(in srgb,var(--${cat.color}) 25%,transparent)`,
                      }}
                      whileHover={{ y: -2, transition: { duration: 0.15 } }}
                    >
                      <span className="text-base leading-none flex-shrink-0">
                        {ICON_MAP[skill.icon] ?? <Code size={15} />}
                      </span>
                      {skill.name}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
