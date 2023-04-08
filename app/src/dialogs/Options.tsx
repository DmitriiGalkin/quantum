import React, {useEffect, useState} from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {User, useUpdateUser, useUser} from "../modules/user";
import QContainer from "../components/QContainer";
import {Box, Button, Grid, IconButton, Stack, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import Avatar, {
    genConfig,
    Sex,
    EarSize,
    HairStyle,
    HatStyle,
    EyeStyle,
    GlassesStyle,
    NoseStyle, MouthStyle, ShirtStyle
} from "react-nice-avatar";
import {TransitionDialog} from "../components/TransitionDialog";

const AvatarM = {
    sex: ['man', 'woman'],
    earSize: ['small', 'big'],
    hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    hatStyle: ['none', 'beanie', 'turban'],
    eyeStyle: ['circle', 'oval', 'smile'],
    glassesStyle: ['none', 'round', 'square'],
    noseStyle: ['short', 'long', 'round'],
    mouthStyle: ['laugh', 'smile', 'peace'],
    shirtStyle: ['hoody', 'short', 'polo'],
}

const avatarOptions = [
    //{ title: 'Пол', key: 'sex'},
    { title: 'Уши', key: 'earSize'},
    { title: 'Волосы', key: 'hairStyle'},
    //{ title: 'Шапка', key: 'hatStyle'},
    { title: 'Глаза', key: 'eyeStyle'},
    { title: 'Очки', key: 'glassesStyle'},
    { title: 'Нос', key: 'noseStyle'},
    { title: 'Рот', key: 'mouthStyle'},
    { title: 'Одежда', key: 'shirtStyle'},
] as {title: string, key: f}[]
export interface AvatarProps {
    sex?: Sex
    // faceColor?: string
    earSize?: EarSize
    // hairColor?: string
    hairStyle?: HairStyle
    // hatColor?: string
    hatStyle?: HatStyle
    eyeStyle?: EyeStyle
    glassesStyle?: GlassesStyle
    noseStyle?: NoseStyle
    mouthStyle?: MouthStyle
    shirtStyle?: ShirtStyle
    // shirtColor?: string
}
type f = 'sex' | 'earSize' | 'hairStyle' | 'hatStyle' | 'eyeStyle' | 'glassesStyle' | 'noseStyle' | 'mouthStyle' | 'shirtStyle'
export interface OptionsDialogProps {
    openOptions: boolean
    onClose: () => void
}

/**
 * Берет из объекта возможных значений следующее значение для ключа
 */
const next = (key: f, selected: string): any => {
    const keyArray = AvatarM[key]
    const oldIndex = AvatarM[key].findIndex((a) => a === selected)
    return ((keyArray.length === (oldIndex + 1)) ? keyArray[0] : keyArray[oldIndex + 1]) as string
}

export default function OptionsDialog({ openOptions, onClose }: OptionsDialogProps) {
    const { data: serverUser } = useUser()
    const [user, setUser] = useState<User>()
    const [avatar, setAvatar] = useState<AvatarProps>({ ...genConfig(String(user?.id)), hatStyle: 'none' })
    console.log(avatar,'avatar')
    const updateUser = useUpdateUser()

    const onClickAvatar = (key: f) => () => {
        const avatarN = {...user?.avatar, [key]: next(key, avatar[key] || '')} as AvatarProps
        user && setUser({ ...user, avatar: avatarN})
    }
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
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <Avatar style={{ width: '12rem', height: '12rem' }} {...user?.avatar} />
                        </Box>
                        <Grid container spacing={2}>
                            {avatarOptions.map(({ title, key}) => (
                                <Grid key={key} item xs={6}>
                                    <Button onClick={onClickAvatar(key)} variant="outlined" size="small">
                                        {title}
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
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