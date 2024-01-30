import React from 'react';
import {Avatar, Stack, SwipeableDrawer} from "@mui/material";
import Passport from "../dialogs/Passport";
import Visits from "../dialogs/Visits";
import {useToggle} from "usehooks-ts";
import {useAuth} from "../tools/auth";
import CreateProject from "../dialogs/EditProject";
import CreateIdea from "../dialogs/EditIdea";
import Typography from "./Typography";
import {Icon} from "./Icon";
import {Button} from "./Button";
import Ideas from "../dialogs/Ideas";
import Projects from "../dialogs/Projects";

export function Burger({refetch}: {refetch:() => void}) {
    const { user, passport: passportAll, setSelectedUserId } = useAuth();

    const [passport, togglePassport] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [visits, toggleVisits] = useToggle()
    const [project, toggleProject] = useToggle()
    const [idea, toggleIdea] = useToggle()
    const [ideas, toggleIdeas] = useToggle()
    const [selfIdeas, toggleSelfIdeas] = useToggle()
    const [projects, toggleProjects] = useToggle()
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
                                    <Stack spacing={1} direction="row" justifyContent="space-between">
                                        <Button variant="menuButton" icon={<Icon name='idea'/>} onClick={toggleSelfIdeas}>Мои идеи</Button>
                                        <Button variant="menuButton" icon={<Icon name='add'/>} onClick={toggleIdea} color='primary'/>
                                    </Stack>
                                    <Button variant="menuButton" icon={<Icon name='visits'/>} onClick={toggleVisits}>Посещения</Button>
                                </Stack>
                            </Stack>
                            <Stack spacing={1} style={{ padding: 16 }}>
                                <Stack style={{ padding: '14px 40px' }}>
                                    <Typography variant="Caption">Взрослый</Typography>
                                    <Typography variant="Header3">{passportAll.title}</Typography>
                                </Stack>
                                <Stack spacing={1} direction="row" justifyContent="space-between">
                                    <Button variant="menuButton" icon={<Icon name='project'/>} onClick={toggleProjects}>Мои проекты</Button>
                                    <Button variant="menuButton" icon={<Icon name='add'/>} onClick={toggleProject} color='primary'/>
                                </Stack>
                                <Button variant="menuButton" icon={<Icon name='idea'/>} onClick={toggleIdeas}>Поиск идей</Button>
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
            <Ideas userId={user.id} open={selfIdeas} onClose={() => { toggleSelfIdeas(); refetch() }} />
            <Projects open={projects} onClose={toggleProjects} />
        </div>
    )
}