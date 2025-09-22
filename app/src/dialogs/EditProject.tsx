import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { ParticipationCard } from '../cards/ParticipationCard'
import { Button, DialogFooter, DialogHeader, Input } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { PlaceSelect2 } from '../components/PlaceSelect2'
import ProjectForm from '../components/ProjectForm'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { Place, Project, User } from '../tools/dto'
import { useAddPlace, useAddProject, useDeleteProject, useEditProject, useProject } from '../tools/service'

const FAST_PROJECT = 'fastProject'

function EditProject() {
  const { id: projectId } = useParams()
  const navigate = useNavigate()
  const { user, isAuth, openLogin } = useAuth()

  const onBack = () => navigate(-1)
  const addPlace = useAddPlace()
  const addProject = useAddProject()
  const editProject = useEditProject(projectId)
  const deleteProject = useDeleteProject()
  const [project, setProject] = useState<Partial<Project>>({ title: '' })
  const { data: defaultProject, refetch } = useProject(projectId)

  useEffect(() => defaultProject && setProject(defaultProject), [defaultProject])

  const onClickSave = () => {
    if (!project.placeId && project?.place) {
      addPlace.mutateAsync(project.place).then((placeId) => {
        if (project.id) {
          editProject.mutateAsync({ ...project, placeId: placeId as number }).then(onBack)
        } else {
          addProject.mutateAsync({ ...project, placeId: placeId as number }).then(() => navigate('/projects/self'))
        }
      })
    } else if (project.id) {
      editProject.mutateAsync(project).then(onBack)
    } else {
      addProject.mutateAsync(project).then(() => navigate('/projects/self'))
    }
  }
  const onDelete = () => deleteProject.mutateAsync(project.id).then(onBack)
  const onSubmit = () => {
    localStorage.setItem(FAST_PROJECT, JSON.stringify({ project }))
    !isAuth && openLogin()
  }

  return (
    <>
      <DialogHeader
        title={project.id ? 'Редактировать проект' : 'Новый проект'}
        onClick={onBack}
        isClose={!project.id}
        menuItems={project.id ? [{ title: 'Удалить', onClick: onDelete }] : undefined}
      />
      <DialogContent>
        <Block variant="primary">
          <ProjectForm project={project} onChange={setProject} autoFocus={!projectId} />
          <PlaceSelect2
            onChange={(place: Place) => setProject({ ...project, place, placeId: place.id })}
            place={project.place}
          />
        </Block>
        {project.id && (
          <Block variant="secondary">
            {Boolean(project.participations?.length) && (
              <Block title="Участники проекта">
                <Stack spacing={1}>
                  {project.participations?.map((participation) => (
                    <ParticipationCard
                      key={participation.id}
                      participation={participation}
                      isOrganizer
                      refetch={refetch}
                    />
                  ))}
                </Stack>
              </Block>
            )}
          </Block>
        )}
      </DialogContent>
      {!user && project.title && (project.placeId || project.place) && <DialogFooter onClick={onSubmit} />}
      {user &&
        project.title &&
        (project.placeId || project.place) &&
        JSON.stringify(defaultProject) !== JSON.stringify(project) && (
          <DialogFooter onClick={onClickSave} title={project.id ? 'Сохранить' : 'Создать'} />
        )}
    </>
  )
}
export default withDialog(EditProject)
