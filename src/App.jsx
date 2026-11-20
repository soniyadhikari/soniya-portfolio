import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion as Motion, useReducedMotion } from 'motion/react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useTheme } from './hooks/useTheme'
import { personal } from './data/personal'
import { projects } from './data/projects'
import Home from './pages/Home'
import ProjectDetails from './pages/ProjectDetails'
import NotFound from './pages/NotFound'

const siteUrl = personal.website.replace(/\/+$/, '')
const homeTitle = [
  personal.name,
  personal.roles.map((role) => role.replace(/^(?:a|an)\s+/i, '')).filter(Boolean).slice(0, 2).join(' & '),
].filter(Boolean).join(' | ')
const homeDescription = personal.seoDescription

function setMeta(selector, attributes, content) {
  let element = document.head.querySelector(selector)
  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value))
    document.head.append(element)
  }
  element.setAttribute('content', content)
}

function PageMetadata() {
  const { pathname } = useLocation()

  useEffect(() => {
    const projectSlug = pathname.match(/^\/projects\/([^/]+)\/?$/)?.[1]
    const project = projects.find((item) => item.slug === projectSlug)
    const isHome = pathname === '/'
    const isUnknown = !isHome && !project
    const title = project
      ? `${project.title} | ${personal.name}`
      : isHome ? homeTitle : `Page not found | ${personal.name}`
    const description = project?.description || (isHome
      ? homeDescription
      : 'The requested page could not be found.')
    const pageUrl = new URL(pathname, `${siteUrl}/`).href

    document.title = title
    setMeta('meta[name="description"]', { name: 'description' }, description)
    setMeta('meta[property="og:title"]', { property: 'og:title' }, title)
    setMeta('meta[property="og:description"]', { property: 'og:description' }, description)
    setMeta('meta[property="og:url"]', { property: 'og:url' }, pageUrl)
    setMeta('meta[property="og:image"]', { property: 'og:image' }, `${siteUrl}/social-card.png`)
    setMeta('meta[property="og:image:alt"]', { property: 'og:image:alt' }, `${personal.name} — ${personal.seoDescription}`)
    setMeta('meta[property="og:image:width"]', { property: 'og:image:width' }, '1200')
    setMeta('meta[property="og:image:height"]', { property: 'og:image:height' }, '630')
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, title)
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, description)
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image' }, `${siteUrl}/social-card.png`)

    const canonical = document.head.querySelector('link[rel="canonical"]')
    if (isUnknown) {
      canonical?.remove()
      setMeta('meta[name="robots"]', { name: 'robots' }, 'noindex, nofollow')
    } else {
      const canonicalLink = canonical || document.createElement('link')
      canonicalLink.setAttribute('rel', 'canonical')
      canonicalLink.setAttribute('href', pageUrl)
      if (!canonical) document.head.append(canonicalLink)
      document.head.querySelector('meta[name="robots"]')?.remove()
    }
  }, [pathname])

  return null
}

function App() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const reduceMotion = useReducedMotion()

  return (
    <div className="app-shell">
      <PageMetadata />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait" initial={false}>
        <Motion.div
          key={location.pathname}
          className="route-transition"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
          transition={{ duration: reduceMotion ? 0 : 0.24, ease: 'easeOut' }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
export default App
