import { useEffect } from 'react'

import { FAST_IDEA } from '../dialogs/EditIdea'
import { FAST_PROJECT } from '../dialogs/FastProject'
import { useAuth } from './auth'
import { Invite } from './dto'
import { useAddIdea, useAddPlace, useAddProject, useAddUser, useCreateInvite } from './service'
import {useNavigate} from "react-router-dom";

export const useFast = (isAuth: boolean): void => {
  const navigate = useNavigate()

  const fastIdeaJSON = localStorage.getItem(FAST_IDEA)
  const addUser = useAddUser()
  const addIdea = useAddIdea()
  useEffect(() => {
    if (isAuth && fastIdeaJSON) {
      const fastIdea = JSON.parse(fastIdeaJSON)
      localStorage.removeItem(FAST_IDEA)

      addUser.mutateAsync(fastIdea.user).then((userId) => {
        addIdea.mutateAsync({ ...fastIdea.idea, userId }).then(() => {
          navigate('/ideas')
        })
      })
    }
  }, [isAuth, fastIdeaJSON, addUser, addIdea])

  const fastProjectJSON = localStorage.getItem(FAST_PROJECT)
  const addPlace = useAddPlace()
  const addProject = useAddProject()
  const addInvite = useCreateInvite()
  useEffect(() => {
    if (isAuth && fastProjectJSON) {
      const fastProject = JSON.parse(fastProjectJSON)
      localStorage.removeItem(FAST_PROJECT)

      console.log(fastProject,'fastProject')
      if (fastProject.project.place.id) {
        addProject.mutateAsync({ ...fastProject.project, placeId: fastProject.project.place.id }).then((projectId) => {
          fastProject.invites?.forEach((i: Partial<Invite>) => {
            addInvite.mutate({ ideaId: i.ideaId as number, projectId: projectId as number, userId: i.userId as number })
          })
          navigate('/projects/self')
        })
      } else {
        addPlace.mutateAsync(fastProject.place).then((placeId) => {
          addProject.mutateAsync({ ...fastProject.project, placeId }).then((projectId) => {
            fastProject.invites?.forEach((i: Partial<Invite>) => {
              addInvite.mutate({ ideaId: i.ideaId as number, projectId: projectId as number, userId: i.userId as number })
            })
            navigate('/projects/self')
          })
        })
      }
    }
  }, [isAuth, fastProjectJSON, addPlace, addProject, addInvite])
}
