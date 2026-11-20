import { Moon, Sun } from 'lucide-react'

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button className="icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} aria-pressed={theme === 'light'}>
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
