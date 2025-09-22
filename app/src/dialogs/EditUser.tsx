import { Dialog, DialogActions, Stack } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useToggle } from 'usehooks-ts'

import { Button, DialogFooter, DialogHeader, ImageField, Input } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { User } from '../tools/dto'
import { useAddUser, useDeleteUser, useEditUser, useUser } from '../tools/service'
import UserEditor from "./UserEditor";

function EditUser() {
  const navigate = useNavigate()
  const { id: userId } = useParams()

  const addUser = useAddUser()
  const editUser = useEditUser(userId)
  const deleteUser = useDeleteUser()
  const [openDelete, toggleOpenDelete] = useToggle()
  const [user, setUser] = useState<Partial<User>>()
  const { data: defaultUser, isFetching } = useUser(userId)
  const showSave = user && !isFetching && JSON.stringify(defaultUser) !== JSON.stringify(user)

  useEffect(() => defaultUser && setUser(defaultUser), [defaultUser])

  const onClose = () => navigate(-1)
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

  return (
    <>
      <DialogHeader
        title="Ребенок"
        onClick={onClose}
        menuItems={user?.id ? [{ title: 'Удалить', onClick: onDelete }] : undefined}
      />
      <DialogContent>
        <Block variant="primary">
          <UserEditor user={user} onChange={setUser} />
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
