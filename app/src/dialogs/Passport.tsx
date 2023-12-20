import React, {useEffect, useState} from 'react';
import {usePassport, useUpdatePassport} from "../tools/service";
import {Passport} from "../tools/dto";
import {Stack} from "@mui/material";
import {Button, DialogHeader, Icon, Input} from "../components";
import {useAuth} from "../tools/auth";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {UserCard} from "../cards/UserCard";

export interface UserViewProps {
    onLogout: () => void
    onClose: () => void
}
function PassportDialog({ onLogout, onClose }: UserViewProps) {
    const { data: defaultPassport, refetch } = usePassport();
    const { logout } = useAuth();
    const [passport, setPassport] = useState<Passport>()
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
            <DialogContent backgroundColor={'white'}>
                <Stack spacing={5}>
                    <Input
                        name='title'
                        label="Имя и фамилия"
                        value={passport.title}
                        onChange={(e) => passport && setPassport({ ...passport, title: e.target.value})}
                    />
                    <Block title="Дети">
                        <Stack spacing={1}>
                            {passport.users?.map((user) => <UserCard key={user.id} user={user} refetch={refetch} />)}
                        </Stack>
                    </Block>
                    <Button onClick={onClickSave} variant="outlined">
                        Сохранить
                    </Button>
                    <Button onClick={onClickLogout} variant="gray" icon={<Icon name="logout"/>}>Выйти из профиля</Button>
                </Stack>
            </DialogContent>
        </>
    );
}
export default withDialog(PassportDialog)
