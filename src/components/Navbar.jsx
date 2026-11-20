import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { personal } from '../data/personal'
import ProfileViewsCounter from './ProfileViewsCounter'
import ThemeToggle from './ThemeToggle'

const links = [
  ['Home', 'home'], ['About', 'about'], ['Skills', 'skills'], ['Projects', 'projects'],
  ['Journey', 'journey'], ['Contact', 'contact'],
]

export default function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(([, id]) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return undefined

    const updateActiveSection = () => {
      const current = sections.reduce((activeSection, section) => (
        section.getBoundingClientRect().top <= 180 ? section : activeSection
      ), sections[0])
      setActive(current.id)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} aria-label="Main navigation">
      <a className="brand" href="/#home" aria-label="Back to home">{personal.initials}<span>.</span></a>
      <button className="menu-button icon-button" type="button" onClick={() => setOpen((value) => !value)} aria-controls="primary-navigation-links" aria-expanded={open} aria-label="Toggle navigation">
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <div className={`nav-links ${open ? 'nav-open' : ''}`} id="primary-navigation-links">
        {links.map(([label, id]) => (
          <a className={active === id ? 'active' : ''} key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => { setActive(id); setOpen(false) }}>{label}</a>
        ))}
      </div>
      <div className="nav-actions">
        <ProfileViewsCounter />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        {personal.cvPath && <a className="button button-small" href={personal.cvPath} download>Download CV</a>}
      </div>
    </nav>
  )
}
