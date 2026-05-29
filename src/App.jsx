import { useState, useEffect } from 'react'
import Loader     from './components/sections/Loader'
import Navbar     from './components/sections/Navbar'
import Hero       from './components/sections/Hero'
import Profile    from './components/sections/Profile'
import About      from './components/sections/About'
import Skills     from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Projects   from './components/sections/Projects'
import Apps       from './components/sections/Apps'
import Contact    from './components/sections/Contact'
import Footer     from './components/sections/Footer'
import Scene3D    from './three/Scene3D'
import { useTheme }  from './hooks/useTheme'
import { useReveal } from './hooks/useReveal'
import AiChat        from './components/ui/AiChat'

export default function App() {
  const [ready, setReady] = useState(false)
  const { theme, setTheme, palette } = useTheme()

  // Activate scroll-reveal watchers after portfolio mounts
  useReveal('visible', 0.1, ready)

  return (
    <>
      <Loader onDone={() => setReady(true)} />

      {ready && (
        <div style={{ opacity: ready ? 1 : 0, transition: 'opacity .9s ease' }}>
          {/* 3D canvas — fixed, behind everything */}
          <Scene3D palette={palette} />

          {/* Sticky nav */}
          <Navbar theme={theme} setTheme={setTheme} />

          {/* Main content */}
          <main className="relative z-[1]">
            <Hero />

            {/* Profile — photo + identity */}
            <Profile />

            {/* Alternating bg sections */}
            <div style={{ background:'var(--bg)' }}>
              <About />
            </div>

            <Skills />

            <div style={{ background:'var(--bg)' }}>
              <Experience />
            </div>

            <Projects />

            <div style={{ background:'var(--bg)' }}>
              <Apps />
            </div>

            <Contact />
          </main>

          <Footer />

          {/* AI recruiter assistant — fixed bottom-right */}
          <AiChat />
        </div>
      )}
    </>
  )
}
