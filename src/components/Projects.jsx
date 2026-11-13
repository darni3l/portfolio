import { useState } from 'react'
import ProjectCard from './ProjectCard.jsx'
import ProjectModal from './ProjectModal.jsx'
import Section from './Section.jsx'
import { projects } from '../data/projects.js'
import { sections } from '../data/site.js'
import './Projects.css'

export default function Projects() {
  const [openId, setOpenId] = useState(null)
  const open = projects.find((project) => project.id === openId) ?? null

  return (
    <Section content={sections.projects}>
      <div className="projects__grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setOpenId} />
        ))}
      </div>
      <ProjectModal project={open} onClose={() => setOpenId(null)} />
    </Section>
  )
}
