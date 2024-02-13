import { Stack } from '@mui/material'
import React, { useState } from 'react'

import { DialogFooter, DialogHeader, Input, Textarea } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { Idea, User } from '../tools/dto'

interface FastIdeaData {
  idea: Partial<Idea>
  user: Partial<User>
}

export const FAST_IDEA = 'fastIdea'

export interface FastIdeaProps {
  onClose: () => void
}
function FastIdea({ onClose }: FastIdeaProps) {
  const { isAuth } = useAuth()

  const { openLogin } = useAuth()
  const [data, setData] = useState<FastIdeaData>({ idea: {}, user: {} })
  const onSubmit = () => {
    localStorage.setItem(FAST_IDEA, JSON.stringify(data))
    !isAuth && openLogin()
  }

  return (
    <>
      <DialogHeader title="Быстрая идея" onClick={onClose} />
      <DialogContent>
        <Block variant="primary">
          <Input
            name="title"
            label="Название"
            value={data?.idea.title || ''}
            onChange={(e) => setData({ ...data, idea: { ...data.idea, title: e.target.value } })}
            autoFocus
          />
          <Textarea
            name="description"
            label="Описание"
            value={data?.idea.description || ''}
            onChange={(e) => setData({ ...data, idea: { ...data.idea, description: e.target.value } })}
          />
          <Stack spacing={1} direction="row">
            <Input
              name="price"
              label="Имя"
              value={data?.user?.title || ''}
              onChange={(e) => setData({ ...data, user: { ...data.user, title: e.target.value } })}
            />
            <Input
              name="age"
              label="Возраст"
              type="number"
              value={data?.user?.age || ''}
              onChange={(e) => setData({ ...data, user: { ...data.user, age: Number(e.target.value) } })}
            />
          </Stack>
        </Block>
      </DialogContent>
      {data?.idea.title && data?.user?.title && data?.user?.age && <DialogFooter onClick={onSubmit} />}
    </>
  )
}
export default withDialog(FastIdea)
