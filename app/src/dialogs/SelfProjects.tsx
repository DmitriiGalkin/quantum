import { Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, DialogHeader, ProjectCard } from '../components'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { useProjects } from '../tools/service'

export interface ProjectsProps {
  onClose: () => void
}
function Projects({ onClose }: ProjectsProps) {
  const navigate = useNavigate()
  const { data: selfProjects = [], refetch: refetchSelfProjects } = useProjects({ variant: 'self' })

  return (
    <>
      <DialogHeader title="Мои проекты" onClick={onClose} />
      <DialogContent>
        <Stack spacing={2} style={{ padding: 15 }}>
          {Boolean(selfProjects.length) && (
            <Stack spacing={1}>
              {selfProjects.map((project) => (
                <ProjectCard key={project.id} project={project} refetchParent={refetchSelfProjects} variant="self" />
              ))}
            </Stack>
          )}
          <Button onClick={() => navigate('/project')}>Создать проект</Button>
        </Stack>
      </DialogContent>
    </>
  )
}
export default withDialog(Projects)
