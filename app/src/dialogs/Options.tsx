import React, {useEffect, useState} from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {User, useUpdateUser, useUser} from "../modules/user";
import QContainer from "../components/QContainer";
import {Button, Stack, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Avatar, {genConfig} from "react-nice-avatar";
import {TransitionDialog} from "../components/TransitionDialog";


export interface OptionsDialogProps {
    openOptions: boolean
    onClose: () => void
}
export default function OptionsDialog({ openOptions, onClose }: OptionsDialogProps) {
    const { data: serverUser } = useUser()
    const [user, setUser] = useState<User>()
    const updateUser = useUpdateUser()

    const onClickSave = () => {
        user && updateUser.mutate(user) // TODO: оставить только редактирование
        onClose()
    }
    useEffect(() => {
        serverUser && setUser(serverUser)
    }, [serverUser])

    return (
        <Dialog onClose={onClose} open={openOptions} fullScreen TransitionComponent={TransitionDialog}>
            <ForwardAppBar title="Настройки" onClick={onClose}/>
            <QContainer>
                <Stack spacing={2}>
                    <Avatar style={{ width: '12rem', height: '12rem' }} {...genConfig(String(user?.id))} />
                    <TextField
                        name='email'
                        label="Телефон/Почта"
                        variant="standard"
                        fullWidth
                        disabled
                        value={user?.email}
                        onChange={(e) => user && setUser({ ...user, email: e.target.value})}
                    />
                    <TextField
                        name='password'
                        label="Пароль"
                        variant="standard"
                        fullWidth
                        value={user?.password}
                        onChange={(e) => user && setUser({ ...user, password: e.target.value})}
                    />
                    <TextField
                        name='title'
                        label="Имя и фамилия"
                        variant="standard"
                        fullWidth
                        value={user?.title}
                        onChange={(e) => user && setUser({ ...user, title: e.target.value})}
                    />
                    <Button
                        onClick={onClickSave}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                    >
                        Сохранить
                    </Button>
                </Stack>
            </QContainer>
        </Dialog>
    );
}