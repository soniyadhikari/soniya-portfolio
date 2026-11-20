import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description }) {
  return (
    <Reveal>
      <header className="section-heading">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </header>
    </Reveal>
  )
}
