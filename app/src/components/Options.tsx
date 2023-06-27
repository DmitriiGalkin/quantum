import React, {useEffect, useState} from 'react';
import {User, useUpdateUser, useUser} from "../modules/user";
import {Stack, Theme} from "@mui/material";
import Back from "./Back";
import {makeStyles} from "@mui/styles";
import Input from "./fields/Input";
import ImageField from "./fields/ImageField";
import Button from "./Button";

export interface OptionsDialogProps {
    onClose: () => void
}

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: 'white',
        padding: '25px 33px'
    },
    image: {
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },
}));

export default function OptionsDialog({ onClose }: OptionsDialogProps) {
    const { data: profileUser } = useUser();
    const classes = useStyles();

    const [user, setUser] = useState<User>()
    const updateUser = useUpdateUser()

    const onClickSave = () => {
        user && updateUser.mutate(user)
        onClose()
    }
    useEffect(() => {
        profileUser && setUser(profileUser)
    }, [profileUser])

    return (
        <>
            <Back title="Настройки" onClick={onClose}/>
            <img src={user?.image} className={classes.image}/>
            <div className={classes.container}>
                <Stack spacing={2}>
                    <ImageField
                        label="Аватарка"
                        onChange={(image) => user && setUser({...user, image})}
                    />
                    <Input
                        name='email'
                        label="Телефон/Почта"
                        value={user?.email}
                        onChange={(e) => user && setUser({ ...user, email: e.target.value})}
                    />
                    <Input
                        name='password'
                        label="Пароль"
                        value={user?.password}
                        onChange={(e) => user && setUser({ ...user, password: e.target.value})}
                    />
                    <Input
                        name='title'
                        label="Имя и фамилия"
                        value={user?.title}
                        onChange={(e) => user && setUser({ ...user, title: e.target.value})}
                    />
                    <Button onClick={onClickSave} variant="outlined">
                        Сохранить
                    </Button>
                </Stack>
            </div>
        </>
    );
}