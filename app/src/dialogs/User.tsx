import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {
    useAddMeet, useAddUser,
    useDeleteMeet, useDeleteUser,
    useEditMeet, useEditUser,
    useMeet, useUser,
} from "../tools/service";
import {Meet, User} from "../tools/dto";
import {Button, DatePicker, DialogHeader, Icon, ImageField, Input} from "../components";
import {convertToMeetsGroupTime, convertToMeetTime, getIsStart} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {VisitCard} from "../cards/VisitCard";

export interface EditUserProps {
    userId?: number
    onClose: () => void
}
function EditUser({ userId, onClose }: EditUserProps) {
    const [user, setUser] = useState<Partial<User>>({})
    const { data: defaultUser } = useUser(userId)

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
    console.log(user,'user')

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
                        {user.id && <Button onClick={onDelete} variant="gray" icon={<Icon name="delete"/>}>Удалить участника</Button>}
                    </Stack>
                </Block>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultUser) === JSON.stringify(user) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>{user.id ? 'Сохранить' : "Создать"}</Button>
            </div>
        </>
    );
}

export default withDialog(EditUser)

