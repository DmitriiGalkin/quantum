import { useEffect } from 'react'

import { FAST_IDEA } from '../dialogs/FastIdea'
import { FAST_PROJECT } from '../dialogs/FastProject'
import { useAuth } from './auth'
import { Invite } from './dto'
import { useAddIdea, useAddPlace, useAddProject, useAddUser, useCreateInvite } from './service'

export const useFast = (refetch: () => void): void => {
  const { isAuth } = useAuth()

  const fastIdeaJSON = localStorage.getItem(FAST_IDEA)
  const addUser = useAddUser()
  const addIdea = useAddIdea()
  useEffect(() => {
    if (isAuth && fastIdeaJSON) {
      const fastIdea = JSON.parse(fastIdeaJSON)
      addUser.mutateAsync(fastIdea.user).then((userId) => {
        addIdea.mutateAsync({ ...fastIdea.idea, userId }).then(() => {
          localStorage.removeItem(FAST_IDEA)
          refetch()
        })
      })
    }
  }, [isAuth, fastIdeaJSON, addUser, addIdea, refetch])

  const fastProjectJSON = localStorage.getItem(FAST_PROJECT)
  const addPlace = useAddPlace()
  const addProject = useAddProject()
  const addInvite = useCreateInvite()
  useEffect(() => {
    if (isAuth && fastProjectJSON) {
      const fastProject = JSON.parse(fastProjectJSON)
      addPlace.mutateAsync(fastProject.place).then((placeId) => {
        addProject.mutateAsync({ ...fastProject.project, placeId }).then((projectId) => {
          fastProject.invites?.forEach((i: Partial<Invite>) => {
            addInvite.mutate({ ideaId: i.ideaId as number, projectId: projectId as number, userId: i.userId as number })
          })
          localStorage.removeItem(FAST_PROJECT)
          refetch()
        })
      })
    }
  }, [isAuth, fastProjectJSON, addPlace, addProject, refetch, addInvite])
}
