import { Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, ProjectCard } from '../components'
import { DialogContent } from '../components/DialogContent'
import { RecommendationProjects } from '../components/RecommendationProjects'
import Tabs from '../components/Tabs'
import Typography from '../components/Typography'
import { useAuth } from '../tools/auth'
import { useProjects } from '../tools/service'

function Projects() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: userProjects = [] } = useProjects({ variant: 'participation', userId: user?.id })

  return (
    <>
      <DialogContent>
        <Stack spacing={4} style={{ padding: 16 }}>
          {userProjects.length ? (
            <Stack spacing={2}>
              <Typography variant="Header2">частвует в проектах</Typography>
              <Stack spacing={1}>
                {userProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    //refetchParent={refetchSelfProjects}
                    variant="self"
                  />
                ))}
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={3}>
              <img src="/forTeacher.svg" style={{ width: '100%' }} />
              <Button onClick={() => navigate('/project')}>Создать свой проект</Button>
            </Stack>
          )}
          <RecommendationProjects />
        </Stack>
      </DialogContent>
      <Tabs isProjectsTab />
    </>
  )
}
export default Projects
