import Button from './Button.jsx'
import Card from './Card.jsx'
import { profile } from '../data/profile.js'
import { links } from '../data/links.js'
import { asset } from '../utils/asset.js'
import './Hero.css'

export default function Hero() {
  const { photo, next } = profile
  return (
    <section id="top" className="hero container" aria-labelledby="hero-title">
      <div className="hero__main">
        <p className="hero__title" style={{ '--i': 0 }}>
          {profile.title}
        </p>
        <h1 id="hero-title" className="hero__name" style={{ '--i': 1 }}>
          {profile.name}
        </h1>
        <p className="hero__positioning" style={{ '--i': 2 }}>
          {profile.positioning}
        </p>
        <p className="hero__intro" style={{ '--i': 3 }}>
          {profile.intro}
        </p>
        <div className="hero__actions" style={{ '--i': 4 }}>
          <Button href="#projects" variant="primary" icon="arrow-down">
            View projects
          </Button>
          <Button
            href={asset(links.cv.href)}
            download={links.cv.downloadName}
            variant="outline"
            icon="download"
          >
            {links.cv.label}
          </Button>
          <Button href="#contact" variant="outline" icon="mail">
            Contact
          </Button>
        </div>
      </div>

      <div className="hero__side" style={{ '--i': 5 }}>
        {photo?.src && (
          <img
            className="hero__photo"
            src={asset(photo.src)}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            decoding="async"
          />
        )}
        <Card as="aside" inverse aria-labelledby="next-title" className="hero__next">
          <p className="hero__next-label">{next.label}</p>
          <h2 id="next-title" className="hero__next-title">
            {next.title}
          </h2>
          {next.paragraphs.map((text) => (
            <p key={text} className="hero__next-text">
              {text}
            </p>
          ))}
        </Card>
      </div>
    </section>
  )
}
