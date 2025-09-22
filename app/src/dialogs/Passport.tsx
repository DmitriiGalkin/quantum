import { Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import { UserCard } from '../cards/UserCard'
import { Button, DialogHeader, Input } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { Passport } from '../tools/dto'
import { useUpdatePassport } from '../tools/service'
import EditUser from './EditUser'

export interface UserViewProps {
  onLogout: () => void
  onClose: () => void
}
function PassportDialog({ onLogout, onClose }: UserViewProps): React.ReactNode {
  const updateUser = useUpdatePassport()
  const [createUser, onClickCreateUser] = useToggle()
  const [passport, setPassport] = useState<Passport>()
  const { logout, refetch, passport: defaultPassport } = useAuth()

  useEffect(() => defaultPassport && setPassport(defaultPassport), [defaultPassport])

  const onClickLogout = () => {
    logout()
    onLogout?.()
    onClose?.()
  }
  const onClickSave = () => {
    passport && updateUser.mutate(passport)
    onClose?.()
  }

  if (!passport) return null

  return (
    <>
      <DialogHeader title="Профиль" onClick={onClose} menuItems={[{ title: 'Выйти', onClick: onClickLogout }]} />
      <DialogContent>
        <Block variant="primary">
          <Input
            name="title"
            label="Имя и фамилия"
            value={passport.title}
            onChange={(e) => passport && setPassport({ ...passport, title: e.target.value })}
          />
        </Block>
        <Block variant="secondary">
          <Block title="Дети">
            <Stack spacing={1}>
              {passport.users?.map((user) => (
                <UserCard key={user.id} user={user} refetch={refetch} />
              ))}
              <Button variant="outlined" onClick={onClickCreateUser}>
                Добавить ребенка
              </Button>
            </Stack>
          </Block>
        </Block>
      </DialogContent>
      <div
        style={{
          padding: 15,
          display: JSON.stringify(defaultPassport) === JSON.stringify(passport) ? 'none' : 'block',
        }}
      >
        <Button onClick={onClickSave}>Сохранить</Button>
      </div>
      <EditUser
        open={createUser}
        onClose={() => {
          onClickCreateUser()
          refetch()
        }}
      />
    </>
  )
}
export default withDialog(PassportDialog)
