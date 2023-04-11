import React, {useEffect, useState} from 'react';
import {User, useUpdateUser, useUser} from "../modules/user";
import QContainer from "../components/QContainer";
import {Box, Button, ClickAwayListener, Grid, Stack, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {HexColorPicker} from "react-colorful";
import Tooltip from '@mui/material/Tooltip';

import Avatar, {
    EarSize,
    EyeStyle,
    genConfig,
    GlassesStyle,
    HairStyle,
    HatStyle,
    MouthStyle,
    NoseStyle,
    Sex,
    ShirtStyle
} from "react-nice-avatar";
import {TransitionDialog} from "../components/TransitionDialog";
import Back from "../components/Back";
import { getSignedUrl } from "../tools/s3";

const AvatarM = {
    sex: ['man', 'woman'],
    faceColor: ['#ffd5bb', '#feb78c'],
    earSize: ['small', 'big'],
    hairStyle: ['normal', 'thick', 'mohawk', 'womanLong', 'womanShort'],
    hatStyle: ['none', 'beanie', 'turban'],
    eyeStyle: ['circle', 'oval', 'smile'],
    glassesStyle: ['none', 'round', 'square'],
    noseStyle: ['short', 'long', 'round'],
    mouthStyle: ['laugh', 'smile', 'peace'],
    shirtStyle: ['hoody', 'short', 'polo'],
    hairColor: [],
    shirtColor: [],
}

const avatarOptions = [
    //{ title: 'Пол', key: 'sex', },
    { title: 'Уши', key: 'earSize'},
    { title: 'Волосы', key: 'hairStyle'},
    { title: 'Цвет лица', key: 'faceColor'},
    { title: 'Цвет волос', key: 'hairColor', type: 'color'},
    //{ title: 'Шапка', key: 'hatStyle'},
    { title: 'Глаза', key: 'eyeStyle'},
    { title: 'Очки', key: 'glassesStyle'},
    { title: 'Нос', key: 'noseStyle'},
    { title: 'Рот', key: 'mouthStyle'},
    { title: 'Одежда', key: 'shirtStyle'},
    { title: 'Цвет одежды', key: 'shirtColor', type: 'color'},
] as {title: string, key: f, type?: string}[]
export interface AvatarProps {
    sex?: Sex
    faceColor?: string
    earSize?: EarSize
    hairColor?: string
    hairStyle?: HairStyle
    // hatColor?: string
    hatStyle?: HatStyle
    eyeStyle?: EyeStyle
    glassesStyle?: GlassesStyle
    noseStyle?: NoseStyle
    mouthStyle?: MouthStyle
    shirtStyle?: ShirtStyle
    shirtColor?: string
}
type f = 'sex' | 'earSize' | 'hairStyle' | 'hatStyle' | 'eyeStyle' | 'glassesStyle' | 'noseStyle' | 'mouthStyle' | 'shirtStyle' | 'faceColor' | 'hairColor' | 'shirtColor'
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
    const updateUser = useUpdateUser()

    const onClickAvatar = (key: f) => (s?: string) => {
        const avatar = !user?.avatar ? genConfig(String(user?.id)) : user.avatar
        const avatarN = {...avatar, [key]: s ? s : next(key, avatar[key] || '')} as AvatarProps
        user && setUser({ ...user, avatar: avatarN})
    }

    const onClickSave = () => {
        user && updateUser.mutate(user)
        onClose()
    }
    useEffect(() => {
        serverUser && setUser(serverUser)
    }, [serverUser])


    const [open, setOpen] = React.useState<f | undefined>(undefined);

    const handleTooltipClose = (key: f) => {
        (open === key) && setOpen(undefined);
    };

    const handleTooltipOpen = (key: f) => {
        setOpen(key);
    };

    const f = () => {
        const l = getSignedUrl()
        l.then((r)=>console.log(r,'r'))
        console.log(l,'l');
    }
    return (
        <Dialog onClose={onClose} open={openOptions} fullScreen TransitionComponent={TransitionDialog}>
            <Back title="Настройки" onClick={onClose}/>
            <div onClick={f}>Загрузка</div>
            <QContainer>
                <Stack spacing={2}>
                    <Stack direction="row" spacing={2}>
                        <Box>
                            <Avatar style={{ width: '10rem', height: '10rem' }} {...user?.avatar} />
                        </Box>
                        <Grid container spacing={2}>
                            {avatarOptions.map(({ title, key, type}) => {
                                if (type === 'color') {
                                    return (
                                        <Grid key={key} item xs={6}>
                                            <ClickAwayListener  onClickAway={() => handleTooltipClose(key)}>
                                                <div>
                                                    <Tooltip
                                                        PopperProps={{
                                                            disablePortal: true,
                                                        }}
                                                        onClose={() => handleTooltipClose(key)}
                                                        open={open === key}
                                                        disableFocusListener
                                                        disableHoverListener
                                                        disableTouchListener
                                                        title={
                                                            <HexColorPicker color={user?.avatar?.[key]} onChange={onClickAvatar(key)} />
                                                        }
                                                    >
                                                        <Button style={{fontSize: 10}} onClick={() => handleTooltipOpen(key)} variant="outlined" size="small">
                                                            {title}
                                                        </Button>
                                                    </Tooltip>
                                                </div>
                                            </ClickAwayListener>
                                        </Grid>
                                    )
                                }

                                return (
                                    <Grid key={key} item xs={6}>
                                        <Button style={{fontSize: 10}} onClick={() => onClickAvatar(key)()} variant="outlined" size="small">
                                            {title}
                                        </Button>
                                    </Grid>
                                )
                            })}

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