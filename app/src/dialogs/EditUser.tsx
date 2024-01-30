import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, Stack} from "@mui/material";
import {useAddUser, useDeleteUser, useEditUser, useUser,} from "../tools/service";
import {User} from "../tools/dto";
import {Button, DialogHeader, Icon, ImageField, Input, DialogFooter} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {useToggle} from "usehooks-ts";

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

    if (!user) return null;
    const onDelete =  () => user.id && deleteUser.mutateAsync(user.id).then(onClose)
    const onClickSave = () => {
        if (user.id) {
            editUser.mutateAsync(user).then(onClose)
        } else {
            addUser.mutateAsync(user).then(onClose)
        }
    };

    const showSave = user && !isFetching && JSON.stringify(defaultUser) !== JSON.stringify(user)

    return (
        <>
            <DialogHeader title="Ребенок" onClick={onClose} />
            <DialogContent>
                <Block variant="primary">
                    <Input
                        name='price'
                        label="Имя"
                        value={user.title}
                        onChange={(e) => setUser({ ...user, title: e.target.value })}
                    />
                    <Input
                        name='age'
                        label="Возраст"
                        type="number"
                        value={user.age}
                        onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
                    />
                    <ImageField
                        name="meetImage"
                        label="Обложка"
                        value={user.image}
                        onChange={(image) => setUser({ ...user, image })}
                    />
                </Block>
                <Block variant="secondary">
                    <Stack spacing={3}>
                        {user.id && <Button onClick={toggleOpenDelete} variant="gray" icon={<Icon name="delete"/>}>Удалить участника</Button>}
                    </Stack>
                </Block>
            </DialogContent>
            {showSave && <DialogFooter onClick={onClickSave} />}
            <Dialog
                open={openDelete}
                onClose={toggleOpenDelete}
            >
                <div style={{ padding: 16 }}>Вы уверены?</div>
                <DialogActions>
                    <Button onClick={toggleOpenDelete}>Нет</Button>
                    <Button onClick={onDelete}>
                        Да
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default withDialog(EditUser)

