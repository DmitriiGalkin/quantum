import React, {useEffect, useState} from 'react';
import {usePassport, useUpdatePassport} from "../tools/service";
import {Passport} from "../tools/dto";
import {Stack} from "@mui/material";
import {Button, DialogHeader, Input} from "../components";
import {useAuth} from "../tools/auth";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {UserCard} from "../cards/UserCard";
import EditUser from "./EditUser";
import {useToggle} from "usehooks-ts";

export interface UserViewProps {
    onLogout: () => void
    onClose: () => void
}
function PassportDialog({ onLogout, onClose }: UserViewProps) {
    const { data: defaultPassport, refetch } = usePassport();
    const { logout } = useAuth();
    const [passport, setPassport] = useState<Passport>()
    const [createUser, onClickCreateUser] = useToggle()
    const updateUser = useUpdatePassport()

    const onClickSave = () => {
        passport && updateUser.mutate(passport)
        onClose && onClose()
    }
    useEffect(() => defaultPassport && setPassport(defaultPassport), [defaultPassport])

    const onClickLogout = () => {
        logout()
        onLogout()
        onClose()
    }

    if (!passport) return null

    return (
        <>
            <DialogHeader title="Профиль" onClick={onClose}/>
            <DialogContent>
                <Block variant="primary">
                    <Input
                        name='title'
                        label="Имя и фамилия"
                        value={passport.title}
                        onChange={(e) => passport && setPassport({ ...passport, title: e.target.value})}
                    />
                </Block>
                <Block variant="secondary">
                    <Block title="Дети">
                        <Stack spacing={1}>
                            {passport.users?.map((user) => <UserCard key={user.id} user={user} refetch={refetch} />)}
                            <Button variant="outlined" onClick={onClickCreateUser}>Добавить ребенка</Button>
                        </Stack>
                    </Block>
                </Block>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultPassport) === JSON.stringify(passport) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>Сохранить</Button>
            </div>
            <EditUser open={createUser} onClose={() => { onClickCreateUser(); refetch() }} />
        </>
    );
}
export default withDialog(PassportDialog)
