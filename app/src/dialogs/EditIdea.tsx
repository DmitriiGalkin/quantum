import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'

import { InviteCard } from '../cards/InviteCard'
import { Button, DialogHeader, Input, Textarea } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { Idea } from '../tools/dto'
import { useGeolocation } from '../tools/geolocation'
import { useAddIdea, useDeleteIdea, useEditIdea, useIdea } from '../tools/service'

export interface EditIdeaProps {
  ideaId: number
  onClose: () => void
}
function EditIdea({ ideaId, onClose }: EditIdeaProps) {
  const { user, passport } = useAuth()
  const { latitude, longitude } = useGeolocation()
  const addIdea = useAddIdea()
  const editIdea = useEditIdea(ideaId)
  const deleteIdea = useDeleteIdea()
  const [idea, setIdea] = useState<Partial<Idea>>({ title: '', userId: user?.id, passportId: passport?.id })
  const { data: defaultIdea, refetch } = useIdea(ideaId)

  useEffect(() => {
    if (defaultIdea) {
      setIdea(defaultIdea)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
  }, [defaultIdea])

  useEffect(() => {
    if (longitude && latitude && !idea.longitude) {
      setIdea({ ...idea, longitude, latitude })
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return () => {}
    }
  }, [idea, longitude, latitude])

  const onDelete = () => deleteIdea.mutateAsync(idea.id).then(onClose)
  const onClickSave = () => {
    if (idea.id) {
      editIdea.mutateAsync(idea).then(onClose)
    } else {
      addIdea.mutateAsync(idea).then(() => {
        onClose()
      })
    }
  }

  return (
    <>
      <DialogHeader
        title="Идея"
        onClick={onClose}
        menuItems={idea.id ? [{ title: 'Удалить', onClick: onDelete }] : undefined}
        isClose={!idea.id}
      />
      <DialogContent>
        <Block variant="primary">
          <Input
            name="title"
            label="Название"
            value={idea.title}
            onChange={(e) => setIdea({ ...idea, title: e.target.value })}
            autoFocus={!ideaId}
          />
          <Textarea
            name="title"
            label="Описание"
            value={idea.description}
            onChange={(e) => setIdea({ ...idea, description: e.target.value })}
          />
        </Block>
        {idea.id && (
          <Block variant="secondary">
            <Block title="Приглашения в проекты">
              <Stack spacing={1}>
                {idea.invites?.map((invite) => (
                  <InviteCard key={invite.id} invite={invite} refetch={refetch} />
                ))}
              </Stack>
            </Block>
          </Block>
        )}
      </DialogContent>
      <div style={{ padding: 15, display: JSON.stringify(defaultIdea) === JSON.stringify(idea) ? 'none' : 'block' }}>
        <Button onClick={onClickSave}>{idea.id ? 'Сохранить' : 'Создать'}</Button>
      </div>
    </>
  )
}

export default withDialog(EditIdea)
