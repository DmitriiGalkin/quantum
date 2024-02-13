import { Dialog, DialogActions, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useToggle } from 'usehooks-ts'

import { Button, DialogFooter, DialogHeader, ImageField, Input } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { User } from '../tools/dto'
import { useAddUser, useDeleteUser, useEditUser, useUser } from '../tools/service'

export interface EditUserProps {
  userId?: number
  onClose: () => void
}
function EditUser({ userId, onClose }: EditUserProps) {
  const [user, setUser] = useState<Partial<User>>()
  const { data: defaultUser, isFetching } = useUser(userId)
  const [openDelete, toggleOpenDelete] = useToggle()

  const addUser = useAddUser()
  const editUser = useEditUser(userId)
  const deleteUser = useDeleteUser()
  useEffect(() => defaultUser && setUser(defaultUser), [defaultUser])

  // if (!user) return null;
  const onDelete = () => user?.id && deleteUser.mutateAsync(user.id).then(onClose)
  const onClickSave = () => {
    if (user) {
      if (user.id) {
        editUser.mutateAsync(user).then(onClose)
      } else {
        addUser.mutateAsync(user).then(onClose)
      }
    }
  }

  const showSave = user && !isFetching && JSON.stringify(defaultUser) !== JSON.stringify(user)

  return (
    <>
      <DialogHeader
        title="Ребенок"
        onClick={onClose}
        menuItems={user?.id ? [{ title: 'Удалить', onClick: onDelete }] : undefined}
      />
      <DialogContent>
        <Block variant="primary">
          <Stack spacing={1} direction="row">
            <Input
              name="price"
              label="Имя"
              value={user?.title}
              onChange={(e) => setUser({ ...user, title: e.target.value })}
            />
            <Input
              name="age"
              label="Возраст"
              type="number"
              value={user?.age}
              onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
            />
          </Stack>
          <ImageField
            name="meetImage"
            label="Обложка"
            value={user?.image}
            onChange={(image) => setUser({ ...user, image })}
          />
        </Block>
      </DialogContent>
      {showSave && <DialogFooter onClick={onClickSave} />}
      <Dialog open={openDelete} onClose={toggleOpenDelete}>
        <div style={{ padding: 16 }}>Вы уверены?</div>
        <DialogActions>
          <Button onClick={toggleOpenDelete}>Нет</Button>
          <Button onClick={onDelete}>Да</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default withDialog(EditUser)
