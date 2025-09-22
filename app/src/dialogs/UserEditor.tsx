import { Stack } from '@mui/material'
import React from 'react'

import { VisitCard } from '../cards/VisitCard'
import { DialogHeader, ImageField, Input } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import Typography from '../components/Typography'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { User } from '../tools/dto'
import { getVisitGroups } from '../tools/helper'
import { useVisits } from '../tools/service'

export interface UserMeetsProps {
  user?: Partial<User>
  onChange: (user: Partial<User>) => void
  withoutImage?: boolean
}
function UserEditor({ user, onChange, withoutImage }: UserMeetsProps) {
  return (
    <>
      <Stack spacing={1} direction="row">
        <Input
          name="price"
          label="Имя"
          value={user?.title}
          onChange={(e) => onChange({ ...user, title: e.target.value })}
          autoFocus
        />
        <Input
          name="age"
          label="Возраст"
          type="number"
          value={user?.age}
          onChange={(e) => onChange({ ...user, age: Number(e.target.value) })}
        />
      </Stack>
      {!withoutImage && (
        <ImageField
          name="meetImage"
          label="Обложка"
          value={user?.image}
          onChange={(image) => onChange({ ...user, image })}
        />
      )}
    </>
  )
}
export default UserEditor
