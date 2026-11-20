import { GitFork, Link, Mail, ArrowUp, Users, Camera } from 'lucide-react'
import { gmailComposeUrl, personal } from '../data/personal'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <a className="brand" href="/#home">{personal.initials}<span>.</span></a>
        <p>{personal.name}</p>
      </div>
      <nav aria-label="Footer navigation">
        {['About', 'Skills', 'Projects', 'Journey', 'Contact'].map((label) => (
          <a key={label} href={`/#${label.toLowerCase()}`}>{label}</a>
        ))}
      </nav>
      <div className="footer-social">
        {personal.github && <a href={personal.github} target="_blank" rel="noreferrer" aria-label="GitHub"><GitFork size={18} /></a>}
        {personal.linkedin && <a href={personal.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Link size={18} /></a>}
        {personal.facebook && <a href={personal.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Users size={18} /></a>}
        {personal.instagram && <a href={personal.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Camera size={18} /></a>}
        {personal.email && <a href={gmailComposeUrl} target="_blank" rel="noreferrer" aria-label={`Email ${personal.name} with Gmail`} title="Opens a Gmail compose window"><Mail size={18} /></a>}
        <a href="/#home" aria-label="Back to top"><ArrowUp size={18} /></a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} {personal.name}. All rights reserved.</p>
    </footer>
  )
}
