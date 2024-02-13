import {Avatar, Box, Stack, SwipeableDrawer} from "@mui/material";
import React, {useState} from "react";
import {ProjectCard} from "./cards/ProjectCard";
import {
    IdeaFilter,
    useIdeas,
    useProjects
} from "./tools/service";
import {DialogContent} from "./components/DialogContent";
import {Header} from "./components/Header";
import {Button, DialogFooter, Icon} from "./components";
import {useAuth} from "./tools/auth";
import {useToggle} from "usehooks-ts";
import FastIdea from "./dialogs/FastIdea";
import {IdeaCard} from "./cards/IdeaCard";
import Ideas from "./dialogs/Ideas";
import Projects from "./dialogs/Projects";
import EditProject from "./dialogs/EditProject";
import EditIdea from "./dialogs/EditIdea";
import FastProject from "./dialogs/FastProject";
import {RecommendationProjects} from "./components/RecommendationProjects";
import Typography from "./components/Typography";
import Visits from "./dialogs/Visits";
import EditUser from "./dialogs/EditUser";
import Meets from "./dialogs/Meets";
import {RecommendationIdeas} from "./components/RecommendationIdeas";
import {COLOR, COLOR_GRAY, COLOR_LOW, COLOR_PAPER} from "./tools/theme";
import EditPassport from "./dialogs/EditPassport";
import {Logo} from "./components/Logo";
import {useFast} from "./tools/fast";

interface AppProps {
    action?: 'fastIdea' | 'fastProject'
}
export default function App({ action }: AppProps): JSX.Element {
    useFast()

    const { isAuth, openLogin, user, setSelectedUserId, passport: passport, refetch: refetchPassport } = useAuth();
    const [idea, toggleIdea] = useToggle()
    const [ideaFilter, setIdeaFilter] = useState<IdeaFilter>()
    const [ideaStepper, toggleIdeaStepper] = useToggle(action === 'fastIdea')
    const [fastProject, toggleFastProject] = useToggle()
    const [modalProjects, toggleModalProjects] = useToggle()
    const [project, toggleProject] = useToggle()
    const [passportC, togglePassportC] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [visits, toggleVisits] = useToggle()
    const [sub, toggleSub] = useToggle()
    const [createUser, onClickCreateUser] = useToggle()
    const [isOpenMeets, toggleIsOpenMeets] = useToggle()
    const [isOpenPassportMeets, toggleIsOpenPassportMeets] = useToggle()


    const { data: selfIdeas = [], refetch } = useIdeas({ userId: user?.id });
    const { data: userProjects = [] } = useProjects({ userId: user?.id });
    const { data: selfProjects = [], refetch: refetchSelfProjects } = useProjects({self: true});

    const [bottomNavigationValue, setBottomNavigationValue] = useState(1)
    const isProjectsTab = bottomNavigationValue === 1
    const isIdeasTab = bottomNavigationValue === 0

    return (
        <Box style={{ backgroundColor: COLOR_PAPER, display: 'flex', flexDirection: 'column', height: '100vh' }}>
            {isAuth ? (
                <>
                    <Header>
                        {user && (
                            <>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ border: '2px solid white' }} onClick={toggleMenu} />
                                    <Stack>
                                        <Typography variant="Body-Bold" style={{ color: 'white' }}>{user.title}</Typography>
                                        {false && <Typography variant="Body" style={{ color: 'white' }}>{user.age} лет</Typography>}
                                    </Stack>
                                </Stack>
                                <Icon color="white" name="meets" onClick={toggleIsOpenMeets} />
                            </>
                        )}
                        {passport && !user && (
                            <>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Stack>
                                        <Typography variant="Body-Bold" style={{ color: 'white' }}>{passport.title}</Typography>
                                    </Stack>
                                </Stack>
                                <Icon color="white" name="meets" onClick={toggleIsOpenPassportMeets} />
                            </>
                        )}
                    </Header>
                    <SwipeableDrawer
                        anchor="left"
                        open={menu}
                        onClose={toggleMenu}
                        onOpen={toggleMenu}
                    >
                        <Stack direction="row" style={{ height: '100%' }}>
                            <div style={{ position: 'absolute', top: 16, left: sub ? 54 : 0 }}>
                                <div onClick={user ? toggleSub : onClickCreateUser} style={{ backgroundColor: COLOR_LOW, padding: 4, borderRadius: '0 8px 8px 0', display: 'inline-flex'}}>
                                    <Icon color="white" name={user ? 'users' : 'addUser'}/>
                                </div>
                            </div>
                            {sub && (
                                <div style={{ backgroundColor: COLOR_LOW, width: 60, padding: '24px 8px', height: '100%' }}>
                                    <Stack alignItems="center" spacing={2}>
                                        {passport && passport?.users.map((user) => (
                                            <Avatar key={user.id} alt={user.title} src={user.image} sx={{ border: '2px solid white' }} onClick={()=>setSelectedUserId(user.id)}/>
                                        ))}
                                    </Stack>
                                </div>
                            )}
                            <div style={{ color: 'black', height: '100%', width: 280 }}>
                                <Stack justifyContent="space-between" style={{ height: '100%' }}>
                                    {user && (
                                        <Stack spacing={2} style={{ backgroundColor: 'white', padding: 16 }}>
                                            <Stack spacing={2} direction="row" style={{ padding: '14px 40px' }} onClick={onClickCreateUser}>
                                                <Avatar alt={user.title} src={user.image} sx={{ width: 72, height: 72}} />
                                                <Stack>
                                                    <Typography variant="Caption">Ребенок</Typography>
                                                    <Typography variant="Header3">{user.title}</Typography>
                                                </Stack>
                                            </Stack>
                                            <Stack spacing={1}>
                                                <Stack spacing={1} direction="row" justifyContent="space-between">
                                                    <Button variant="menuButton" icon={<Icon name='idea'/>} onClick={() => setIdeaFilter({ userId: user.id })}>Мои идеи</Button>
                                                    <Button variant="menuButton" icon={<Icon name='add' color="white" />} onClick={toggleIdea} color='primary'/>
                                                </Stack>
                                                <Button variant="menuButton" icon={<Icon name='visits'/>} onClick={toggleVisits}>Посещения</Button>
                                            </Stack>
                                        </Stack>
                                    )}
                                    {passport && (
                                        <Stack spacing={1} style={{ padding: 16 }}>
                                            <Stack style={{ padding: '14px 40px' }}>
                                                <Typography variant="Caption">Взрослый</Typography>
                                                <Typography variant="Header3">{passport.title}</Typography>
                                            </Stack>
                                            <Stack spacing={1} direction="row" justifyContent="space-between">
                                                <Button variant="menuButton" icon={<Icon name='project'/>} onClick={toggleModalProjects}>Мои проекты</Button>
                                                <Button variant="menuButton" icon={<Icon name='add' color="white"/>} onClick={toggleProject} color='primary'/>
                                            </Stack>
                                            <Button variant="menuButton" icon={<Icon name='idea'/>} onClick={() => setIdeaFilter({})}>Банк идей</Button>
                                            <Button variant="menuButton" icon={<Icon name='passport'/>} onClick={togglePassportC}>Профиль родителя</Button>
                                            <Button variant="menuButton" icon={<Icon name='passport'/>} onClick={toggleIsOpenPassportMeets}>Календарь организатора</Button>
                                        </Stack>
                                    )}
                                </Stack>
                            </div>
                        </Stack>
                    </SwipeableDrawer>
                    <DialogContent>
                        {isProjectsTab && (
                            <Stack spacing={4} style={{ padding: 16 }}>
                                <Stack spacing={2}>
                                    {Boolean(selfProjects.length) && (
                                        <>
                                            <Typography variant="Header2">Организую проекты</Typography>
                                            <Stack spacing={1}>
                                                {selfProjects.map((project) =>
                                                    <ProjectCard key={project.id} project={project} refetchParent={refetchSelfProjects} variant="admin" />
                                                )}
                                            </Stack>
                                        </>
                                    )}
                                    <Button onClick={toggleProject}>Создать проект</Button>
                                </Stack>
                                <Stack spacing={2}>
                                    {Boolean(userProjects.length) && (
                                        <>
                                            <Typography variant="Header2">Участвую в проектах</Typography>
                                            <Stack spacing={1}>
                                                {userProjects.map((project) =>
                                                    <ProjectCard key={project.id} project={project} refetchParent={refetchSelfProjects} variant="admin" />
                                                )}
                                            </Stack>
                                        </>
                                    )}
                                </Stack>
                                <RecommendationProjects toggleProjectsC={toggleModalProjects}/>
                            </Stack>
                        )}
                        {isIdeasTab && (
                            <Stack spacing={4} style={{ padding: 16 }}>
                                {user ? (
                                    <Stack spacing={2}>
                                        <Stack spacing={2}>
                                            {selfIdeas?.map((idea) =>
                                                <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                                            )}
                                        </Stack>
                                        <Button onClick={toggleIdea}>Создать идею</Button>
                                    </Stack>
                                ) : (
                                    <Button onClick={toggleIdeaStepper}>Быстрая идея</Button>
                                )}
                                <RecommendationIdeas toggleIdeasC={() => setIdeaFilter({})}/>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogFooter>
                        <Stack spacing={2} direction="row" justifyContent="space-evenly">
                            <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(1)}>
                                <Icon name="project" color={isProjectsTab ? 'secondary' : 'gray' }/>
                                <span style={{ fontSize: 9, fontWeight:900, textTransform: 'uppercase', color: isProjectsTab ? COLOR : COLOR_GRAY }}>Проекты</span>
                            </Stack>
                            <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(0)}>
                                <Icon name="idea" color={isIdeasTab ? 'secondary' : 'gray' }/>
                                <span style={{ fontSize: 9, fontWeight:900, textTransform: 'uppercase', color: isIdeasTab ? COLOR : COLOR_GRAY }}>Идеи</span>
                            </Stack>
                        </Stack>
                    </DialogFooter>
                </>
            ) : (
                <>
                    <Header>
                        <Logo />
                        <Icon name="login" onClick={openLogin} />
                    </Header>
                    <DialogContent>
                        <Stack spacing={4} style={{ padding: 16 }}>
                            <Stack spacing={1}>
                                <Button onClick={toggleFastProject}>Быстрый проект</Button>
                                <Button onClick={toggleIdeaStepper}>Быстрая идея</Button>
                            </Stack>
                            <RecommendationProjects toggleProjectsC={toggleModalProjects}/>
                            <RecommendationIdeas toggleIdeasC={() => setIdeaFilter({})}/>
                        </Stack>
                    </DialogContent>
                </>

            )}
            <FastIdea open={ideaStepper} onClose={toggleIdeaStepper} />
            <FastProject open={fastProject} onClose={toggleFastProject} />
            <EditIdea open={idea} onClose={() => { toggleIdea(); }} />
            <EditProject open={project} onClose={() => { toggleProject(); }} />
            <EditPassport open={passportC} onClose={() => { togglePassportC(); refetchPassport() }} onLogout={toggleMenu} />
            <EditUser userId={user?.id} open={createUser} onClose={() => { onClickCreateUser(); refetchPassport() }} />
            <Projects open={modalProjects} onClose={toggleModalProjects} />
            <Ideas open={ideaFilter} ideaFilter={ideaFilter} onClose={() => { setIdeaFilter(undefined); }} />
            {/*<Ideas userId={user?.id} open={selfIdeasC} onClose={() => { toggleSelfIdeasC(); refetch() }} />*/}
            <Visits open={visits} onClose={toggleVisits} />
            <Meets open={isOpenMeets} onClose={toggleIsOpenMeets} />
            <Meets open={isOpenPassportMeets} onClose={toggleIsOpenPassportMeets} isForPassport />
        </Box>
    )
}
