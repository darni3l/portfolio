import Icon from './Icon.jsx'
import { profile } from '../data/profile.js'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <p className="footer__text">
          {profile.name}, {profile.location}
        </p>
        <a className="footer__top" href="#top">
          <Icon name="arrow-up" size={16} />
          Back to top
        </a>
      </div>
    </footer>
  )
}
