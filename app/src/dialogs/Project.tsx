import { Avatar, AvatarGroup, Box, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useToggle } from 'usehooks-ts'

import { Back, Button, Icon, MeetCard } from '../components'
import { Block } from '../components/Block'
import { Parameter, Parameters } from '../components/Parameters'
import Typography from '../components/Typography'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { getAgeTitle } from '../tools/helper'
import { getOnShare } from '../tools/pwa'
import { useCreateParticipation, useDeleteParticipation, useProject } from '../tools/service'
import EditMeet from './EditMeet'
import EditProject from './EditProject'

const useStyles = makeStyles(() => ({
  container: {
    position: 'absolute',
    top: -33,
    width: '100%',
  },
  container2: {
    backgroundColor: 'white',
    borderRadius: 28,
    padding: '24px 26px',
  },
  image: {
    width: '100%',
    height: 230,
    objectFit: 'cover',
  },
}))

export interface ProjectDialogProps {
  projectId: number
  onClose: () => void
}
function ProjectDialog({ projectId, onClose }: ProjectDialogProps) {
  const { user, isAuth, passport } = useAuth()
  const classes = useStyles()

  const { data: project, refetch } = useProject(Number(projectId))
  const [edit, toggleCreate] = useToggle()
  const [createMeet, toggleCreateMeet] = useToggle()

  const createParticipation = useCreateParticipation()
  const deleteParticipation = useDeleteParticipation()

  if (!project) return null

  const participation = project.participations?.find(({ userId }) => userId === user?.id)
  const editable = project.passportId === passport?.id

  const parameters = [
    { name: 'place', title: 'Место', value: project?.place?.title },
    { name: 'age', title: 'Рек. возраст', value: getAgeTitle(project?.ageFrom, project?.ageTo) },
    {
      name: 'passport',
      title: 'Организатор',
      value: (
        <span>
          {project.passport?.title}
          {project.passportId === passport?.id && ' (Вы)'}
        </span>
      ),
    },
  ] as Parameter[]

  const onCreateParticipation = () =>
    createParticipation.mutateAsync({ projectId: project.id, userId: user.id }).then(() => refetch())
  const onDeleteParticipation = () =>
    participation && deleteParticipation.mutateAsync(participation).then(() => refetch())

  const menuItems = []
  if (editable) {
    menuItems.push({ title: 'Новая встреча', onClick: toggleCreateMeet })
    menuItems.push({ title: 'Редактировать', onClick: toggleCreate })
  }
  if (participation) {
    menuItems.push({ title: 'Выйти из проекта', onClick: onDeleteParticipation })
  }
  const onShare = getOnShare({
    title: `Приглашаю в проект: ${project?.title}`,
    url: `/project/${project?.id}`,
  })

  const onCloseEditProject = () => {
    toggleCreate()
    refetch()
  }
  const onCloseCreateMeet = () => {
    toggleCreateMeet()
    refetch()
  }

  return (
    <>
      <div style={{ position: 'relative', backgroundColor: 'rgb(245, 245, 245)' }}>
        <div style={{ position: 'absolute', top: 18, left: 16, right: 16 }}>
          <Back menuItems={menuItems} onClick={onClose} />
        </div>
        <div style={{ height: 230 }}>
          {project.image && <img alt={project.title} src={project.image} className={classes.image} />}
        </div>
        <div style={{ position: 'relative' }}>
          <Stack className={classes.container} spacing={3}>
            <Stack className={classes.container2} spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignContent="center">
                <Typography variant="Header1">{project.title}</Typography>
                <Icon name="share" onClick={onShare} />
              </Stack>
              <Typography variant="Subheader1">{project.description}</Typography>
              {Boolean(project.participations.length) && (
                <Block title="Участники">
                  <Box sx={{ display: 'flex' }}>
                    <AvatarGroup max={4}>
                      {project.participations?.map((participation) => (
                        <Avatar
                          key={participation.user?.id}
                          alt={participation.user?.title}
                          src={participation.user?.image}
                          sx={{ width: 40, height: 40 }}
                        />
                      ))}
                    </AvatarGroup>
                  </Box>
                </Block>
              )}
              {!participation && isAuth && user && <Button onClick={onCreateParticipation}>Присоединиться</Button>}
              <Parameters items={parameters} />
            </Stack>
            <Block variant="secondary">
              {Boolean(project.meets?.length) && (
                <Block title="Расписание">
                  <Stack flexDirection="column" spacing={1}>
                    {project.meets?.map((meet) => {
                      return <MeetCard key={meet.id} meet={meet} refetch={refetch} showDate />
                    })}
                  </Stack>
                </Block>
              )}
            </Block>
          </Stack>
        </div>
      </div>
      <EditProject projectId={project.id} open={edit} onClose={onCloseEditProject} onDeleteProject={onClose} />
      <EditMeet defaultProjectId={project.id} open={createMeet} onClose={onCloseCreateMeet} />
    </>
  )
}

export default withDialog(ProjectDialog)
