import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import Reveal from './Reveal'

export default function ProjectCard({ project }) {
  return (
    <Reveal className={`project-card-reveal project-tone-${project.index % 4} ${project.featured ? 'project-featured' : ''}`} delay={(project.index % 6) * 0.06}>
    <article className="project-card">
      <div className="project-body">
        {project.featured && <span className="featured-label">Featured project</span>}
        <div className="project-card-top">
          <span className="project-status"><i />{project.status}</span>
          <span className="project-index" aria-hidden="true">{String(project.index).padStart(2, '0')}</span>
        </div>
        <h3><Link className="project-title-link" to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        {project.description && <p>{project.description}</p>}
        {project.technologies?.length > 0 && <div className="tag-list">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>}
        <div className="project-actions">
          <Link className="text-link" to={`/projects/${project.slug}`}>View details <ArrowUpRight size={15} /></Link>
          {project.github && <a className="text-link" href={project.github} target="_blank" rel="noreferrer">View repository <ExternalLink size={15} /></a>}
        </div>
      </div>
    </article>
    </Reveal>
  )
}
