import {Box, Skeleton, Stack} from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, ProjectCard } from '../components'
import AppBar from '../components/AppBar'
import { DialogContent } from '../components/DialogContent'
import { RecommendationProjects } from '../components/RecommendationProjects'
import Tabs from '../components/Tabs'
import { useAuth } from '../tools/auth'
import { useProjects } from '../tools/service'
import { COLOR_PAPER } from '../tools/theme'

function Projects() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: userProjects = [], isFetching } = useProjects({ variant: 'participation', userId: user?.id })

  return (
    <Box style={{ backgroundColor: COLOR_PAPER, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar />
      <DialogContent>
        <Stack spacing={4} style={{ padding: 16 }}>
          <Stack spacing={3}>
            {!user && <img src="/forTeacher.svg" style={{ width: '100%' }} />}
            {user && isFetching && <Skeleton variant="rounded" height={94} />}
            {user && !isFetching && Boolean(userProjects.length) && (
              <Stack spacing={2}>
                {userProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    variant="self"
                  />
                ))}
              </Stack>
            )}
            <Button onClick={() => navigate('/project')}>Организовать проект</Button>
          </Stack>
          <RecommendationProjects />
        </Stack>
      </DialogContent>
      <Tabs isProjectsTab />
    </Box>
  )
}
export default Projects
