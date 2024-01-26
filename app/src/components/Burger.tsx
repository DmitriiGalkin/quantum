import React from 'react';
import {Avatar, Stack, SwipeableDrawer} from "@mui/material";
import Passport from "../dialogs/Passport";
import Visits from "../dialogs/Visits";
import {useToggle} from "usehooks-ts";
import {useAuth} from "../tools/auth";
import CreateProject from "../dialogs/CreateProject";
import CreateIdea from "../dialogs/CreateIdea";
import Typography from "./Typography";
import {Icon} from "./Icon";
import {Button} from "./Button";
import Ideas from "../dialogs/Ideas";

export function Burger({refetch}: {refetch:() => void}) {
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
                    <div style={{ color: 'black', height: '100%', width: 280 }}>
                        <Stack justifyContent="space-between" style={{ height: '100%' }}>
                            <Stack spacing={2} style={{ backgroundColor: 'white', padding: 16 }}>
                                <Stack spacing={2} direction="row" style={{ padding: '14px 40px' }}>
                                    <Avatar alt={user.title} src={user.image} sx={{ width: 72, height: 72}} />
                                    <Stack>
                                        <Typography variant="Caption">Ребенок</Typography>
                                        <Typography variant="Header3">{user.title}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack spacing={1}>
                                    {[
                                        {
                                            title: 'Новая идея проекта',
                                            icon: (<Icon name='add'/>),
                                            onClick: toggleIdea,
                                            variant: 'primary'
                                        },
                                        {
                                            title: 'Мои идеи',
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
                            <Stack spacing={1} style={{ padding: 16 }}>
                                <Stack style={{ padding: '14px 40px' }}>
                                    <Typography variant="Caption">Взрослый</Typography>
                                    <Typography variant="Header3">{passportAll.title}</Typography>
                                </Stack>
                                <Button variant="menuButton" icon={<Icon name='add'/>} onClick={toggleProject} color='primary'>Организовать проект</Button>
                                <Button variant="menuButton" icon={<Icon name='project'/>} onClick={togglePassport}>Мои проекты</Button>
                                <Button variant="menuButton" icon={<Icon name='passport'/>} onClick={togglePassport}>Профиль родителя</Button>
                            </Stack>
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