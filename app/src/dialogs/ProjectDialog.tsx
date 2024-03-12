import { Avatar, AvatarGroup, Box, Link, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
import { COLOR } from '../tools/theme'

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
interface IMapState {
  center: number[]
  zoom: number
}
function ProjectDialog() {
  const { id: projectId } = useParams()
  const navigate = useNavigate()
  const { user, isAuth, passport } = useAuth()
  const classes = useStyles()
  const { data: project, refetch } = useProject(projectId)
  const [state, setState] = useState<IMapState>()

  const [openMap, toggleOpenMap] = useToggle()

  const createParticipation = useCreateParticipation()
  const deleteParticipation = useDeleteParticipation()

  useEffect(() => {
    if (project?.place) {
      setState({ center: [Number(project.place.latitude), Number(project.place.longitude)], zoom: 16 })
    }
  }, [project, setState])

  if (!project) return null

  const participation = project.participations?.find(({ userId }) => userId === user?.id)
  const editable = project.passportId === passport?.id

  const parameters = [
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
    { name: 'age', title: 'Рек. возраст', value: getAgeTitle(project?.ageFrom, project?.ageTo) },
    { name: 'place', title: 'Место', value: <Link>{project?.place?.title}</Link>, onClick: toggleOpenMap },
  ] as Parameter[]

  const onCreateParticipation = () =>
    user && project && createParticipation.mutateAsync({ projectId: project.id, userId: user.id }).then(() => refetch())
  const onDeleteParticipation = () =>
    participation && deleteParticipation.mutateAsync(participation).then(() => refetch())

  const menuItems = []
  if (editable) {
    menuItems.push({ title: 'Новая встреча', onClick: () => navigate(`/meet?defaultProjectId=${project.id}`) })
    menuItems.push({ title: 'Редактировать', onClick: () => navigate(`edit`) })
  }
  if (participation) {
    menuItems.push({ title: 'Выйти из проекта', onClick: onDeleteParticipation })
  }
  const onShare = getOnShare({
    title: `Приглашаю в проект: ${project?.title}`,
    url: `/project/${project?.id}`,
  })

  const back = () => {
    navigate(-1)
  }

  return (
    <>
      <div style={{ position: 'relative', backgroundColor: 'rgb(245, 245, 245)' }}>
        <div style={{ position: 'absolute', top: 18, left: 16, right: 16 }}>
          <Back menuItems={menuItems} onClick={back} />
        </div>
        <div style={{ height: 230 }}>
          {project.image && <img alt={project.title} src={project.image} className={classes.image} />}
        </div>
        <div style={{ position: 'relative' }}>
          <Stack className={classes.container} spacing={3}>
            <Stack className={classes.container2} spacing={3}>
              <Stack direction="row" justifyContent="space-between" alignContent="center">
                <Typography variant="Header1">{project.title}</Typography>
                {navigator?.canShare?.() && <Icon name="share" onClick={onShare} />}
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
              {openMap && state && (
                <div style={{ height: 156, borderRadius: 8, overflow: 'hidden' }}>
                  <YMaps>
                    <Map
                      defaultState={state}
                      width="100%"
                      height="100%"
                      onBoundsChange={(xx: { originalEvent: { newCenter: number[] } }) => {
                        setState({ ...state, center: xx.originalEvent.newCenter })
                      }}
                    >
                      <Placemark
                        modules={['geoObject.addon.balloon']}
                        defaultGeometry={[project?.place?.latitude, project?.place?.longitude]}
                        options={{
                          preset: 'islands#icon',
                          iconColor: COLOR,
                        }}
                      />
                    </Map>
                  </YMaps>
                </div>
              )}
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
    </>
  )
}

export default withDialog(ProjectDialog)
