import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Projects from '../sections/Projects'
import Education from '../sections/Education'
import Journey from '../sections/Journey'
import Contact from '../sections/Contact'
import Terminal from '../components/Terminal'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <section className="section terminal-section" aria-label="Interactive terminal">
        <Reveal className="terminal-heading"><span className="eyebrow">Interactive / Terminal</span><h2>Explore through a prompt</h2></Reveal>
        <Reveal className="terminal-panel" delay={0.1}><Terminal /></Reveal>
      </section>
      <Journey />
      <Contact />
    </main>
  )
}
