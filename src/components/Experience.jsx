import Card from './Card.jsx'
import MetaList from './MetaList.jsx'
import Rich from './Rich.jsx'
import Section from './Section.jsx'
import { experience } from '../data/experience.js'
import { sections } from '../data/site.js'
import './Experience.css'

export default function Experience() {
  return (
    <Section content={sections.experience}>
      <div className="experience__grid">
        {experience.map(({ id, kind, period, title, summary, bullets }) => (
          <Card key={id} as="article">
            <MetaList items={[kind, period]} />
            <h3 className="experience__title">{title}</h3>
            {summary && <p className="experience__text">{summary}</p>}
            {bullets && (
              <ul className="experience__list">
                {bullets.map((bullet) => (
                  <li key={bullet}>
                    <Rich text={bullet} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        ))}
      </div>
    </Section>
  )
}
