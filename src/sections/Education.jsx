import { GraduationCap, Users } from 'lucide-react'
import Reveal from '../components/Reveal'
import { education, leadership } from '../data/education'

export default function Education() {
  const educationDetails = [
    ['Duration', education.duration],
    ['Expected graduation', education.expectedGraduation],
    ['Coursework', education.coursework],
  ].filter(([, value]) => value)
  const leadershipDetails = [
    ['Position', leadership.position],
    ['Responsibilities', leadership.responsibilities],
    ['Events', leadership.events],
    ['Achievements', leadership.achievements],
    ['Year', leadership.year],
  ].filter(([, value]) => value)
  const hasEducation = Boolean(education.degree || education.institution || educationDetails.length)
  const hasLeadership = Boolean(leadership.club || leadership.institution || leadershipDetails.length)

  if (!hasEducation && !hasLeadership) return null

  return (
    <section className="section" id="education" aria-labelledby="education-heading">
      <h2 className="visually-hidden" id="education-heading">Education and leadership</h2>
      <div className="education-grid">
        {hasEducation && (
          <Reveal className="education-card-reveal">
            <article className="education-card">
              <div className="card-icon"><GraduationCap size={22} /></div>
              <span className="eyebrow">Education</span>
              {education.degree && <h3>{education.degree}</h3>}
              {education.institution && <p className="institution">{education.institution}</p>}
              {educationDetails.length > 0 && <dl>{educationDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            </article>
          </Reveal>
        )}
        {hasLeadership && (
          <Reveal className="education-card-reveal" delay={0.1}>
            <article className="education-card">
              <div className="card-icon"><Users size={22} /></div>
              <span className="eyebrow">Leadership & activities</span>
              {leadership.club && <h3>{leadership.club}</h3>}
              {leadership.institution && <p className="institution">{leadership.institution}</p>}
              {leadershipDetails.length > 0 && <dl>{leadershipDetails.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>}
            </article>
          </Reveal>
        )}
      </div>
    </section>
  )
}
