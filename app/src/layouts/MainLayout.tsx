import {Outlet, useLocation, useNavigate, useOutletContext} from "react-router-dom";
import {useAuth} from "../tools/auth";
import {
    AppBar,
    BottomNavigation,
    BottomNavigationAction,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Theme,
    Toolbar
} from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {NewMeet} from "../modules/meet";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import GroupsIcon from "@mui/icons-material/Groups";
import RocketIcon from "@mui/icons-material/Rocket";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Map from "../dialogs/Map";

import CreateProject from "../dialogs/CreateProject";
import CreateMeet from "../dialogs/CreateMeet";
import Options from "../dialogs/Options";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@mui/styles";
import {User, useUser} from "../modules/user";
import QContainer from "../components/QContainer";
import {More} from "../components/More";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        backgroundColor: theme.palette.background.paper,
    },
    contentAll: {
        height: '100vh',
        padding: '48px 0 68px 0',
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
type ContextType = {
    user: User | null
    setOpenCreateProject: (open: boolean) => void
    setOpenMap: (open: boolean) => void
};

const MAIN_PAGES = ['', 'projects', 'tasks', 'uniques']
export const MainLayout = () => {
    const { data: user } = useUser()

    const navigate = useNavigate();
    const location = useLocation();

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { logout } = useAuth();
    const [openMap, setOpenMap] = useState(false)
    const [openCreateProject, setOpenCreateProject] = useState(false)
    const [openCreateMeet, setOpenCreateMeet] = useState<NewMeet>()
    const [openOptions, setOpenOptions] = useState(false)

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const bottomNavigationValue = MAIN_PAGES.findIndex((pageName) => '/' + pageName === location.pathname) || 0
    const [user2, setUser2] = React.useState<User | null>(null);
    useEffect(() => {
        user && setUser2(user)
    }, [user])

    const menuItems = [
        { title: 'Новая встреча', onClick: () => setOpenCreateMeet({}) },
        { title: 'Новый проект', onClick: () => setOpenCreateProject(true) },
        { title: 'Настройки', onClick: () => setOpenOptions(true) },
        { title: 'Выход', onClick: () => logout() },
    ]
    return (
        <>
            <Box className={classes.root}>
                <div className={classes.appBar}>
                    <AppBar>
                        <Toolbar variant="dense">
                            <Box sx={{ padding: '14px 0px 4px 6px' }} >
                                <svg width="139" height="21" viewBox="0 0 139 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.41 17H10.27V10.445H4.52V17H0.38V0.899999H4.52V7.225H10.27V0.899999H14.41V17ZM21.7808 14.01C22.5934 14.01 23.5134 13.8567 24.5408 13.55V12.17H21.2058C20.9758 12.17 20.7841 12.2467 20.6308 12.4C20.4774 12.5533 20.4008 12.745 20.4008 12.975V13.205C20.4008 13.435 20.4774 13.6267 20.6308 13.78C20.7841 13.9333 20.9758 14.01 21.2058 14.01H21.7808ZM17.5258 5.04C20.3318 4.73333 22.8618 4.58 25.1158 4.58C26.1584 4.58 26.9941 4.89433 27.6228 5.523C28.2514 6.15167 28.5658 6.98733 28.5658 8.03V17H25.0008L24.7708 15.85C24.0501 16.3253 23.3064 16.678 22.5398 16.908C21.7884 17.1227 21.1521 17.23 20.6308 17.23H19.8258C18.7831 17.23 17.9474 16.9157 17.3188 16.287C16.6901 15.6583 16.3758 14.8227 16.3758 13.78V12.745C16.3758 11.7023 16.6901 10.8667 17.3188 10.238C17.9474 9.60933 18.7831 9.295 19.8258 9.295H24.5408V8.375C24.5408 8.145 24.4641 7.95333 24.3108 7.8C24.1574 7.64667 23.9658 7.57 23.7358 7.57C22.7391 7.57 21.6351 7.616 20.4238 7.708C19.2278 7.8 18.2618 7.869 17.5258 7.915V5.04ZM30.6295 17V4.81H34.6545V13.895H37.2995V4.81H41.3245V13.895H43.9695V4.81H47.9945V17H30.6295ZM69.3908 4.81V17H65.3658V7.915H61.2258V17H57.2008V4.81H69.3908ZM78.4731 7.915C77.6604 7.915 76.7404 8.06833 75.7131 8.375V13.895H79.1631C79.7764 13.895 80.0831 13.5883 80.0831 12.975V8.72C80.0831 8.49 80.0064 8.29833 79.8531 8.145C79.6998 7.99167 79.5081 7.915 79.2781 7.915H78.4731ZM75.7131 17V20.91H71.6881V4.81H75.2531L75.4831 5.96C76.2038 5.48467 76.9398 5.13967 77.6911 4.925C78.4578 4.695 79.1018 4.58 79.6231 4.58H80.6581C81.7008 4.58 82.5364 4.89433 83.1651 5.523C83.7938 6.15167 84.1081 6.98733 84.1081 8.03V13.32C84.1081 14.47 83.7784 15.3747 83.1191 16.034C82.4751 16.678 81.5781 17 80.4281 17H75.7131ZM98.5954 13.55C98.5954 14.7 98.2657 15.6047 97.6064 16.264C96.9624 16.908 96.0654 17.23 94.9154 17.23H89.6254C88.4754 17.23 87.5707 16.908 86.9114 16.264C86.2674 15.6047 85.9454 14.7 85.9454 13.55V8.26C85.9454 7.11 86.2674 6.213 86.9114 5.569C87.5707 4.90967 88.4754 4.58 89.6254 4.58H94.9154C96.0654 4.58 96.9624 4.90967 97.6064 5.569C98.2657 6.213 98.5954 7.11 98.5954 8.26V13.55ZM94.5704 8.605C94.5704 7.99167 94.2637 7.685 93.6504 7.685H90.8904C90.2771 7.685 89.9704 7.99167 89.9704 8.605V13.205C89.9704 13.8183 90.2771 14.125 90.8904 14.125H93.6504C94.2637 14.125 94.5704 13.8183 94.5704 13.205V8.605ZM105.378 7.455C104.764 7.455 104.458 7.76167 104.458 8.375V9.64H108.368V8.375C108.368 7.76167 108.061 7.455 107.448 7.455H105.378ZM111.933 16.77C108.973 17.0767 106.29 17.23 103.883 17.23C102.84 17.23 102.004 16.9157 101.376 16.287C100.747 15.6583 100.433 14.8227 100.433 13.78V8.26C100.433 7.11 100.755 6.213 101.399 5.569C102.058 4.90967 102.963 4.58 104.113 4.58H108.713C109.863 4.58 110.76 4.90967 111.404 5.569C112.063 6.213 112.393 7.11 112.393 8.26V12.515H104.458V13.435C104.458 13.665 104.534 13.8567 104.688 14.01C104.841 14.1633 105.033 14.24 105.263 14.24C106.781 14.24 109.004 14.125 111.933 13.895V16.77ZM120.204 12.4H118.479V17H114.454V4.81H118.479V9.295H120.319L121.584 6.765C122.044 5.78367 122.764 5.11667 123.746 4.764C124.098 4.64133 124.436 4.58 124.758 4.58C125.279 4.58 125.754 4.61833 126.184 4.695L126.759 4.81V7.915H125.954C125.432 7.915 125.049 8.145 124.804 8.605L123.654 10.905L127.104 17H122.734L120.204 12.4ZM135.145 7.915V17H131.12V7.915H127.325V4.81H138.94V7.915H135.145Z" fill="white"/>
                                </svg>
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton size="large" onClick={() => setOpenMap(true)}>
                                <MapIcon style={{ color: 'white' }} />
                            </IconButton>
                            <More menuItems={menuItems}/>
                        </Toolbar>
                    </AppBar>
                </div>
                <div style={{minHeight: '100vh', height: '100%'}}>
                    <Box className={classes.contentAll} flexDirection="column" display='flex'>
                        <QContainer>
                            <Outlet context={{ user: user2, setOpenCreateProject, setOpenMap }} />
                        </QContainer>
                    </Box>
                </div>
                <div className={classes.bottomNavigation}>
                    <Paper elevation={2}>
                        <BottomNavigation showLabels value={bottomNavigationValue}>
                            <BottomNavigationAction label="Встречи" icon={<GroupsIcon />} onClick={() => navigate(`/`)} />
                            <BottomNavigationAction label="Проекты" icon={<RocketIcon />} onClick={() => navigate(`/projects`)} />
                            <BottomNavigationAction label="Задания" icon={<EmojiEventsIcon />} onClick={() => navigate(`/tasks`)} />
                            <BottomNavigationAction label="Ценности" icon={<AutoAwesomeIcon />} onClick={() => navigate(`/uniques`)} />
                        </BottomNavigation>
                    </Paper>
                </div>
            </Box>
            <Map open={openMap} onClose={() => setOpenMap(false)} />
            <CreateProject openCreateProject={openCreateProject} onClose={() => setOpenCreateProject(false)} />
            <CreateMeet openCreateMeet={openCreateMeet} onClose={() => setOpenCreateMeet(undefined)} />
            <Options openOptions={openOptions} onClose={() => setOpenOptions(false)} />
        </>
    )
};

export function useUser2() {
    return useOutletContext<ContextType>();
}