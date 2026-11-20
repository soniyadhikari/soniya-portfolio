import { useRef, useState } from 'react'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import { personal } from '../data/personal'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'

export default function Terminal() {
  const reduceMotion = useReducedMotion()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { command: '', output: 'Portfolio terminal ready. Type “help” to begin.' },
  ])
  const inputRef = useRef(null)
  const username = personal.name.split(/\s+/)[0].toLowerCase()

  const runCommand = (event) => {
    event.preventDefault()
    const command = input.trim().toLowerCase()
    if (!command) return
    let output
    if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    }
    if (command === 'help') output = 'Available: help · about · skills · projects · contact · clear'
    else if (command === 'about') output = `${personal.name} — ${personal.roles.join(', ')}`
    else if (command === 'skills') output = skillGroups.map((group) => `${group.title}: ${group.skills.join(', ')}`).join('\n')
    else if (command === 'projects') output = projects.map((project) => `• ${project.title} — ${project.status}`).join('\n')
    else if (command === 'contact') output = personal.email.includes('placeholder') ? 'Email is a placeholder. Set personal.email in src/data/personal.js.' : personal.email
    else output = `Command not found: ${command}. Type “help” for available commands.`
    setHistory((items) => [...items, { command, output }])
    setInput('')
  }

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar"><span /><span /><span /><p>{username}@portfolio:~</p></div>
      <div className="terminal-content" role="log" aria-live="polite">
        <AnimatePresence initial={false}>
          {history.map((item, index) => (
            <Motion.div
              key={index}
              initial={reduceMotion ? false : { opacity: 0, y: 7 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            >
              {item.command && <p><span className="terminal-prompt">guest@portfolio:~$</span> {item.command}</p>}
              <pre>{item.output}</pre>
            </Motion.div>
          ))}
        </AnimatePresence>
        <form onSubmit={runCommand}>
          <label htmlFor="terminal-input"><span className="terminal-prompt">guest@portfolio:~$</span></label>
          <input ref={inputRef} id="terminal-input" value={input} onChange={(event) => setInput(event.target.value)} autoComplete="off" spellCheck="false" aria-label="Terminal command" />
        </form>
      </div>
    </div>
  )
}
