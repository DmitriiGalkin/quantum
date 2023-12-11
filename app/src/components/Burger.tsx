import React from 'react';
import {Stack, SwipeableDrawer} from "@mui/material";
import {AppBanner} from "./AppBanner";
import Passport from "../dialogs/Passport";
import Visits from "../dialogs/Visits";
import {useToggle} from "usehooks-ts";
import {makeStyles} from "@mui/styles";
import {useAuth} from "../tools/auth";
import CreateProject from "../dialogs/CreateProject";
import Typography from "./Typography";
import {MenuButton} from "./MenuButton";
import {Icon} from "./Icon";

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
}));

export function Burger() {
    const classes = useStyles();

    const { user } = useAuth();

    const [passport, togglePassport] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [visits, toggleVisits] = useToggle()
    const [project, toggleProject] = useToggle()

    if (!user) return null

    return (
        <div>
            <div style={{ display: 'flex', zIndex: 1200 }}>
                <Icon onClick={toggleMenu} name="burger"/>
            </div>
            <SwipeableDrawer
                anchor="left"
                open={menu}
                onClose={toggleMenu}
                onOpen={toggleMenu}
            >
                <div style={{ padding: 15, color: 'black', height: '100%', width: 300 }}>
                    <Stack direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                        <Stack spacing={2} direction="column">
                            <Stack spacing={3} direction="column">
                                <Stack spacing={2} direction="row" style={{ padding: 14 }}>
                                    <div style={{ width: 72 }}>
                                        <div className={classes.blockImage}>
                                            <img alt={user.title} src={user.image} className={classes.image}/>
                                        </div>
                                    </div>
                                    <div>
                                        <Typography variant="Caption">Ребенок</Typography>
                                        <div style={{ fontSize: 19, fontWeight: 600, lineHeight: '30px', letterSpacing: '0.193px' }}>{user.title}</div>
                                    </div>
                                </Stack>
                            </Stack>
                            <Stack spacing={1}>
                                {[
                                    {
                                        title: 'Новая заявка',
                                        icon: (<Icon name='request'/>),
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
                            <AppBanner title="Установите приложение, пожалуйста"/>
                        </Stack>
                    </Stack>
                </div>
            </SwipeableDrawer>
            <Passport open={passport} onClose={togglePassport} onLogout={toggleMenu} />
            <Visits open={visits} onClose={toggleVisits} />
            <CreateProject open={project} onClose={toggleProject} />
        </div>
    )
}