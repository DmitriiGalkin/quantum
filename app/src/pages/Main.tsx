import React, {useState} from 'react';

import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Stack,
    Theme,
    Toolbar
} from "@mui/material";

import {useNavigate} from "react-router-dom";
import {makeStyles} from "@mui/styles";
import GroupsIcon from "@mui/icons-material/Groups";
import RocketIcon from "@mui/icons-material/Rocket";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import Day from "../components/Day";
import {Meet} from "../modules/meet";
import {useOnlyUserProjects, useUserMeet} from "../modules/user";
import {getMeetsGroup} from "../tools/helper";
import {TabPanel} from "../components/tabs";
import ProjectCard from "../components/ProjectCard";
import {useOnlyUserTasks} from "../modules/task";
import TaskCard from "../components/TaskCard";
import UniquesPage from "./Uniques";
import ProjectDialog from "../dialogs/Project";
import MapIcon from "@mui/icons-material/Map";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {useAuth} from "../tools/auth";
import MapDialog from "../dialogs/Map";
import {PlaceDialog} from "../dialogs/Place";
import CreateProjectDialog from "../dialogs/CreateProject";
import CreateMeetDialog from "../dialogs/createMeet";
import TaskDialog from "../dialogs/task";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    },
    contentAll: {
        height: '100vh',
        padding: '48px 0 56px 0',
    },
    bottomNavigation: {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10
    },
    appBar: {
        zIndex: 10,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0
    },
}));


export default function MainPage() {
    const classes = useStyles();
    const [projectId, setProjectId] = useState<number>()
    const [placeId, setPlaceId] = useState<number>()
    const [userTaskId, setUserTaskId] = useState<number>()

    const [tab, setTab] = useState(0)
    const { data: meets = [] } = useUserMeet()
    const meetsGroup = getMeetsGroup(meets)
    const { data: projects = [] } = useOnlyUserProjects()
    const { data: tasks = [] } = useOnlyUserTasks()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [openMap, setOpenMap] = useState(false)
    const [createProject, setCreateProject] = useState(false)
    const [createMeet, setCreateMeet] = useState(false)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box className={classes.root}>
                <div className={classes.appBar}>
                    <AppBar>
                        <Toolbar variant="dense">
                            <Box sx={{ padding: '14px 0px 4px 6px' }} >
                                <svg width="98" height="21" viewBox="0 0 98 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.32 8.864C15.32 10.624 14.968 12.152 14.264 13.448C13.56 14.744 12.568 15.712 11.288 16.352L16.208 19.208L12.8 20.528L8.04798 17.168H7.68798C5.36798 17.168 3.51198 16.408 2.11998 14.888C0.727983 13.368 0.0319824 11.36 0.0319824 8.864C0.0319824 6.352 0.719982 4.336 2.09598 2.816C3.48798 1.296 5.34398 0.535995 7.66398 0.535995C10.016 0.535995 11.88 1.296 13.256 2.816C14.632 4.32 15.32 6.336 15.32 8.864ZM3.27198 8.864C3.27198 10.56 3.67198 11.904 4.47198 12.896C5.27198 13.888 6.34398 14.384 7.68798 14.384C9.04798 14.384 10.12 13.896 10.904 12.92C11.688 11.928 12.08 10.576 12.08 8.864C12.08 7.152 11.688 5.8 10.904 4.808C10.12 3.816 9.03998 3.32 7.66398 3.32C6.30398 3.32 5.23198 3.816 4.44798 4.808C3.66398 5.8 3.27198 7.152 3.27198 8.864Z" fill="white"/>
                                    <path d="M28.4844 17H25.5804V15.008C24.9404 16.416 23.6924 17.12 21.8364 17.12C20.6044 17.12 19.6444 16.768 18.9564 16.064C18.2684 15.36 17.9244 14.36 17.9244 13.064V4.832H20.8044V12.392C20.8044 13.16 20.9884 13.744 21.3564 14.144C21.7404 14.544 22.2604 14.744 22.9164 14.744C23.7484 14.744 24.3964 14.464 24.8604 13.904C25.3404 13.344 25.5804 12.496 25.5804 11.36V4.832H28.4844V17Z" fill="white"/>
                                    <path d="M35.7907 14.96C36.4307 14.96 36.9267 14.776 37.2787 14.408C37.6467 14.024 37.8307 13.528 37.8307 12.92V11.768H36.3427C35.5907 11.768 35.0147 11.928 34.6147 12.248C34.2147 12.552 34.0147 12.944 34.0147 13.424C34.0147 14.448 34.6067 14.96 35.7907 14.96ZM37.9507 15.536C37.3907 16.576 36.3347 17.096 34.7827 17.096C33.6307 17.096 32.7107 16.76 32.0227 16.088C31.3507 15.416 31.0147 14.568 31.0147 13.544C31.0147 12.392 31.4467 11.488 32.3107 10.832C33.1747 10.176 34.4227 9.848 36.0547 9.848H37.8307V9.104C37.8307 8.432 37.6547 7.92 37.3027 7.568C36.9507 7.216 36.3507 7.04 35.5027 7.04C34.2067 7.04 33.0147 7.4 31.9267 8.12V5.456C32.8387 4.896 34.1507 4.616 35.8627 4.616C39.1587 4.616 40.8067 6.152 40.8067 9.224V17H37.9507V15.536Z" fill="white"/>
                                    <path d="M54.3387 17H51.4587V9.512C51.4587 8.712 51.2667 8.112 50.8827 7.712C50.4987 7.296 49.9787 7.088 49.3227 7.088C48.5707 7.088 47.9387 7.384 47.4267 7.976C46.9147 8.552 46.6587 9.384 46.6587 10.472V17H43.7787V4.832H46.6587V6.92C47.3467 5.432 48.5947 4.688 50.4027 4.688C51.6187 4.688 52.5787 5.056 53.2827 5.792C53.9867 6.528 54.3387 7.568 54.3387 8.912V17Z" fill="white"/>
                                    <path d="M64.069 16.712C63.509 16.984 62.789 17.12 61.909 17.12C59.285 17.12 57.973 15.792 57.973 13.136V6.992H56.149V4.832H57.973V1.904H60.853V4.832H63.877V6.992H60.853V13.184C60.853 13.696 60.989 14.088 61.261 14.36C61.533 14.616 61.909 14.744 62.389 14.744C62.997 14.744 63.557 14.576 64.069 14.24V16.712Z" fill="white"/>
                                    <path d="M76.8828 17H73.9788V15.008C73.3388 16.416 72.0908 17.12 70.2348 17.12C69.0028 17.12 68.0428 16.768 67.3548 16.064C66.6668 15.36 66.3228 14.36 66.3228 13.064V4.832H69.2028V12.392C69.2028 13.16 69.3868 13.744 69.7548 14.144C70.1388 14.544 70.6588 14.744 71.3148 14.744C72.1468 14.744 72.7948 14.464 73.2588 13.904C73.7388 13.344 73.9788 12.496 73.9788 11.36V4.832H76.8828V17Z" fill="white"/>
                                    <path d="M97.2691 17H94.3651V9.536C94.3651 7.904 93.7411 7.088 92.4931 7.088C91.8691 7.088 91.3091 7.36 90.8131 7.904C90.3331 8.448 90.0931 9.304 90.0931 10.472V17H87.1891V9.536C87.1891 7.904 86.5651 7.088 85.3171 7.088C84.6931 7.088 84.1331 7.36 83.6371 7.904C83.1411 8.448 82.8931 9.304 82.8931 10.472V17H80.0131V4.832H82.8931V6.752C83.5811 5.376 84.7251 4.688 86.3251 4.688C88.1011 4.688 89.2531 5.456 89.7811 6.992C90.1011 6.256 90.5811 5.688 91.2211 5.288C91.8611 4.888 92.5891 4.688 93.4051 4.688C94.6371 4.688 95.5891 5.064 96.2611 5.816C96.9331 6.552 97.2691 7.608 97.2691 8.984V17Z" fill="white"/>
                                </svg>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton
                                size="large"
                                aria-label="show 17 new notifications"
                                color="inherit"
                                onClick={() => setOpenMap(true)}
                            >
                                <MapIcon style={{ color: 'white' }} />
                            </IconButton>
                            <IconButton               size="large"
                                                      edge="end"
                                                      aria-label="account of current user"
                                                      aria-controls={'primary-search-account-menu'}
                                                      aria-haspopup="true"
                                                      onClick={handleProfileMenuOpen}
                                                      color="inherit">
                                <MoreVertIcon style={{ color: 'white' }}/>
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                id={'primary-search-account-menu'}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                            >
                                <MenuItem onClick={() => {
                                    setCreateMeet(true)
                                    handleMenuClose()
                                }}>Новая встреча</MenuItem>
                                <MenuItem onClick={() => {
                                    setCreateProject(true)
                                    handleMenuClose()
                                }}>Новый проект</MenuItem>
                                <MenuItem onClick={() => navigate('/user/1/edit')}>Настройки</MenuItem>
                                <MenuItem onClick={() => logout()}>Выход</MenuItem>
                            </Menu>
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={{minHeight: '100vh', height: '100%'}}>
                    <Box className={classes.contentAll} flexDirection="column" display='flex'>
                        <Container disableGutters>
                            <TabPanel value={tab} index={0}>
                                <Stack spacing={2}>
                                    {meetsGroup.map(([date, meets]) => (
                                        <Day key={date} date={date} meets={meets as Meet[]}/>
                                    ))}
                                </Stack>
                            </TabPanel>
                            <TabPanel value={tab} index={1}>
                                <Stack spacing={2}>
                                    {projects.map((project) => <ProjectCard key={project.id} project={project} active={projects.map((p) => p.id).includes(project.id)} onClick={() => setProjectId(project.id)}/>)}
                                </Stack>
                            </TabPanel>
                            <TabPanel value={tab} index={2}>
                                <Stack spacing={2}>
                                    {tasks.map((task) => <TaskCard key={task.id} task={task} onClick={() => setUserTaskId(task.id)} />)}
                                </Stack>
                            </TabPanel>
                            <TabPanel value={tab} index={3}>
                                <UniquesPage/>
                            </TabPanel>
                        </Container>
                    </Box>
                </div>
                <div className={classes.bottomNavigation}>
                    <Paper elevation={2}>
                        <BottomNavigation
                            value={tab}
                            onChange={(event, newValue) => setTab(newValue)}
                            showLabels
                        >
                            <BottomNavigationAction label="Встречи" icon={<GroupsIcon />} />
                            <BottomNavigationAction label="Проекты" icon={<RocketIcon />} />
                            <BottomNavigationAction label="Задания" icon={<EmojiEventsIcon />} />
                            <BottomNavigationAction label="Ценности" icon={<AutoAwesomeIcon />} />
                        </BottomNavigation>
                    </Paper>
                </div>
            </Box>
            <MapDialog open={openMap} onClose={() => setOpenMap(false)} setPlaceId={setPlaceId} />
            {createProject && <CreateProjectDialog onClose={() => setCreateProject(false)} />}
            {createMeet && <CreateMeetDialog onClose={() => setCreateMeet(false)} />}
            {projectId && <ProjectDialog setCreateMeet={setCreateMeet} projectId={projectId} active={projects.map((p) => p.id).includes(projectId)} onClose={() => setProjectId(undefined)} />}
            {userTaskId && <TaskDialog userTaskId={userTaskId} onClose={() => setUserTaskId(undefined)} />}
            {placeId && <PlaceDialog projects={projects} placeId={placeId} onClose={() => setPlaceId(undefined)} setProjectId={setProjectId} />}
        </>
    );
}
