import { Avatar, Stack } from '@mui/material'
import React from 'react'
import { useToggle } from 'usehooks-ts'

import { Button, Card, Icon } from '../components'
import { Parameter } from '../components/Parameter'
import Typography from '../components/Typography'
import EditIdea from '../dialogs/EditIdea'
import SelectProject from '../dialogs/SelectProject'
import { useAuth } from '../tools/auth'
import { Idea, Project } from '../tools/dto'
import { useCreateInvite, useProjects } from '../tools/service'

interface IdeaCardProps {
  idea: Idea
  refetch: () => void
  onAdd?: (idea: Idea) => void
  invited?: boolean
}
export function IdeaCard({ idea, refetch, onAdd, invited }: IdeaCardProps): JSX.Element {
  const { user, isAuth } = useAuth()

  const { data: selfProjects = [], refetch: refetchSelfProject } = useProjects({ type: 'self' })

  const [project, toggleProject] = useToggle()
  const [create, toggleCreate] = useToggle()
  const createInvite = useCreateInvite()

  const onInvite = (e: React.MouseEvent<HTMLElement>) => {
    !onAdd ? toggleProject() : onAdd(idea)
    e.stopPropagation()
  }
  const onSelectProject = (project: Project) => {
    idea &&
      createInvite.mutateAsync({ projectId: project.id, userId: idea.userId, ideaId: idea.id }).then(() => {
        refetch()
        refetchSelfProject()
      })
  }

  const self = user?.id === idea.userId
  const inviteProjectIds = idea?.invites?.map((invite) => invite.projectId)
  const filteredProjects = selfProjects.filter((project) => !inviteProjectIds?.includes(project.id))

  return (
    <>
      <Card onClick={self ? toggleCreate : undefined}>
        <Stack spacing={2} style={{ padding: '8px 16px' }}>
          <Typography variant="Body-Bold">{idea.title}</Typography>
          <Typography variant="Body">{idea.description}</Typography>
          {!self ? (
            <Stack spacing={1} justifyContent="space-between" alignItems="center" direction="row">
              <Stack spacing={1} direction="row" alignItems="center">
                <Avatar alt={idea.user?.title} src={idea.user?.image} sx={{ width: 21, height: 21 }} />
                <Typography variant="Body">
                  {idea.user?.title}, {idea.user?.age} лет
                </Typography>
              </Stack>
              {(idea.distance || idea.distance === 0) && (
                <Parameter name="distanceSmall" variant="secondary" title={Math.round(idea.distance) + 'м.'} />
              )}
              {(isAuth || onAdd) && (
                <>
                  {invited ? (
                    <Button variant="small2" onClick={onInvite}>
                      Приглашен
                    </Button>
                  ) : (
                    <Button disabled={!filteredProjects.length} variant="small" onClick={onInvite}>
                      Пригласить
                    </Button>
                  )}
                </>
              )}
            </Stack>
          ) : (
            <Stack spacing={1} direction="row" alignItems="center">
              <Icon name="inviteSmall" />
              <Typography variant="Body">{idea.invites?.length || 'Нет'} приглашений</Typography>
            </Stack>
          )}
        </Stack>
      </Card>
      <SelectProject
        projects={filteredProjects}
        open={project}
        onClose={() => {
          toggleProject()
        }}
        onChange={(p: Project) => {
          onSelectProject(p)
          toggleProject()
        }}
      />
      <EditIdea
        ideaId={idea.id}
        open={create}
        onClose={() => {
          toggleCreate()
          refetch()
        }}
      />
    </>
  )
}
