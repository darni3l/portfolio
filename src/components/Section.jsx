import './Section.css'

// Shared wrapper: label, one h2, optional intro, then the section body.
export default function Section({ content, children }) {
  const { id, label, title, intro } = content
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="container">
        <header className="section__head">
          <p className="section__label">{label}</p>
          <h2 id={`${id}-title`} className="section__title">
            {title}
          </h2>
          {intro && <p className="section__intro">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
