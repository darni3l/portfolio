import Button from './Button.jsx'
import Icon from './Icon.jsx'
import Section from './Section.jsx'
import { links } from '../data/links.js'
import { profile } from '../data/profile.js'
import { sections } from '../data/site.js'
import { asset } from '../utils/asset.js'
import './Contact.css'

const ROWS = [
  { key: 'email', icon: 'mail' },
  { key: 'linkedin', icon: 'linkedin' },
  { key: 'github', icon: 'github' },
]

export default function Contact() {
  return (
    <Section content={sections.contact}>
      <ul className="contact__list">
        {ROWS.map(({ key, icon }) => {
          const { label, href, text } = links[key]
          const external = !href.startsWith('mailto:')
          return (
            <li key={key}>
              <a
                className="contact__row"
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Icon name={icon} size={22} />
                <span className="contact__text">
                  <span className="contact__label">{label}</span>
                  <span className="contact__value">{text}</span>
                </span>
                {external && <Icon name="external" size={16} className="contact__ext" />}
                {external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          )
        })}
        <li className="contact__place">
          <Icon name="pin" size={22} />
          <span>{profile.location}</span>
        </li>
      </ul>
      <div className="contact__cv">
        <Button
          href={asset(links.cv.href)}
          download={links.cv.downloadName}
          variant="primary"
          icon="download"
        >
          {links.cv.label}
        </Button>
      </div>
    </Section>
  )
}
