import React from 'react';
import {Avatar, Stack, SwipeableDrawer} from "@mui/material";
import Passport from "../dialogs/Passport";
import Visits from "../dialogs/Visits";
import {useToggle} from "usehooks-ts";
import {makeStyles} from "@mui/styles";
import {useAuth} from "../tools/auth";
import CreateProject from "../dialogs/CreateProject";
import CreateIdea from "../dialogs/CreateIdea";
import Typography from "./Typography";
import {Icon} from "./Icon";
import {Button} from "./Button";
import {useNavigate} from "react-router-dom";
import Ideas from "../dialogs/IdeasView";

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

export function Burger({refetch}: {refetch:() => void}) {
    const classes = useStyles();
    const navigate = useNavigate();

    const { user, passport: passportAll, setSelectedUserId } = useAuth();

    const [passport, togglePassport] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [visits, toggleVisits] = useToggle()
    const [project, toggleProject] = useToggle()
    const [idea, toggleIdea] = useToggle()
    const [ideas, toggleIdeas] = useToggle()
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
                        <div style={{ backgroundColor: '#FFB628', width: 60, padding: '24px 8px', height: '100%' }}>
                            <Stack alignItems="center" spacing={2}>
                                {passportAll && passportAll?.users.map((user) => (
                                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ border: '2px solid white' }} onClick={()=>setSelectedUserId(user.id)}/>
                                ))}
                            </Stack>
                        </div>
                    )}
                    <div style={{ padding: 15, color: 'black', height: '100%', width: 280 }}>
                        <Stack justifyContent="space-between" style={{ height: '100%' }}>
                            <Stack spacing={2}>
                                <Stack spacing={2} direction="row" style={{ padding: '14px 40px' }}>
                                    <div style={{ width: 72 }}>
                                        <div className={classes.blockImage}>
                                            <img alt={user.title} src={user.image} className={classes.image}/>
                                        </div>
                                    </div>
                                    <Stack spacing={1}>
                                        <Typography variant="Caption">Ребенок</Typography>
                                        <Typography variant="Header3">{user.title}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1}>
                                    {[
                                        {
                                            title: 'Новый проект',
                                            icon: (<Icon name='add'/>),
                                            onClick: toggleProject,
                                            variant: 'primary'
                                        },
                                        {
                                            title: 'Новая идея',
                                            icon: (<Icon name='add'/>),
                                            onClick: toggleIdea,
                                            variant: 'primary'
                                        },
                                        {
                                            title: 'Идеи',
                                            icon: (<Icon name='idea'/>),
                                            onClick: toggleIdeas,
                                        },
                                        {
                                            title: 'Посещения',
                                            icon: <Icon name='visits'/>,
                                            onClick: toggleVisits
                                        },
                                    ].map((item, index) => (
                                        <Button variant="menuButton" key={index} icon={item.icon} onClick={item.onClick} color={item.variant}>{item.title}</Button>
                                    ))}
                                </Stack>
                            </Stack>
                            <Button variant="menuButton" icon={<Icon name='passport'/>} onClick={togglePassport}>Профиль родителя</Button>
                        </Stack>
                    </div>
                </Stack>
            </SwipeableDrawer>
            <Passport open={passport} onClose={togglePassport} onLogout={toggleMenu} />
            <Visits open={visits} onClose={toggleVisits} />
            <CreateProject open={project} onClose={() => { toggleProject(); refetch() }} />
            <CreateIdea open={idea} onClose={() => { toggleIdea(); refetch() }} />
            <Ideas open={ideas} onClose={() => { toggleIdeas(); refetch() }} />
        </div>
    )
}