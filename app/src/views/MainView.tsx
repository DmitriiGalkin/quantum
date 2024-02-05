import {Avatar, Box, Stack, SwipeableDrawer} from "@mui/material";
import React, {useEffect, useState} from "react";
import {ProjectCard} from "../cards/ProjectCard";
import {useAddIdea, useAddProject, useAddUser, useCreateInvite, useIdeas, useProjects} from "../tools/service";
import Masonry from '@mui/lab/Masonry';
import {DialogContent} from "../components/DialogContent";
import {Header} from "../components/Header";
import {Button, DialogFooter, Icon} from "../components";
import {useAuth} from "../tools/auth";
import {useToggle} from "usehooks-ts";
import FastIdea, {FAST_IDEA} from "../dialogs/FastIdea";
import {IdeaCard} from "../cards/IdeaCard";
import Ideas from "../dialogs/Ideas";
import Projects from "../dialogs/Projects";
import EditProject from "../dialogs/EditProject";
import EditIdea from "../dialogs/EditIdea";
import FastProject, {FAST_PROJECT} from "../dialogs/FastProject";
import {RecommendationProjects} from "../components/RecommendationProjects";
import Typography from "../components/Typography";
import Visits from "../dialogs/Visits";
import EditUser from "../dialogs/EditUser";
import Meets from "../dialogs/Meets";
import PassportDialog from "../dialogs/Passport";
import {RecommendationIdeas} from "../components/RecommendationIdeas";
import {Invite} from "../tools/dto";


export default function MainView(): JSX.Element {
    const { isAuth, openLogin, user, setSelectedUserId, passport: passport } = useAuth();

    const [idea, toggleIdea] = useToggle()
    const [ideas, toggleIdeas] = useToggle()
    const [ideaStepper, toggleIdeaStepper] = useToggle()
    const [fastProject, toggleFastProject] = useToggle()
    const [modalProjects, toggleModalProjects] = useToggle()
    const [project, toggleProject] = useToggle()
    const [passportC, togglePassportC] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [visits, toggleVisits] = useToggle()
    const [selfIdeasC, toggleSelfIdeasC] = useToggle()
    const [sub, toggleSub] = useToggle()
    const [createUser, onClickCreateUser] = useToggle()
    const [isOpenMeets, toggleIsOpenMeets] = useToggle()

    const { data: selfIdeas = [], refetch } = useIdeas({ userId: user?.id });
    const { data: recommendationIdeas = [] } = useIdeas();
    const { data: userProjects = [] } = useProjects({ userId: user?.id });
    const { data: projects = [] } = useProjects();
    const { data: selfProjects = [] } = useProjects({self: true});

    const filteredRecommendationIdeas = recommendationIdeas.filter(i=>i.userId!==user?.id)

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
    const addProject = useAddProject()
    const addInvite = useCreateInvite()
    useEffect(() => {
        if (isAuth && fastProjectJSON) {
            const fastProject = JSON.parse(fastProjectJSON)
            addProject.mutateAsync(fastProject.project).then((projectId)=>{
                fastProject.invites?.forEach((i: Partial<Invite>) => {
                    addInvite.mutate({ ideaId: i.ideaId as number, projectId: projectId as number, userId: i.userId as number })
                })
                localStorage.removeItem(FAST_PROJECT)
            })
        }
    }, [isAuth, fastProjectJSON])

    return (
        <Box style={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
        }}>
            {passport ? (
                <>
                    <Header>
                        {user ? (
                            <>
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ border: '2px solid white' }} onClick={toggleMenu} />
                                    <Stack>
                                        <Typography variant="Body-Bold" style={{ color: 'white' }}>{user.title}</Typography>
                                        <Typography variant="Body" style={{ color: 'white' }}>Актерское мастерство</Typography>
                                    </Stack>
                                </Stack>
                                <Icon name="meets" onClick={toggleIsOpenMeets} />
                            </>
                        ) : (
                            <Icon name="burger" onClick={toggleMenu} />
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
                                <div onClick={user ? toggleSub : onClickCreateUser} style={{ backgroundColor: '#FFB628', padding: 4, borderRadius: '0 8px 8px 0', display: 'inline-flex'}}>
                                    <Icon name={user ? 'users' : 'addUser'}/>
                                </div>
                            </div>
                            {sub && (
                                <div style={{ backgroundColor: '#FFB628', width: 60, padding: '24px 8px', height: '100%' }}>
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
                                                    <Button variant="menuButton" icon={<Icon name='idea'/>} onClick={toggleSelfIdeasC}>Мои идеи</Button>
                                                    <Button variant="menuButton" icon={<Icon name='add'/>} onClick={toggleIdea} color='primary'/>
                                                </Stack>
                                                <Button variant="menuButton" icon={<Icon name='visits'/>} onClick={toggleVisits}>Посещения</Button>
                                            </Stack>
                                        </Stack>
                                    )}
                                    <Stack spacing={1} style={{ padding: 16 }}>
                                        <Stack style={{ padding: '14px 40px' }}>
                                            <Typography variant="Caption">Взрослый</Typography>
                                            <Typography variant="Header3">{passport.title}</Typography>
                                        </Stack>
                                        <Stack spacing={1} direction="row" justifyContent="space-between">
                                            <Button variant="menuButton" icon={<Icon name='project'/>} onClick={toggleModalProjects}>Мои проекты</Button>
                                            <Button variant="menuButton" icon={<Icon name='add'/>} onClick={toggleProject} color='primary'/>
                                        </Stack>
                                        <Button variant="menuButton" icon={<Icon name='idea'/>} onClick={toggleIdeas}>Поиск идей</Button>
                                        <Button variant="menuButton" icon={<Icon name='passport'/>} onClick={togglePassportC}>Профиль родителя</Button>
                                    </Stack>
                                </Stack>
                            </div>
                        </Stack>
                    </SwipeableDrawer>
                    <DialogContent>
                        {bottomNavigationValue === 1 && (
                            <Stack spacing={4} style={{ padding: 16 }}>
                                {Boolean(userProjects.length) && (
                                    <Masonry columns={2} spacing={1}>
                                        {userProjects.map((project) =>
                                            <ProjectCard key={project.id} project={project} refetchParent={refetch} />
                                        )}
                                    </Masonry>
                                )}
                                <Stack spacing={2}>
                                    {Boolean(selfProjects.length) && (
                                        <>
                                            <Typography variant="Header2">Организую проекты</Typography>
                                            <Masonry columns={2} spacing={1}>
                                                {selfProjects.map((project) =>
                                                    <ProjectCard key={project.id} project={project} refetchParent={refetch} />
                                                )}
                                            </Masonry>
                                        </>
                                    )}
                                    <Button onClick={toggleProject} variant="outlined">Создать проект</Button>
                                </Stack>
                                <RecommendationProjects projects={projects} toggleProjectsC={toggleModalProjects}/>
                            </Stack>
                        )}
                        {bottomNavigationValue === 0 && (
                            <Stack spacing={4} style={{ padding: 16 }}>
                                <Stack spacing={2}>
                                    <Stack spacing={2}>
                                        {selfIdeas?.map((idea) =>
                                            <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                                        )}
                                    </Stack>
                                    <Button onClick={toggleIdea}>Создать идею</Button>
                                </Stack>
                                <RecommendationIdeas ideas={filteredRecommendationIdeas} toggleIdeasC={toggleIdeas}/>
                            </Stack>
                        )}
                    </DialogContent>
                    <DialogFooter>
                        <Stack spacing={2} direction="row" justifyContent="space-evenly" style={{ width: '100%', height: '100%' }}>
                            <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(1)}>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M8.69701 13.3851C8.83681 13.3466 8.97744 13.3079 9.11908 13.2689C9.2124 13.4905 9.30619 13.7145 9.40061 13.94C9.57478 14.356 9.75111 14.7771 9.93063 15.1982C10.0254 15.4323 10.0975 15.4474 10.2795 15.2662C10.3809 15.1653 10.4825 15.0643 10.5842 14.9634C10.8895 14.6601 11.1953 14.3563 11.4968 14.0504C11.9216 13.6162 12.1415 13.099 12.1263 12.4873C12.1232 12.378 12.1166 12.2694 12.1101 12.1611C12.1012 12.0113 12.0922 11.8623 12.0922 11.7133C12.0922 11.6453 12.1301 11.5547 12.1832 11.5132C14.3145 9.89719 15.7593 7.79036 16.6657 5.29463C17.1397 3.98447 17.4317 2.62899 17.6062 1.25087C17.6782 0.661863 17.2156 0.159697 16.6278 0.238986C15.8807 0.337154 15.1298 0.450424 14.3979 0.624106C11.1404 1.39435 8.36063 2.94238 6.29764 5.63822C6.26351 5.68352 6.18766 5.72506 6.13078 5.72506C5.91462 5.72883 5.69846 5.72128 5.4861 5.7024C4.82624 5.64954 4.24982 5.8421 3.77579 6.29896C3.4296 6.62851 3.09071 6.97017 2.75328 7.31037C2.66932 7.39501 2.58545 7.47956 2.50159 7.56381C2.3499 7.71862 2.36506 7.79413 2.56985 7.8772C2.91871 8.02321 3.26888 8.16793 3.61959 8.31287C3.86741 8.4153 4.1155 8.51783 4.36359 8.62101C4.40992 8.63894 4.4545 8.66036 4.48666 8.67581C4.50189 8.68313 4.51433 8.68911 4.52286 8.69274C4.47451 8.87085 4.4269 9.04724 4.37966 9.22229C4.24161 9.73374 4.10666 10.2337 3.9654 10.7316C3.93506 10.8487 3.9654 10.9128 4.04504 10.9921C4.95518 11.8945 5.86153 12.7969 6.7603 13.7069C6.88165 13.8315 6.99542 13.8579 7.15469 13.8126C7.66333 13.6696 8.17434 13.5289 8.69701 13.3851ZM12.0012 4.20723C12.8924 4.20723 13.6091 4.92461 13.6053 5.81945C13.6053 6.71429 12.8962 7.41656 11.9936 7.41656C11.11 7.41279 10.4009 6.70296 10.3933 5.81945C10.3857 4.93971 11.1176 4.20723 12.0012 4.20723ZM1.12166 13.9938C1.444 13.9598 1.75876 13.9787 2.08489 14.0958C2.02422 14.1524 1.97872 14.1939 1.93321 14.2354L1.9332 14.2355C0.920668 15.1378 0.583157 16.2403 0.954798 17.5543C1.01927 17.7771 1.17854 17.8337 1.32644 17.6827C1.5919 17.407 1.92183 17.2409 2.27071 17.1088C2.75439 16.9245 3.26157 16.8431 3.77005 16.7616C3.90742 16.7396 4.04489 16.7175 4.18201 16.6934C4.9215 16.5613 5.47138 16.1573 5.68754 15.4097C5.8544 14.832 5.62686 14.3261 5.28556 13.8654C5.14904 13.6804 5.13387 13.6804 4.97839 13.8466C4.59158 14.2657 4.10617 14.4733 3.54112 14.4998C3.34013 14.5073 3.29083 14.462 3.29462 14.2657C3.30221 13.6729 3.53733 13.182 3.98102 12.7969C4.09858 12.6912 4.10617 12.6195 3.96585 12.5402C3.92284 12.5151 3.88012 12.4892 3.83728 12.4632C3.72528 12.3952 3.61252 12.3267 3.49182 12.2721C2.79784 11.9549 2.17211 12.0569 1.61086 12.5742C1.28093 12.8762 1.04581 13.2462 0.8562 13.6465C0.818277 13.7257 0.795523 13.8654 0.841031 13.9183C0.894122 13.9787 1.02685 14.0051 1.12166 13.9938Z" fill={bottomNavigationValue === 1 ? "#FF9329" : "#A5A5A5" }/>
                                </svg>
                                <span style={{ fontSize: 9, fontWeight:900, textTransform: 'uppercase', color: bottomNavigationValue === 1 ? "#FF9329" : "#A5A5A5" }}>Проекты</span>
                            </Stack>
                            <Stack spacing={2} direction="row" alignItems="center" onClick={() => setBottomNavigationValue(0)}>
                                <svg width="30" height="16" viewBox="0 0 30 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M11.0113 3.74323C10.9832 5.90636 12.7531 7.59192 14.7336 7.53573C16.4894 7.6481 18.512 6.32775 18.5542 3.8556C18.5823 1.86103 17.1074 0.0771484 14.8038 0.0771484C12.2334 0.0771484 11.0394 2.12791 11.0113 3.74323ZM8.20188 15.7948H14.8036H21.3352C21.3919 15.7948 21.4469 15.7964 21.5015 15.798H21.5015H21.5016H21.5016H21.5016C21.6093 15.8011 21.715 15.8041 21.8268 15.7948C22.2903 15.7667 22.3465 15.7105 22.3606 15.261C22.3746 14.5447 22.3886 13.8143 22.3606 13.0979C22.3465 12.6625 22.3184 12.213 22.2201 11.7916C21.7847 10.0358 20.675 8.9121 18.9192 8.43453C18.4276 8.29406 18.0062 8.36429 17.5567 8.71545C15.9273 10.0077 13.694 10.0218 12.0506 8.7295C11.6292 8.40643 11.2359 8.30811 10.7583 8.43453C8.93229 8.92615 7.68217 10.0358 7.37315 11.918C7.24464 12.7187 7.24831 13.5404 7.25197 14.3584C7.25352 14.7026 7.25505 15.0463 7.24673 15.3874C7.23269 15.6403 7.3872 15.7667 7.64003 15.7807C7.82263 15.7948 8.01928 15.7948 8.20188 15.7948ZM8.90438 5.21821C8.97461 6.81949 7.56998 8.26626 5.84228 8.26626C4.53598 8.26626 2.79424 7.31111 2.78019 5.20416C2.76614 3.25173 4.32528 2.08588 5.89847 2.12802C7.97732 2.18421 8.98866 3.86976 8.90438 5.21821ZM20.6886 5.17637C20.6605 6.89002 22.1072 8.30869 23.7085 8.25251C25.1412 8.35083 26.8127 7.25522 26.8408 5.20446C26.8549 3.3363 25.38 2.12832 23.7787 2.14237C21.728 2.15641 20.7026 3.79983 20.6886 5.17637ZM2.97667 14.4186C2.71863 14.4186 2.46059 14.4202 2.20308 14.4217H2.20293C1.68951 14.4249 1.17818 14.428 0.673075 14.4186C0.0971765 14.4046 0.0690839 14.3905 0.0550376 13.8287C0.0409913 13.1825 0.026945 12.5364 0.0550376 11.8903C0.125269 10.2609 1.55799 8.94055 3.21546 8.99674C3.38401 8.99674 3.59471 9.06697 3.72112 9.16529C4.22679 9.60073 4.78864 9.8957 5.46286 9.97998C5.70165 10.0081 5.82807 10.1204 5.82807 10.3873C5.82807 11.5953 5.84211 12.8033 5.85616 13.9972C5.85616 14.3062 5.7157 14.4046 5.43477 14.4046C5.01865 14.4046 4.60607 14.4081 4.19525 14.4116H4.19521L4.19501 14.4116C3.78774 14.4151 3.3822 14.4186 2.97667 14.4186ZM25.8298 14.4215C26.0874 14.4199 26.3449 14.4183 26.6024 14.4183C26.8056 14.4183 27.0097 14.4192 27.2143 14.4201C27.8297 14.4227 28.449 14.4254 29.0605 14.4043C29.4959 14.3902 29.5381 14.3341 29.5521 13.9127C29.5662 13.2806 29.5662 12.6626 29.5521 12.0305C29.51 10.3028 28.1896 9.01051 26.4619 8.99647C26.2512 8.98242 25.9984 9.08074 25.8298 9.20716C25.3382 9.60046 24.8325 9.89543 24.2005 9.96566C23.8914 10.0078 23.7791 10.1483 23.7791 10.4713C23.7951 11.1374 23.7928 11.799 23.7905 12.4611C23.7888 12.9579 23.7871 13.4551 23.7931 13.9548C23.7931 14.3902 23.8072 14.4183 24.2847 14.4183C24.7998 14.4277 25.3148 14.4246 25.8298 14.4215Z" fill={bottomNavigationValue === 0 ? "#FF9329" : "#A5A5A5" } />
                                </svg>
                                <span style={{ fontSize: 9, fontWeight:900, textTransform: 'uppercase', color: bottomNavigationValue === 0 ? "#FF9329" : "#A5A5A5" }}>Идеи</span>
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
                            <RecommendationProjects projects={projects} toggleProjectsC={toggleModalProjects}/>
                            <RecommendationIdeas ideas={filteredRecommendationIdeas} toggleIdeasC={toggleIdeas}/>
                        </Stack>
                    </DialogContent>
                </>

            )}
            <FastIdea open={ideaStepper} onClose={toggleIdeaStepper} />
            <FastProject open={fastProject} onClose={toggleFastProject} />
            <EditIdea open={idea} onClose={() => { toggleIdea(); }} />
            <EditProject open={project} onClose={() => { toggleProject(); }} />
            <Ideas open={ideas} onClose={() => { toggleIdeas(); }} />
            <Projects open={modalProjects} onClose={toggleModalProjects} />
            <PassportDialog open={passportC} onClose={togglePassportC} onLogout={toggleMenu} />
            <Visits open={visits} onClose={toggleVisits} />
            <Ideas userId={user?.id} open={selfIdeasC} onClose={() => { toggleSelfIdeasC(); refetch() }} />
            <EditUser userId={user?.id} open={createUser} onClose={() => { onClickCreateUser(); refetch() }} />
            <Meets open={isOpenMeets} onClose={toggleIsOpenMeets} />
        </Box>
    )
}
