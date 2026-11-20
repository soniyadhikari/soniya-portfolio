import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import { projects } from '../data/projects'

export default function Projects() {
  if (projects.length === 0) return null

  return (
    <section className="section" id="projects">
      <SectionHeading
        eyebrow="03 / Projects"
        title="Selected engineering work"
        description="A curated selection of projects I want to highlight."
      />
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            project={{ ...project, index: index + 1 }}
            key={project.slug}
          />
        ))}
      </div>
    </section>
  )
}
