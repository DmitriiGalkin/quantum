import { Stack } from '@mui/material'
import React from 'react'

import { DialogHeader, ProjectCard } from '../components'
import { withDialog } from '../components/helper'
import { Project } from '../tools/dto'

export interface SelectProjectProps {
  projects: Project[]
  onClose: () => void
  onChange: (project: Project) => void
}
function SelectProject({ projects, onClose, onChange }: SelectProjectProps): React.ReactNode {
  return (
    <>
      <DialogHeader title="Выберите свой проект" onClick={onClose} />
      <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: 16 }}>
        <Stack spacing={1}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onClick={onChange} variant="admin" />
          ))}
        </Stack>
      </div>
    </>
  )
}
export default withDialog(SelectProject)
