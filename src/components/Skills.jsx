import Section from './Section.jsx'
import Tag from './Tag.jsx'
import { skillGroups } from '../data/skills.js'
import { sections } from '../data/site.js'
import './Skills.css'

// Evidence-level marker: shape differs per level so the meaning does not rely on colour alone.
function Mark({ variant }) {
  const common = { cx: 8, cy: 8, r: 6, strokeWidth: 2 }
  return (
    <svg className="skills__mark" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      {variant === 'solid' && <circle {...common} fill="currentColor" stroke="currentColor" />}
      {variant === 'tint' && (
        <>
          <circle {...common} fill="none" stroke="currentColor" />
          <path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor" />
        </>
      )}
      {variant === 'plain' && <circle {...common} fill="none" stroke="currentColor" />}
      {variant === 'dashed' && (
        <circle {...common} fill="none" stroke="currentColor" strokeDasharray="3 2.5" />
      )}
    </svg>
  )
}

export default function Skills() {
  return (
    <Section content={sections.skills}>
      <div className="skills__grid">
        {skillGroups.map(({ id, label, variant, items }) => (
          <div key={id}>
            <h3 className="skills__heading">
              <Mark variant={variant} />
              {label}
            </h3>
            <ul className="tags">
              {items.map((item) => (
                <Tag key={item} variant={variant}>
                  {item}
                </Tag>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
