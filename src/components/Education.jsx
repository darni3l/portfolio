import Card from './Card.jsx'
import Section from './Section.jsx'
import { education } from '../data/education.js'
import { sections } from '../data/site.js'
import './Education.css'

export default function Education() {
  return (
    <Section content={sections.education}>
      <div className="education__grid">
        {education.map(({ id, label, title, paragraphs }) => (
          <Card key={id} as="article">
            <p className="education__label">{label}</p>
            <h3 className="education__title">{title}</h3>
            {paragraphs.map(({ text, muted }) => (
              <p key={text} className={`education__text ${muted ? 'education__text--muted' : ''}`}>
                {text}
              </p>
            ))}
          </Card>
        ))}
      </div>
    </Section>
  )
}
