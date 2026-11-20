import { GraduationCap, BrainCircuit, Eye, Code2 } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import { personal } from '../data/personal'
import { education } from '../data/education'

export default function About() {
  const areaIcons = { academic: GraduationCap, ai: BrainCircuit, vision: Eye, software: Code2 }
  const aboutAreas = (personal.aboutAreas ?? []).filter((area) => area?.title)
  const currentGoals = (personal.currentGoals ?? []).filter(Boolean)
  const hasAboutStory = Boolean(personal.about || personal.philosophy)

  if (!hasAboutStory && aboutAreas.length === 0 && currentGoals.length === 0) return null

  return (
    <section className="section" id="about">
      <SectionHeading eyebrow="01 / About" title="Engineering with curiosity" description="A developing perspective shaped by learning, experimentation, and practical problem-solving." />
      <div className="about-grid">
        {hasAboutStory && <Reveal className="about-story">
          {personal.about && <p>{personal.about}</p>}
          {personal.philosophy && <blockquote>{personal.philosophy}</blockquote>}
        </Reveal>}
        {aboutAreas.length > 0 && <div className="area-grid">
          {aboutAreas.map((area, index) => {
            const Icon = areaIcons[area.icon] || Code2
            const description = area.education
              ? [education.degree, education.institution].filter(Boolean).join(' at ')
              : area.description
            return (
              <Reveal key={area.title} delay={index * 0.07}>
                <article className="area-card"><Icon size={20} /><h3>{area.title}</h3>{description && <p>{description}</p>}</article>
              </Reveal>
            )
          })}
        </div>}
      </div>
      {currentGoals.length > 0 && (
        <Reveal>
          <div className="goal-strip"><span>Current learning goals</span><div>{currentGoals.map((goal) => <p key={goal}>{goal}</p>)}</div></div>
        </Reveal>
      )}
    </section>
  )
}
