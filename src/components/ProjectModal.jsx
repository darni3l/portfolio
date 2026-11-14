import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'
import MetaList from './MetaList.jsx'
import ProjectDetail from './ProjectDetail.jsx'
import './ProjectModal.css'

// Native <dialog>: focus trap, Escape to close and focus return come from the browser.
export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (project && !dialog.open) dialog.showModal()
    if (!project && dialog.open) dialog.close()
    document.documentElement.classList.toggle('modal-open', Boolean(project))
    return () => document.documentElement.classList.remove('modal-open')
  }, [project])

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby="project-modal-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose() // click on the backdrop
      }}
    >
      {project && (
        <div className="modal__panel">
          <header className="modal__header">
            <div>
              <MetaList
                items={[project.caseLabel, project.kind, project.context, project.period]}
              />
              <h2 id="project-modal-title" className="modal__title">
                {project.title}
              </h2>
            </div>
            <button
              type="button"
              className="modal__close"
              aria-label="Close project details"
              onClick={onClose}
            >
              <Icon name="close" size={20} />
            </button>
          </header>
          <div className="modal__body" tabIndex={0}>
            <ProjectDetail project={project} />
          </div>
        </div>
      )}
    </dialog>
  )
}
