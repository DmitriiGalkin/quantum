import { Stack } from '@mui/material'
import React, { useState } from 'react'

import { IdeaCard } from '../cards/IdeaCard'
import { DialogFooter, DialogHeader } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { PlaceSelect2 } from '../components/PlaceSelect2'
import ProjectForm from '../components/ProjectForm'
import Typography from '../components/Typography'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { Idea, Invite, Place, Project } from '../tools/dto'
import { useIdeas } from '../tools/service'

interface FastProjectData {
  project: Partial<Project>
  place: Partial<Place>
  invites?: Partial<Invite>[]
}

export const FAST_PROJECT = 'fastProject'

export interface FastProjectProps {
  onClose: () => void
}

function FastProject({ onClose }: FastProjectProps) {
  const { openLogin } = useAuth()
  const [data, setData] = useState<FastProjectData>({ project: {}, place: {}, invites: [] })

  const { data: ideas = [], refetch } = useIdeas({
    ageFrom: data.project.ageFrom,
    ageTo: data.project.ageTo,
    latitude: data.place.latitude,
    longitude: data.place.longitude,
  })

  const onSubmit = () => {
    localStorage.setItem(FAST_PROJECT, JSON.stringify(data))
    openLogin()
  }
  const t = (invites: Partial<Invite>[] | undefined, invite: Partial<Invite>): Partial<Invite>[] => {
    if (invites?.map((i) => i.ideaId).includes(invite.ideaId)) {
      return invites?.filter((i) => i.id !== invite.id) || []
    }
    return [...(data.invites || []), invite]
  }

  return (
    <>
      <DialogHeader title="Быстрый проект" onClick={onClose} />
      <DialogContent>
        <Block variant="primary">
          <ProjectForm project={data.project} onChange={(project) => setData({ ...data, project })} />
          <PlaceSelect2 onChange={(place: Place) => setData({ ...data, place })} place={data.place} />
        </Block>
        <Block variant="secondary">
          {Boolean(ideas.length) && (
            <Stack spacing={2}>
              <Typography variant="Header2">Рекомендуем пригласить участников</Typography>
              <Stack spacing={1}>
                {ideas?.map((idea) => {
                  const invited = data.invites?.map((i) => i.ideaId).includes(idea.id)
                  const onAdd = (idea: Idea) =>
                    setData({
                      ...data,
                      invites: t(data.invites, {
                        ideaId: idea.id,
                        userId: idea.userId,
                      }),
                    })
                  return <IdeaCard invited={invited} key={idea.id} idea={idea} refetch={refetch} onAdd={onAdd} />
                })}
              </Stack>
            </Stack>
          )}
        </Block>
      </DialogContent>
      {data?.project.title && <DialogFooter onClick={onSubmit} />}
    </>
  )
}
export default withDialog(FastProject)
