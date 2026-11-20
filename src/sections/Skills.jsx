import { Braces, BrainCircuit, Cpu, ScanEye, LayoutTemplate, Wrench } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { skillGroups, proficiency } from '../data/skills'

const icons = [Braces, BrainCircuit, Cpu, ScanEye, LayoutTemplate, Wrench]

export default function Skills() {
  const visibleGroups = skillGroups.filter((group) => group.skills?.length > 0)
  if (visibleGroups.length === 0) return null

  return (
    <section className="section" id="skills">
      <SectionHeading eyebrow="02 / Skills" title="Tools I work with" description="Organized by learning area, with honest proficiency labels rather than arbitrary percentages." />
      <div className="skills-grid">
        {visibleGroups.map((group, index) => {
          const Icon = icons[index] || Wrench
          return (
            <Reveal key={group.title} delay={index * 0.06}>
              <article className="skill-card">
                <div className="skill-card-head"><Icon size={20} /><h3>{group.title}</h3></div>
                <div className="skill-tags">{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                <p>{proficiency}</p>
              </article>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}
