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
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.22559 4.72461H19.7744C19.7129 3.93359 19.2471 3.51172 18.3945 3.51172H9.60547C8.75293 3.51172 8.28711 3.93359 8.22559 4.72461ZM6.50293 7.28223H21.5059C21.3828 6.44727 20.9521 5.96387 20.0117 5.96387H7.98828C7.04785 5.96387 6.62598 6.44727 6.50293 7.28223ZM7.36426 23.832H20.6182C22.5166 23.832 23.5186 22.8477 23.5186 20.9668V11.5977C23.5186 9.7168 22.5166 8.73242 20.6182 8.73242H7.36426C5.45703 8.73242 4.47266 9.70801 4.47266 11.5977V20.9668C4.47266 22.8477 5.45703 23.832 7.36426 23.832ZM7.47852 22.0742C6.66992 22.0742 6.22168 21.6611 6.22168 20.8086V11.7559C6.22168 10.9033 6.66992 10.4814 7.47852 10.4814H20.5039C21.3125 10.4814 21.7607 10.9033 21.7607 11.7559V20.8086C21.7607 21.6611 21.3125 22.0742 20.5039 22.0742H19.168C18.4297 20.2549 16.4082 19.0068 13.9912 19.0068C11.583 19.0068 9.56152 20.2549 8.82324 22.0742H7.47852ZM13.9912 17.7148C15.5293 17.7324 16.7334 16.4229 16.7334 14.7266C16.7334 13.1182 15.5293 11.791 13.9912 11.791C12.4619 11.791 11.249 13.1182 11.2578 14.7266C11.2666 16.4229 12.4531 17.6973 13.9912 17.7148Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    {sub && (
                        <div style={{ backgroundColor: '#FFB628', width: 54, padding: '24px 8px', height: '100%' }}>
                            <Stack flexDirection="column" alignItems="center" spacing={2}>
                                {passportAll && passportAll?.users.map((user) => (
                                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ width: 32, height: 32 }} onClick={()=>setSelectedUserId(user.id)}/>
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