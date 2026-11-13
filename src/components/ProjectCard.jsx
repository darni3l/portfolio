import Button from './Button.jsx'
import Card from './Card.jsx'
import MetaList from './MetaList.jsx'
import Rich from './Rich.jsx'
import Tag from './Tag.jsx'
import './ProjectCard.css'

export default function ProjectCard({ project, onOpen }) {
  const { caseLabel, kind, context, period, title, description, tools } = project
  return (
    <Card as="article" className="project-card">
      <MetaList items={[caseLabel, kind, context, period]} />
      <h3 className="project-card__title">{title}</h3>
      <p className="project-card__desc">
        <Rich text={description} />
      </p>
      {tools?.length > 0 && (
        <ul className="tags project-card__tools" aria-label={`Tools for ${caseLabel}`}>
          {tools.map((tool) => (
            <Tag key={tool}>{tool}</Tag>
          ))}
        </ul>
      )}
      <Button
        className="project-card__open"
        variant="primary"
        icon="arrow-right"
        aria-haspopup="dialog"
        aria-label={`View details: ${title}`}
        onClick={() => onOpen(project.id)}
      >
        View details
      </Button>
    </Card>
  )
}
