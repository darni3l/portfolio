import ThemeToggle from './ThemeToggle.jsx'
import { useActiveSection } from '../hooks/useActiveSection.js'
import { profile } from '../data/profile.js'
import { sections, navOrder } from '../data/site.js'
import './Nav.css'

export default function Nav() {
  const active = useActiveSection(navOrder)
  return (
    <header className="nav">
      <div className="nav__inner container">
        <a className="nav__brand" href="#top">
          {profile.name}
        </a>
        <nav className="nav__links" aria-label="Primary">
          <ul className="nav__list">
            {navOrder.map((id) => (
              <li key={id}>
                <a
                  className="nav__link"
                  href={`#${id}`}
                  aria-current={active === id ? 'location' : undefined}
                >
                  {sections[id].nav}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="nav__toggle-slot">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
