import DataTable from './DataTable.jsx'
import FigureSlot from './FigureSlot.jsx'
import MetricGrid from './MetricGrid.jsx'
import { TextPlaceholder } from './Placeholder.jsx'
import Rich from './Rich.jsx'
import Tag from './Tag.jsx'
import Icon from './Icon.jsx'
import './ProjectDetail.css'
import DockingViewer from './DockingViewer.jsx'

// Detail view body. Renders only the fields a project actually provides.
export default function ProjectDetail({ project }) {
  const { description, tools, steps, metrics, table, notes, links, noLinksNote, figure } = project
  const hasBody = steps?.length || metrics?.length || table || notes?.length

  return (
    <div className="detail">
      <p className="detail__lead">
        <Rich text={description} />
      </p>

      {tools?.length > 0 && (
        <div>
          <h3 className="detail__heading">Tools</h3>
          <ul className="tags">
            {tools.map((tool) => (
              <Tag key={tool}>{tool}</Tag>
            ))}
          </ul>
        </div>
      )}

      {!hasBody && <TextPlaceholder what="methodology and results for this project (src/data/projects.js)" />}

      {steps?.length > 0 && (
        <div>
          <h3 className="detail__heading">Methodology</h3>
          <ul className="steps">
            {steps.map(({ label, text }) => (
              <li key={label} className="steps__item">
                <p className="steps__label">{label}</p>
                <p className="steps__text">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {metrics?.length > 0 && (
        <div>
          <h3 className="detail__heading">Results</h3>
          <MetricGrid metrics={metrics} />
        </div>
      )}

      {table && (
        <div>
          <h3 className="detail__heading">Results</h3>
          <DataTable table={table} />
        </div>
      )}

      {notes?.map(({ label, text, tone }) => (
        <p key={label} className={`note ${tone === 'limits' ? 'note--limits' : ''}`}>
          <strong>{label}.</strong> {text}
        </p>
      ))}

      {project.viewer === 'docking' ? (
        <DockingViewer compact fallback={<FigureSlot figure={figure} />} />
      ) : (
      <FigureSlot figure={figure} />
      )}

      <div className="detail__links">
        {links?.length > 0 ? (
          <ul className="detail__link-list">
            {links.map(({ label, href }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {label} <Icon name="external" size={15} className="detail__ext" />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          noLinksNote && <p className="detail__muted">{noLinksNote}</p>
        )}
      </div>
    </div>
  )
}
