import React from 'react';
import {Avatar, AvatarGroup, Stack, SwipeableDrawer} from "@mui/material";
import Passport from "../dialogs/Passport";
import Visits from "../dialogs/Visits";
import {useToggle} from "usehooks-ts";
import {makeStyles} from "@mui/styles";
import {useAuth} from "../tools/auth";
import CreateProject from "../dialogs/CreateProject";
import Typography from "./Typography";
import {MenuButton} from "./MenuButton";
import {Icon} from "./Icon";
import SwipeableViews from "react-swipeable-views";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    blockImage: {
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
        borderRadius: 100
    },
    ani: {
        animationDuration: '3s',
        animationName: 'slidein'
    }
}));

export function Burger() {
    const classes = useStyles();

    const { user, passport: passportAll, setSelectedUserId } = useAuth();

    const [passport, togglePassport] = useToggle()
    const [menu2, toggleMenu2] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [visits, toggleVisits] = useToggle()
    const [project, toggleProject] = useToggle()
    const [sub, toggleSub] = useToggle()

    if (!user) return null

    return (
        <div>
            <Icon name="burger" onClick={toggleMenu}/>
            <SwipeableDrawer
                anchor="left"
                open={menu}
                onClose={toggleMenu}
                onOpen={toggleMenu}
            >
                <Stack direction="row" style={{ height: '100%' }}>
                    <div style={{ position: 'absolute', top: 16, left: sub ? 54 : 0 }}>
                        <div onClick={toggleSub} style={{ backgroundColor: '#FFB628', padding: 4, borderRadius: '0 8px 8px 0', display: 'inline-flex'}}>
                            <Icon name="users"/>
                        </div>
                    </div>
                    {sub && (
                        <div style={{ backgroundColor: '#FFB628', width: 54, padding: '24px 8px', height: '100%' }}>
                            <Stack flexDirection="column" alignItems="center" spacing={2}>
                                {passportAll && passportAll?.users.map((user) => (
                                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ width: 32, height: 32, border: '2px solid white' }} onClick={()=>setSelectedUserId(user.id)}/>
                                ))}
                            </Stack>
                        </div>
                    )}
                    <div style={{ padding: 15, color: 'black', height: '100%', width: 280 }}>
                        <Stack direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                        <Stack spacing={2} direction="column">
                            <Stack spacing={3} direction="column">
                                <Stack spacing={2} direction="row" style={{ padding: '14px 40px' }}>
                                    <div style={{ width: 72 }}>
                                        <div className={classes.blockImage}>
                                            <img alt={user.title} src={user.image} className={classes.image}/>
                                        </div>
                                    </div>
                                    <Stack spacing={1} direction="column">
                                        <Typography variant="Caption">Ребенок</Typography>
                                        <Typography variant="Header3">{user.title}</Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                            <Stack spacing={1}>
                                {[
                                    {
                                        title: 'Новая заявка',
                                        icon: (<Icon name='add'/>),
                                        onClick: toggleProject,
                                        variant: 'primary' as const
                                    },
                                    {
                                        title: 'Посещения',
                                        icon: <Icon name='visits'/>,
                                        onClick: toggleVisits
                                    },
                                ].map((item, index) => (
                                    <MenuButton key={index} {...item}/>
                                ))}
                            </Stack>
                        </Stack>
                        <Stack>
                            <MenuButton icon={<Icon name='passport'/>}
                                        title="Паспорт родителя"
                                        onClick={togglePassport}
                            />
                        </Stack>
                    </Stack>
                    </div>
                </Stack>
            </SwipeableDrawer>
            <Passport open={passport} onClose={togglePassport} onLogout={toggleMenu} />
            <Visits open={visits} onClose={toggleVisits} />
            <CreateProject open={project} onClose={toggleProject} />
        </div>
    )
}