import { useEffect } from 'react'
import { ArrowLeft, GitFork, ExternalLink } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { projects } from '../data/projects'
import NotFound from './NotFound'

export default function ProjectDetails() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!project) return <NotFound />

  const details = [
    ['Project overview', project.overview],
    ['Problem statement', project.problem],
    ['Motivation', project.motivation],
    ['Proposed solution', project.solution],
    ['Implementation details', project.implementation],
    ['Challenges faced', project.challenges],
    ['Results and evaluation', project.results],
    ['Future improvements', project.future],
  ]

  return (
    <main className="detail-page">
      <Link className="back-link" to="/#projects"><ArrowLeft size={17} /> Back to all projects</Link>
      <header className="detail-header">
        <div>
          <span className="status-badge">{project.status}</span>
          <h1>
            {project.github
              ? <a className="project-title-link" href={project.github} target="_blank" rel="noreferrer">{project.title}<ExternalLink size={22} aria-hidden="true" /></a>
              : project.title}
          </h1>
          <p>{project.description}</p>
        </div>
      </header>
      <div className="detail-layout">
        <aside>
          <h2>Technologies</h2>
          <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
          <div className="detail-links">
            {project.github && <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer"><GitFork size={16} /> GitHub</a>}
            {project.demo ? <a className="button" href={project.demo} target="_blank" rel="noreferrer"><ExternalLink size={16} /> Live demo</a> : null}
          </div>
        </aside>
        <div className="detail-content">
          {details.map(([title, text]) => (
            text ? <section key={title}><h2>{title}</h2><p>{text}</p></section> : null
          ))}
          {project.architecture && <section><h2>System architecture</h2><p>{project.architecture}</p></section>}
        </div>
      </div>
    </main>
  )
}
