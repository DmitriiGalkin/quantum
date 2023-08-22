import React, {useEffect, useState} from 'react';
import {useUpdateUser, useUser} from "../tools/service";
import {User} from "../tools/dto";
import {Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Button, DialogHeader, ImageField, Input, TransitionDialog} from "../components";
import {useAuth} from "../tools/auth";
import Dialog from "@mui/material/Dialog";
import {DialogContent} from "../components/DialogContent";

const useStyles = makeStyles(() => ({
    container: {
        width: '100%',
        padding: '24px 26px'
    },
}));

export interface UserViewProps {
    open: boolean
    onLogout: () => void
    onClose: () => void
}
export default function Profile({ open, onLogout, onClose }: UserViewProps) {
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
        <Dialog onClose={onClose} open={open} fullScreen TransitionComponent={TransitionDialog}>
            <DialogHeader title="Профиль" onClick={onClose}/>
            <DialogContent>
                <div className={classes.container}>
                    <Stack spacing={5}>
                        <Input
                            name='title'
                            label="Имя и фамилия"
                            value={user?.title}
                            onChange={(e) => user && setUser({ ...user, title: e.target.value})}
                        />
                        <ImageField
                            label="Аватарка"
                            value={user?.image}
                            onChange={(image) => user && setUser({...user, image})}
                        />
                        <Button onClick={onClickSave} variant="outlined">
                            Сохранить
                        </Button>
                        <Stack spacing={2} direction="row" onClick={() => {
                            logout()
                            onLogout()
                            onClose()
                        }}  alignItems="center" justifyContent="center">
                            <div>
                                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.4" d="M2.5377 18H11.2314C12.9259 18 13.7691 17.1269 13.7691 15.3722V11.4767H12.4511V15.347C12.4511 16.1866 12.0172 16.6483 11.1659 16.6483H2.60319C1.75183 16.6483 1.31797 16.1866 1.31797 15.347V2.66138C1.31797 1.82183 1.75183 1.35168 2.60319 1.35168H11.1659C12.0172 1.35168 12.4511 1.82183 12.4511 2.66138V6.52332H13.7691V2.63619C13.7691 0.889925 12.9259 0 11.2314 0H2.5377C0.843171 0 0 0.889925 0 2.63619V15.3722C0 17.1269 0.843171 18 2.5377 18ZM7.57217 9.66325H15.9793L17.2072 9.61287L16.626 10.1838L15.3081 11.4515C15.1771 11.569 15.1116 11.7453 15.1116 11.9049C15.1116 12.2575 15.349 12.5177 15.6846 12.5177C15.8565 12.5177 15.9875 12.4506 16.1185 12.3246L18.7872 9.48694C18.9509 9.31903 19 9.16791 19 9C19 8.82369 18.9509 8.68097 18.7872 8.51306L16.1185 5.67537C15.9875 5.54944 15.8565 5.47388 15.6846 5.47388C15.349 5.47388 15.1116 5.72575 15.1116 6.07836C15.1116 6.24627 15.1771 6.42257 15.3081 6.54011L16.626 7.81623L17.2072 8.38713L15.9793 8.32836H7.57217C7.22835 8.32836 6.94184 8.63899 6.94184 9C6.94184 9.36101 7.22835 9.66325 7.57217 9.66325Z" fill="black"/>
                                </svg>
                            </div>
                            <div style={{ color: 'black',
                                textAlign: 'center',
                                fontSize: 15,
                                fontWeight: 500,
                                lineHeight: '23.7px',
                                letterSpacing: '0.15px', opacity: .4}}>
                                Выйти из профиля
                            </div>
                        </Stack>
                    </Stack>
                </div>
            </DialogContent>
        </Dialog>
    );
}