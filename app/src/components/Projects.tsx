import Masonry from '@mui/lab/Masonry'
import React from 'react'

import { ProjectCard } from '../cards/ProjectCard'
import { Project } from '../tools/dto'

interface ProjectsProps {
  items: Project[]
}
export function Projects({ items }: ProjectsProps): React.ReactNode {
  return (
    Boolean(items.length) && (
      <Masonry columns={2} spacing={1}>
        {items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Masonry>
    )
  )
}
