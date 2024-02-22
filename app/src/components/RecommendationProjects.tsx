import Masonry from '@mui/lab/Masonry'
import { Stack } from '@mui/material'
import React from 'react'

import { ProjectCard } from '../cards/ProjectCard'
import { useAuth } from '../tools/auth'
import { useProjects } from '../tools/service'
import { Button } from './Button'
import Typography from './Typography'
import {useNavigate} from "react-router-dom";

export function RecommendationProjects(): JSX.Element {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: projects = [] } = useProjects({ variant: 'recommendation', userId: user?.id })

  return (
    <Stack spacing={2}>
      {Boolean(projects.length) && (
        <>
          <Typography variant="Header2">Проекты для вдохновения</Typography>
          <Masonry columns={2} spacing={1}>
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} variant="recommendation" />
            ))}
          </Masonry>
        </>
      )}
      <Button onClick={() => navigate('/projects')} variant="outlined">
        Банк проектов
      </Button>
    </Stack>
  )
}
