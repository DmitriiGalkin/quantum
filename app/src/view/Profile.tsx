import React, {useEffect, useState} from 'react';
import {useUpdateUser, useUser} from "../tools/service";
import {User} from "../tools/dto";
import {Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Button, DialogHeader, ImageField, Input} from "../components";
import {useAuth} from "../tools/auth";

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        top: -33,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `28px 28px 0 0`,
        padding: '24px 26px'
    },
    blockInner: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

export interface UserViewProps {
    onClose: () => void
}
export default function Profile({ onClose }: UserViewProps) {
    const classes = useStyles();

    const { data: defaultUser } = useUser();
    const { logout } = useAuth();
    const [user, setUser] = useState<User>()
    const updateUser = useUpdateUser()

    const onClickSave = () => {
        user && updateUser.mutate(user)
        onClose && onClose()
    }
    useEffect(() => defaultUser && setUser(defaultUser), [defaultUser])

    return (
        <>
            <DialogHeader title="Профиль" onClick={onClose}/>
            <div className={classes.blockInner}>
                <img alt={user?.title} src={user?.image} className={classes.image}/>
            </div>
            <div style={{ position: 'relative'}}>
                <div className={classes.container}>
                    <Stack spacing={2}>
                        <Input
                            name='title'
                            label="Имя и фамилия"
                            value={user?.title}
                            onChange={(e) => user && setUser({ ...user, title: e.target.value})}
                        />
                        <ImageField
                            label="Аватарка"
                            onChange={(image) => user && setUser({...user, image})}
                        />
                        <Button onClick={onClickSave} variant="outlined">
                            Сохранить
                        </Button>
                        <Button onClick={() => {
                            logout()
                            onClose()
                        }} variant="outlined">
                            Выйти из профиля
                        </Button>
                    </Stack>
                </div>
            </div>
        </>
    );
}