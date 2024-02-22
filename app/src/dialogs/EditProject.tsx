import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { ParticipationCard } from '../cards/ParticipationCard'
import { Button, DialogHeader } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { PlaceSelect2 } from '../components/PlaceSelect2'
import ProjectForm from '../components/ProjectForm'
import { withDialog } from '../components/helper'
import { Place, Project } from '../tools/dto'
import { useAddPlace, useAddProject, useDeleteProject, useEditProject, useProject } from '../tools/service'
import {useNavigate, useParams} from "react-router-dom";

function EditProject() {
  let { id: projectId } = useParams()
  const navigate = useNavigate()

  const onClose = () => navigate(-1)
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
          editProject.mutateAsync({ ...project, placeId: placeId as number }).then(onClose)
        } else {
          addProject.mutateAsync({ ...project, placeId: placeId as number }).then(onClose)
        }
      })
    } else if (project.id) {
      editProject.mutateAsync(project).then(onClose)
    } else {
      addProject.mutateAsync(project).then(onClose)
    }
  }
  const onDelete = () => deleteProject.mutateAsync(project.id).then(onClose)

  return (
    <>
      <DialogHeader
        title={project.id ? 'Редактировать проект' : 'Новый проект'}
        onClick={onClose}
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
      <div
        style={{ padding: 15, display: JSON.stringify(defaultProject) === JSON.stringify(project) ? 'none' : 'block' }}
      >
        <Button disabled={!project.title || !(project.placeId || project.place)} onClick={onClickSave}>
          {project.id ? 'Сохранить' : 'Создать'}
        </Button>
      </div>
    </>
  )
}
export default withDialog(EditProject)
