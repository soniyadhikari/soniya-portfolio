import { useEffect, useState } from 'react'
import { GitFork, Link, Mail, Download, Users, Camera } from 'lucide-react'
import { motion as Motion, useReducedMotion } from 'motion/react'
import { gmailComposeUrl, personal } from '../data/personal'

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const reduceMotion = useReducedMotion()
  const roles = personal.roles?.filter(Boolean) ?? []

  useEffect(() => {
    if (reduceMotion || roles.length < 2) return undefined
    const interval = window.setInterval(() => setRoleIndex((value) => (value + 1) % roles.length), 2600)
    return () => window.clearInterval(interval)
  }, [reduceMotion, roles.length])

  return (
    <section className="hero section" id="home">
      <Motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.65 }}>
        <span className="availability"><span /> Engineering, AI & curiosity</span>
        {roles[0] && <p className="hero-kicker">{roles[0].replace(/^(?:a|an)\s+/i, '')}</p>}
        <h1>{personal.name}<span>.</span></h1>
        <h2>{personal.headline}</h2>
        {roles.length > 0 && <p className="role-line">I am <span key={roleIndex}>{roles[roleIndex % roles.length]}</span></p>}
        <Motion.p
          className="hero-intro"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          {personal.introduction}
        </Motion.p>
        <div className="hero-actions">
          <a className="button" href="#projects">View my projects</a>
          {personal.cvPath && <a className="button button-secondary" href={personal.cvPath} download><Download size={16} /> Download CV</a>}
        </div>
        <div className="hero-social">
          {personal.github && <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitFork size={19} /></a>}
          {personal.linkedin && <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Link size={19} /></a>}
          {personal.facebook && <a href={personal.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Users size={19} /></a>}
          {personal.instagram && <a href={personal.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={19} /></a>}
          {personal.email && <a href={gmailComposeUrl} target="_blank" rel="noreferrer" aria-label={`Email ${personal.name} with Gmail`} title="Opens a Gmail compose window"><Mail size={19} /></a>}
        </div>
        <a className="hero-scroll-link" href="#about"><span /> Scroll to explore</a>
      </Motion.div>
      <Motion.div className="hero-visual" aria-hidden="true" initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.12 }}>
        <div className="orbital-stage">
          <div className="orbital-coordinate coordinate-one">AI / 01</div>
          <div className="orbital-coordinate coordinate-two">VISION / 02</div>
          <div className="orbital-coordinate coordinate-three">SYSTEMS / 03</div>
          <div className="orbital-ring orbital-ring-one"><span className="orbital-node">AI</span></div>
          <div className="orbital-ring orbital-ring-two"><span className="orbital-node">CV</span></div>
          <div className="orbital-ring orbital-ring-three"><span className="orbital-node">ML</span></div>
          <div className="orbital-core">
            <span className="orbital-core-mark">SA</span>
            <span className="orbital-core-label">ENGINEERING<br />+ AI</span>
          </div>
          <div className="orbital-caption"><span /> IDEAS INTO SYSTEMS</div>
        </div>
      </Motion.div>
    </section>
  )
}
