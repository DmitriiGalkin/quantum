import {Avatar, Box, Stack, SwipeableDrawer} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ProjectCard} from "./cards/ProjectCard";
import {
    IdeaFilter,
    useAddIdea, useAddPlace,
    useAddProject,
    useAddUser,
    useCreateInvite,
    useIdeas,
    useProjects
} from "./tools/service";
import {DialogContent} from "./components/DialogContent";
import {Header} from "./components/Header";
import {Button, DialogFooter, Icon} from "./components";
import {useAuth} from "./tools/auth";
import {useToggle} from "usehooks-ts";
import FastIdea, {FAST_IDEA} from "./dialogs/FastIdea";
import {IdeaCard} from "./cards/IdeaCard";
import Ideas from "./dialogs/Ideas";
import Projects from "./dialogs/Projects";
import EditProject from "./dialogs/EditProject";
import EditIdea from "./dialogs/EditIdea";
import FastProject, {FAST_PROJECT} from "./dialogs/FastProject";
import {RecommendationProjects} from "./components/RecommendationProjects";
import Typography from "./components/Typography";
import Visits from "./dialogs/Visits";
import EditUser from "./dialogs/EditUser";
import Meets from "./dialogs/Meets";
import {RecommendationIdeas} from "./components/RecommendationIdeas";
import {Invite} from "./tools/dto";
import {COLOR, COLOR_GRAY, COLOR_LOW, COLOR_PAPER} from "./tools/theme";
import EditPassport from "./dialogs/EditPassport";

interface AppProps {
    action?: 'fastIdea' | 'fastProject'
}
export default function App({ action }: AppProps): JSX.Element {
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


    const fastIdeaJSON = localStorage.getItem(FAST_IDEA)
    const addUser = useAddUser()
    const addIdea = useAddIdea()
    useEffect(() => {
        if (isAuth && fastIdeaJSON) {
            const fastIdea = JSON.parse(fastIdeaJSON)
            addUser.mutateAsync(fastIdea.user).then((userId)=>{
                addIdea.mutateAsync({...fastIdea.idea, userId}).then(() => {
                    localStorage.removeItem(FAST_IDEA)
                })
            })
        }
    }, [isAuth, fastIdeaJSON])

    const fastProjectJSON = localStorage.getItem(FAST_PROJECT)
    const addPlace = useAddPlace()
    const addProject = useAddProject()
    const addInvite = useCreateInvite()
    useEffect(() => {
        if (isAuth && fastProjectJSON) {
            const fastProject = JSON.parse(fastProjectJSON)
            addPlace.mutateAsync(fastProject.place).then((placeId)=>{
                addProject.mutateAsync({...fastProject.project, placeId}).then((projectId)=>{
                    fastProject.invites?.forEach((i: Partial<Invite>) => {
                        addInvite.mutate({ ideaId: i.ideaId as number, projectId: projectId as number, userId: i.userId as number })
                    })
                    localStorage.removeItem(FAST_PROJECT)
                })
            })
        }
    }, [isAuth, fastProjectJSON])

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
                        {bottomNavigationValue === 1 && (
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
                        {bottomNavigationValue === 0 && (
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
                        <Stack spacing={2} direction="row" justifyContent="space-evenly" style={{ width: '100%', height: '100%' }}>
                            <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(1)}>
                                <Icon name="project" color={bottomNavigationValue === 1 ? 'secondary' : 'gray' }/>
                                <span style={{ fontSize: 9, fontWeight:900, textTransform: 'uppercase', color: bottomNavigationValue === 1 ? COLOR : COLOR_GRAY }}>Проекты</span>
                            </Stack>
                            <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(0)}>
                                <Icon name="idea" color={bottomNavigationValue === 0 ? 'secondary' : 'gray' }/>
                                <span style={{ fontSize: 9, fontWeight:900, textTransform: 'uppercase', color: bottomNavigationValue === 0 ? COLOR : COLOR_GRAY }}>Идеи</span>
                            </Stack>
                        </Stack>
                    </DialogFooter>
                </>
            ) : (
                <>
                    <Header>
                        <svg width="99" height="25" viewBox="0 0 99 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M19.4886 12.1165C19.4886 16.2179 16.173 19.5427 12.0829 19.5427C7.99289 19.5427 4.67726 16.2179 4.67726 12.1165C4.67726 8.01509 7.99289 4.69026 12.0829 4.69026C16.173 4.69026 19.4886 8.01509 19.4886 12.1165ZM16.6477 23.3385C15.2393 23.9152 13.6981 24.233 12.0829 24.233C5.40971 24.233 0 18.8082 0 12.1165C0 5.42474 5.40971 0 12.0829 0C18.7561 0 24.1659 5.42474 24.1659 12.1165C24.1659 14.4852 23.488 16.6951 22.3163 18.5619C21.7211 18.1926 21.0194 17.9794 20.2681 17.9794C18.1155 17.9794 16.3704 19.7293 16.3704 21.8879C16.3704 22.4005 16.4688 22.89 16.6477 23.3385Z" fill="white"/>
                            <ellipse cx="20.2681" cy="21.8881" rx="2.33863" ry="2.34513" fill="white"/>
                            <mask id="path-3-outside-1_816_2559" maskUnits="userSpaceOnUse" x="27.595" y="7.21411" width="71" height="11" fill="black">
                                <rect fill="white" x="27.595" y="7.21411" width="71" height="11"/>
                                <path d="M32.5849 17.3909C30.5047 17.3909 28.8595 15.8544 28.8595 13.6382V7.69644H29.784V13.6654C29.784 15.3786 31.0213 16.5343 32.5849 16.5343C34.135 16.5343 35.3859 15.3786 35.3859 13.6654V7.69644H36.2968V13.6382C36.2968 15.8544 34.6652 17.3909 32.5849 17.3909ZM48.2263 17.2141H47.261L46.6219 14.8347H41.1153L40.4626 17.2141H39.4973L42.1622 7.69644H45.5614L48.2263 17.2141ZM42.8284 8.62102L41.36 13.9781H46.3772L44.9223 8.62102H42.8284ZM58.9686 16.3439V7.69644H59.8796V17.2141H57.7178L53.7747 8.56663H53.0405V17.2141H52.1159V7.69644H54.3594L58.3024 16.3439H58.9686ZM63.5276 7.69644H70.8698V8.56663H67.661V17.2141H66.7364V8.56663H63.5276V7.69644ZM78.095 17.3909C76.0147 17.3909 74.3695 15.8544 74.3695 13.6382V7.69644H75.2941V13.6654C75.2941 15.3786 76.5314 16.5343 78.095 16.5343C79.645 16.5343 80.8959 15.3786 80.8959 13.6654V7.69644H81.8069V13.6382C81.8069 15.8544 80.1753 17.3909 78.095 17.3909ZM97.4425 17.2141H96.4908L95.7022 8.56663H95.0495L92.2894 17.2141H90.7258L87.9793 8.56663H87.3266L86.538 17.2141H85.5862L86.4836 7.69644H88.7135L91.3648 16.3439H91.6776L94.3153 7.69644H96.5452L97.4425 17.2141Z"/>
                            </mask>
                            <path d="M32.5849 17.3909C30.5047 17.3909 28.8595 15.8544 28.8595 13.6382V7.69644H29.784V13.6654C29.784 15.3786 31.0213 16.5343 32.5849 16.5343C34.135 16.5343 35.3859 15.3786 35.3859 13.6654V7.69644H36.2968V13.6382C36.2968 15.8544 34.6652 17.3909 32.5849 17.3909ZM48.2263 17.2141H47.261L46.6219 14.8347H41.1153L40.4626 17.2141H39.4973L42.1622 7.69644H45.5614L48.2263 17.2141ZM42.8284 8.62102L41.36 13.9781H46.3772L44.9223 8.62102H42.8284ZM58.9686 16.3439V7.69644H59.8796V17.2141H57.7178L53.7747 8.56663H53.0405V17.2141H52.1159V7.69644H54.3594L58.3024 16.3439H58.9686ZM63.5276 7.69644H70.8698V8.56663H67.661V17.2141H66.7364V8.56663H63.5276V7.69644ZM78.095 17.3909C76.0147 17.3909 74.3695 15.8544 74.3695 13.6382V7.69644H75.2941V13.6654C75.2941 15.3786 76.5314 16.5343 78.095 16.5343C79.645 16.5343 80.8959 15.3786 80.8959 13.6654V7.69644H81.8069V13.6382C81.8069 15.8544 80.1753 17.3909 78.095 17.3909ZM97.4425 17.2141H96.4908L95.7022 8.56663H95.0495L92.2894 17.2141H90.7258L87.9793 8.56663H87.3266L86.538 17.2141H85.5862L86.4836 7.69644H88.7135L91.3648 16.3439H91.6776L94.3153 7.69644H96.5452L97.4425 17.2141Z" fill="white"/>
                            <path d="M28.8595 7.69644V7.36897H28.532V7.69644H28.8595ZM29.784 7.69644H30.1115V7.36897H29.784V7.69644ZM35.3859 7.69644V7.36897H35.0584V7.69644H35.3859ZM36.2968 7.69644H36.6243V7.36897H36.2968V7.69644ZM32.5849 17.0634C30.6808 17.0634 29.1869 15.6689 29.1869 13.6382H28.532C28.532 16.04 30.3285 17.7183 32.5849 17.7183V17.0634ZM29.1869 13.6382V7.69644H28.532V13.6382H29.1869ZM28.8595 8.02392H29.784V7.36897H28.8595V8.02392ZM29.4566 7.69644V13.6654H30.1115V7.69644H29.4566ZM29.4566 13.6654C29.4566 15.5605 30.8415 16.8618 32.5849 16.8618V16.2068C31.2011 16.2068 30.1115 15.1967 30.1115 13.6654H29.4566ZM32.5849 16.8618C34.3137 16.8618 35.7133 15.5615 35.7133 13.6654H35.0584C35.0584 15.1956 33.9562 16.2068 32.5849 16.2068V16.8618ZM35.7133 13.6654V7.69644H35.0584V13.6654H35.7133ZM35.3859 8.02392H36.2968V7.36897H35.3859V8.02392ZM35.9694 7.69644V13.6382H36.6243V7.69644H35.9694ZM35.9694 13.6382C35.9694 15.6704 34.4875 17.0634 32.5849 17.0634V17.7183C34.8429 17.7183 36.6243 16.0385 36.6243 13.6382H35.9694ZM48.2263 17.2141V17.5416H48.6581L48.5417 17.1258L48.2263 17.2141ZM47.261 17.2141L46.9447 17.2991L47.0098 17.5416H47.261V17.2141ZM46.6219 14.8347L46.9382 14.7498L46.873 14.5072H46.6219V14.8347ZM41.1153 14.8347V14.5072H40.8655L40.7995 14.7481L41.1153 14.8347ZM40.4626 17.2141V17.5416H40.7124L40.7784 17.3007L40.4626 17.2141ZM39.4973 17.2141L39.1819 17.1258L39.0655 17.5416H39.4973V17.2141ZM42.1622 7.69644V7.36897H41.9138L41.8469 7.60815L42.1622 7.69644ZM45.5614 7.69644L45.8767 7.60815L45.8097 7.36897H45.5614V7.69644ZM42.8284 8.62102V8.29354H42.5787L42.5126 8.53445L42.8284 8.62102ZM41.36 13.9781L41.0442 13.8915L40.9307 14.3056H41.36V13.9781ZM46.3772 13.9781V14.3056H46.8054L46.6932 13.8923L46.3772 13.9781ZM44.9223 8.62102L45.2384 8.53519L45.1727 8.29354H44.9223V8.62102ZM48.2263 16.8866H47.261V17.5416H48.2263V16.8866ZM47.5772 17.1292L46.9382 14.7498L46.3056 14.9196L46.9447 17.2991L47.5772 17.1292ZM46.6219 14.5072H41.1153V15.1622H46.6219V14.5072ZM40.7995 14.7481L40.1468 17.1275L40.7784 17.3007L41.4311 14.9213L40.7995 14.7481ZM40.4626 16.8866H39.4973V17.5416H40.4626V16.8866ZM39.8126 17.3024L42.4776 7.78474L41.8469 7.60815L39.1819 17.1258L39.8126 17.3024ZM42.1622 8.02392H45.5614V7.36897H42.1622V8.02392ZM45.246 7.78474L47.911 17.3024L48.5417 17.1258L45.8767 7.60815L45.246 7.78474ZM42.5126 8.53445L41.0442 13.8915L41.6758 14.0647L43.1443 8.70759L42.5126 8.53445ZM41.36 14.3056H46.3772V13.6506H41.36V14.3056ZM46.6932 13.8923L45.2384 8.53519L44.6063 8.70684L46.0611 14.0639L46.6932 13.8923ZM44.9223 8.29354H42.8284V8.94849H44.9223V8.29354ZM58.9686 16.3439V16.6714H59.2961V16.3439H58.9686ZM58.9686 7.69644V7.36897H58.6412V7.69644H58.9686ZM59.8796 7.69644H60.2071V7.36897H59.8796V7.69644ZM59.8796 17.2141V17.5416H60.2071V17.2141H59.8796ZM57.7178 17.2141L57.4198 17.35L57.5072 17.5416H57.7178V17.2141ZM53.7747 8.56663L54.0727 8.43077L53.9853 8.23916H53.7747V8.56663ZM53.0405 8.56663V8.23916H52.713V8.56663H53.0405ZM53.0405 17.2141V17.5416H53.368V17.2141H53.0405ZM52.1159 17.2141H51.7885V17.5416H52.1159V17.2141ZM52.1159 7.69644V7.36897H51.7885V7.69644H52.1159ZM54.3594 7.69644L54.6573 7.56058L54.57 7.36897H54.3594V7.69644ZM58.3024 16.3439L58.0045 16.4798L58.0918 16.6714H58.3024V16.3439ZM59.2961 16.3439V7.69644H58.6412V16.3439H59.2961ZM58.9686 8.02392H59.8796V7.36897H58.9686V8.02392ZM59.5522 7.69644V17.2141H60.2071V7.69644H59.5522ZM59.8796 16.8866H57.7178V17.5416H59.8796V16.8866ZM58.0157 17.0782L54.0727 8.43077L53.4768 8.70249L57.4198 17.35L58.0157 17.0782ZM53.7747 8.23916H53.0405V8.8941H53.7747V8.23916ZM52.713 8.56663V17.2141H53.368V8.56663H52.713ZM53.0405 16.8866H52.1159V17.5416H53.0405V16.8866ZM52.4434 17.2141V7.69644H51.7885V17.2141H52.4434ZM52.1159 8.02392H54.3594V7.36897H52.1159V8.02392ZM54.0614 7.8323L58.0045 16.4798L58.6004 16.2081L54.6573 7.56058L54.0614 7.8323ZM58.3024 16.6714H58.9686V16.0165H58.3024V16.6714ZM63.5276 7.69644V7.36897H63.2001V7.69644H63.5276ZM70.8698 7.69644H71.1972V7.36897H70.8698V7.69644ZM70.8698 8.56663V8.8941H71.1972V8.56663H70.8698ZM67.661 8.56663V8.23916H67.3335V8.56663H67.661ZM67.661 17.2141V17.5416H67.9884V17.2141H67.661ZM66.7364 17.2141H66.4089V17.5416H66.7364V17.2141ZM66.7364 8.56663H67.0639V8.23916H66.7364V8.56663ZM63.5276 8.56663H63.2001V8.8941H63.5276V8.56663ZM63.5276 8.02392H70.8698V7.36897H63.5276V8.02392ZM70.5423 7.69644V8.56663H71.1972V7.69644H70.5423ZM70.8698 8.23916H67.661V8.8941H70.8698V8.23916ZM67.3335 8.56663V17.2141H67.9884V8.56663H67.3335ZM67.661 16.8866H66.7364V17.5416H67.661V16.8866ZM67.0639 17.2141V8.56663H66.4089V17.2141H67.0639ZM66.7364 8.23916H63.5276V8.8941H66.7364V8.23916ZM63.855 8.56663V7.69644H63.2001V8.56663H63.855ZM74.3695 7.69644V7.36897H74.0421V7.69644H74.3695ZM75.2941 7.69644H75.6216V7.36897H75.2941V7.69644ZM80.8959 7.69644V7.36897H80.5685V7.69644H80.8959ZM81.8069 7.69644H82.1344V7.36897H81.8069V7.69644ZM78.095 17.0634C76.1908 17.0634 74.697 15.6689 74.697 13.6382H74.0421C74.0421 16.04 75.8386 17.7183 78.095 17.7183V17.0634ZM74.697 13.6382V7.69644H74.0421V13.6382H74.697ZM74.3695 8.02392H75.2941V7.36897H74.3695V8.02392ZM74.9666 7.69644V13.6654H75.6216V7.69644H74.9666ZM74.9666 13.6654C74.9666 15.5605 76.3516 16.8618 78.095 16.8618V16.2068C76.7112 16.2068 75.6216 15.1967 75.6216 13.6654H74.9666ZM78.095 16.8618C79.8238 16.8618 81.2234 15.5615 81.2234 13.6654H80.5685C80.5685 15.1956 79.4663 16.2068 78.095 16.2068V16.8618ZM81.2234 13.6654V7.69644H80.5685V13.6654H81.2234ZM80.8959 8.02392H81.8069V7.36897H80.8959V8.02392ZM81.4794 7.69644V13.6382H82.1344V7.69644H81.4794ZM81.4794 13.6382C81.4794 15.6704 79.9976 17.0634 78.095 17.0634V17.7183C80.353 17.7183 82.1344 16.0385 82.1344 13.6382H81.4794ZM97.4425 17.2141V17.5416H97.8023L97.7686 17.1834L97.4425 17.2141ZM96.4908 17.2141L96.1647 17.2439L96.1918 17.5416H96.4908V17.2141ZM95.7022 8.56663L96.0283 8.53689L96.0011 8.23916H95.7022V8.56663ZM95.0495 8.56663V8.23916H94.8103L94.7376 8.46706L95.0495 8.56663ZM92.2894 17.2141V17.5416H92.5286L92.6014 17.3137L92.2894 17.2141ZM90.7258 17.2141L90.4137 17.3132L90.4862 17.5416H90.7258V17.2141ZM87.9793 8.56663L88.2914 8.4675L88.2188 8.23916H87.9793V8.56663ZM87.3266 8.56663V8.23916H87.0277L87.0005 8.53689L87.3266 8.56663ZM86.538 17.2141V17.5416H86.837L86.8641 17.2439L86.538 17.2141ZM85.5862 17.2141L85.2602 17.1834L85.2264 17.5416H85.5862V17.2141ZM86.4836 7.69644V7.36897H86.1856L86.1576 7.6657L86.4836 7.69644ZM88.7135 7.69644L89.0266 7.60045L88.9556 7.36897H88.7135V7.69644ZM91.3648 16.3439L91.0517 16.4399L91.1227 16.6714H91.3648V16.3439ZM91.6776 16.3439V16.6714H91.92L91.9908 16.4395L91.6776 16.3439ZM94.3153 7.69644V7.36897H94.0728L94.0021 7.6009L94.3153 7.69644ZM96.5452 7.69644L96.8712 7.6657L96.8432 7.36897H96.5452V7.69644ZM97.4425 16.8866H96.4908V17.5416H97.4425V16.8866ZM96.8169 17.1844L96.0283 8.53689L95.376 8.59637L96.1647 17.2439L96.8169 17.1844ZM95.7022 8.23916H95.0495V8.8941H95.7022V8.23916ZM94.7376 8.46706L91.9774 17.1145L92.6014 17.3137L95.3615 8.6662L94.7376 8.46706ZM92.2894 16.8866H90.7258V17.5416H92.2894V16.8866ZM91.0379 17.115L88.2914 8.4675L87.6672 8.66576L90.4137 17.3132L91.0379 17.115ZM87.9793 8.23916H87.3266V8.8941H87.9793V8.23916ZM87.0005 8.53689L86.2119 17.1844L86.8641 17.2439L87.6527 8.59637L87.0005 8.53689ZM86.538 16.8866H85.5862V17.5416H86.538V16.8866ZM85.9123 17.2449L86.8097 7.72718L86.1576 7.6657L85.2602 17.1834L85.9123 17.2449ZM86.4836 8.02392H88.7135V7.36897H86.4836V8.02392ZM88.4004 7.79244L91.0517 16.4399L91.6779 16.2479L89.0266 7.60045L88.4004 7.79244ZM91.3648 16.6714H91.6776V16.0165H91.3648V16.6714ZM91.9908 16.4395L94.6285 7.79199L94.0021 7.6009L91.3643 16.2484L91.9908 16.4395ZM94.3153 8.02392H96.5452V7.36897H94.3153V8.02392ZM96.2191 7.72718L97.1165 17.2449L97.7686 17.1834L96.8712 7.6657L96.2191 7.72718Z" fill="white" mask="url(#path-3-outside-1_816_2559)"/>
                        </svg>
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
