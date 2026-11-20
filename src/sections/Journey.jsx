import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { journey } from '../data/journey'

export default function Journey() {
  if (journey.length === 0) return null

  return (
    <section className="section" id="journey">
      <SectionHeading eyebrow="05 / Journey" title="How my interests evolved" description="Milestones represent areas of exploration, not fixed claims of completion." />
      <div className="timeline">
        {journey.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.07}>
            <article className="timeline-item">
              <div className="timeline-marker">{String(index + 1).padStart(2, '0')}</div>
              <div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
