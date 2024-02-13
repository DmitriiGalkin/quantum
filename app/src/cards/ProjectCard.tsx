import { Chip, Stack } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'
import { useToggle } from 'usehooks-ts'

import { Card } from '../components'
import { Parameter } from '../components/Parameter'
import Typography from '../components/Typography'
import ProjectDialog from '../dialogs/Project'
import { Project } from '../tools/dto'
import { getAgeLabel } from '../tools/helper'
import { COLOR_DEFAULT } from '../tools/theme'

interface ProjectCardProps {
  project: Project
  // selected?: boolean
  onClick?: (project: Project) => void
  refetchParent?: () => void // функция которую необходимо дернуть в случае изменений/удаления
  variant?: 'recommendation' | 'admin'
}
const useStyles = makeStyles(() => ({
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 9.5,
    display: 'block',
    backgroundSize: 'cover',
    backgroundPosition: 'top',
  },
  s: {
    width: '100%',
    height: 0,
    padding: '0 0 80%',
    position: 'relative',
  },
}))
export function ProjectCard({
  project,
  onClick,
  refetchParent,
  variant = 'recommendation',
}: ProjectCardProps): JSX.Element {
  const classes = useStyles()
  const [open, toggleOpen] = useToggle()

  if (variant === 'admin') {
    return (
      <>
        <Card onClick={onClick ? () => onClick?.(project) : toggleOpen}>
          <Stack direction="row">
            <div>
              <div
                style={{
                  borderRadius: '8px 0 0 8px',
                  height: '100%',
                  display: 'flex',
                  width: 60,
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div style={{ flexGrow: 1, padding: 12 }}>
              <Stack spacing={1}>
                {project && <Typography variant="Header2">{project?.title}</Typography>}
                <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="flex-start">
                  {project?.place && <Parameter variant="primary" name="place2" title={project?.place.title} />}
                  {Boolean(project?.participations.length) && (
                    <Parameter variant="primary" name="participationSmall" title={project?.participations.length} />
                  )}
                </Stack>
              </Stack>
            </div>
          </Stack>
        </Card>
        <ProjectDialog
          projectId={project.id}
          open={open}
          onClose={() => {
            toggleOpen()
            refetchParent?.()
          }}
        />
      </>
    )
  }

  return (
    <>
      <div onClick={onClick ? () => onClick?.(project) : toggleOpen}>
        <Stack spacing={1} style={{ opacity: project.deleted ? 0.5 : 1 }}>
          <div style={{ minWidth: 150, position: 'relative' }}>
            {project.image && (
              <>
                <Chip
                  label={getAgeLabel(project)}
                  size="small"
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    color: COLOR_DEFAULT,
                    zIndex: 1,
                  }}
                />
                <div className={classes.s}>
                  <div style={{ backgroundImage: `url(${project.image})` }} className={classes.image} />
                </div>
              </>
            )}
            <div style={{ padding: 4 }}>
              <Typography variant="Body-Bold">{project.title}</Typography>
            </div>
          </div>
        </Stack>
      </div>
      <ProjectDialog
        projectId={project.id}
        open={open}
        onClose={() => {
          toggleOpen()
          refetchParent?.()
        }}
      />
    </>
  )
}
