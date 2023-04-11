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
                                <svg width="98" height="21" viewBox="0 0 98 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15.32 8.864C15.32 10.624 14.968 12.152 14.264 13.448C13.56 14.744 12.568 15.712 11.288 16.352L16.208 19.208L12.8 20.528L8.04798 17.168H7.68798C5.36798 17.168 3.51198 16.408 2.11998 14.888C0.727983 13.368 0.0319824 11.36 0.0319824 8.864C0.0319824 6.352 0.719982 4.336 2.09598 2.816C3.48798 1.296 5.34398 0.535995 7.66398 0.535995C10.016 0.535995 11.88 1.296 13.256 2.816C14.632 4.32 15.32 6.336 15.32 8.864ZM3.27198 8.864C3.27198 10.56 3.67198 11.904 4.47198 12.896C5.27198 13.888 6.34398 14.384 7.68798 14.384C9.04798 14.384 10.12 13.896 10.904 12.92C11.688 11.928 12.08 10.576 12.08 8.864C12.08 7.152 11.688 5.8 10.904 4.808C10.12 3.816 9.03998 3.32 7.66398 3.32C6.30398 3.32 5.23198 3.816 4.44798 4.808C3.66398 5.8 3.27198 7.152 3.27198 8.864Z" fill="white"/>
                                    <path d="M28.4844 17H25.5804V15.008C24.9404 16.416 23.6924 17.12 21.8364 17.12C20.6044 17.12 19.6444 16.768 18.9564 16.064C18.2684 15.36 17.9244 14.36 17.9244 13.064V4.832H20.8044V12.392C20.8044 13.16 20.9884 13.744 21.3564 14.144C21.7404 14.544 22.2604 14.744 22.9164 14.744C23.7484 14.744 24.3964 14.464 24.8604 13.904C25.3404 13.344 25.5804 12.496 25.5804 11.36V4.832H28.4844V17Z" fill="white"/>
                                    <path d="M35.7907 14.96C36.4307 14.96 36.9267 14.776 37.2787 14.408C37.6467 14.024 37.8307 13.528 37.8307 12.92V11.768H36.3427C35.5907 11.768 35.0147 11.928 34.6147 12.248C34.2147 12.552 34.0147 12.944 34.0147 13.424C34.0147 14.448 34.6067 14.96 35.7907 14.96ZM37.9507 15.536C37.3907 16.576 36.3347 17.096 34.7827 17.096C33.6307 17.096 32.7107 16.76 32.0227 16.088C31.3507 15.416 31.0147 14.568 31.0147 13.544C31.0147 12.392 31.4467 11.488 32.3107 10.832C33.1747 10.176 34.4227 9.848 36.0547 9.848H37.8307V9.104C37.8307 8.432 37.6547 7.92 37.3027 7.568C36.9507 7.216 36.3507 7.04 35.5027 7.04C34.2067 7.04 33.0147 7.4 31.9267 8.12V5.456C32.8387 4.896 34.1507 4.616 35.8627 4.616C39.1587 4.616 40.8067 6.152 40.8067 9.224V17H37.9507V15.536Z" fill="white"/>
                                    <path d="M54.3387 17H51.4587V9.512C51.4587 8.712 51.2667 8.112 50.8827 7.712C50.4987 7.296 49.9787 7.088 49.3227 7.088C48.5707 7.088 47.9387 7.384 47.4267 7.976C46.9147 8.552 46.6587 9.384 46.6587 10.472V17H43.7787V4.832H46.6587V6.92C47.3467 5.432 48.5947 4.688 50.4027 4.688C51.6187 4.688 52.5787 5.056 53.2827 5.792C53.9867 6.528 54.3387 7.568 54.3387 8.912V17Z" fill="white"/>
                                    <path d="M64.069 16.712C63.509 16.984 62.789 17.12 61.909 17.12C59.285 17.12 57.973 15.792 57.973 13.136V6.992H56.149V4.832H57.973V1.904H60.853V4.832H63.877V6.992H60.853V13.184C60.853 13.696 60.989 14.088 61.261 14.36C61.533 14.616 61.909 14.744 62.389 14.744C62.997 14.744 63.557 14.576 64.069 14.24V16.712Z" fill="white"/>
                                    <path d="M76.8828 17H73.9788V15.008C73.3388 16.416 72.0908 17.12 70.2348 17.12C69.0028 17.12 68.0428 16.768 67.3548 16.064C66.6668 15.36 66.3228 14.36 66.3228 13.064V4.832H69.2028V12.392C69.2028 13.16 69.3868 13.744 69.7548 14.144C70.1388 14.544 70.6588 14.744 71.3148 14.744C72.1468 14.744 72.7948 14.464 73.2588 13.904C73.7388 13.344 73.9788 12.496 73.9788 11.36V4.832H76.8828V17Z" fill="white"/>
                                    <path d="M97.2691 17H94.3651V9.536C94.3651 7.904 93.7411 7.088 92.4931 7.088C91.8691 7.088 91.3091 7.36 90.8131 7.904C90.3331 8.448 90.0931 9.304 90.0931 10.472V17H87.1891V9.536C87.1891 7.904 86.5651 7.088 85.3171 7.088C84.6931 7.088 84.1331 7.36 83.6371 7.904C83.1411 8.448 82.8931 9.304 82.8931 10.472V17H80.0131V4.832H82.8931V6.752C83.5811 5.376 84.7251 4.688 86.3251 4.688C88.1011 4.688 89.2531 5.456 89.7811 6.992C90.1011 6.256 90.5811 5.688 91.2211 5.288C91.8611 4.888 92.5891 4.688 93.4051 4.688C94.6371 4.688 95.5891 5.064 96.2611 5.816C96.9331 6.552 97.2691 7.608 97.2691 8.984V17Z" fill="white"/>
                                </svg>
                                {/*<svg width="139" height="21" viewBox="0 0 139 21" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
                                {/*    <path d="M14.41 17H10.27V10.445H4.52V17H0.38V0.899999H4.52V7.225H10.27V0.899999H14.41V17ZM21.7808 14.01C22.5934 14.01 23.5134 13.8567 24.5408 13.55V12.17H21.2058C20.9758 12.17 20.7841 12.2467 20.6308 12.4C20.4774 12.5533 20.4008 12.745 20.4008 12.975V13.205C20.4008 13.435 20.4774 13.6267 20.6308 13.78C20.7841 13.9333 20.9758 14.01 21.2058 14.01H21.7808ZM17.5258 5.04C20.3318 4.73333 22.8618 4.58 25.1158 4.58C26.1584 4.58 26.9941 4.89433 27.6228 5.523C28.2514 6.15167 28.5658 6.98733 28.5658 8.03V17H25.0008L24.7708 15.85C24.0501 16.3253 23.3064 16.678 22.5398 16.908C21.7884 17.1227 21.1521 17.23 20.6308 17.23H19.8258C18.7831 17.23 17.9474 16.9157 17.3188 16.287C16.6901 15.6583 16.3758 14.8227 16.3758 13.78V12.745C16.3758 11.7023 16.6901 10.8667 17.3188 10.238C17.9474 9.60933 18.7831 9.295 19.8258 9.295H24.5408V8.375C24.5408 8.145 24.4641 7.95333 24.3108 7.8C24.1574 7.64667 23.9658 7.57 23.7358 7.57C22.7391 7.57 21.6351 7.616 20.4238 7.708C19.2278 7.8 18.2618 7.869 17.5258 7.915V5.04ZM30.6295 17V4.81H34.6545V13.895H37.2995V4.81H41.3245V13.895H43.9695V4.81H47.9945V17H30.6295ZM69.3908 4.81V17H65.3658V7.915H61.2258V17H57.2008V4.81H69.3908ZM78.4731 7.915C77.6604 7.915 76.7404 8.06833 75.7131 8.375V13.895H79.1631C79.7764 13.895 80.0831 13.5883 80.0831 12.975V8.72C80.0831 8.49 80.0064 8.29833 79.8531 8.145C79.6998 7.99167 79.5081 7.915 79.2781 7.915H78.4731ZM75.7131 17V20.91H71.6881V4.81H75.2531L75.4831 5.96C76.2038 5.48467 76.9398 5.13967 77.6911 4.925C78.4578 4.695 79.1018 4.58 79.6231 4.58H80.6581C81.7008 4.58 82.5364 4.89433 83.1651 5.523C83.7938 6.15167 84.1081 6.98733 84.1081 8.03V13.32C84.1081 14.47 83.7784 15.3747 83.1191 16.034C82.4751 16.678 81.5781 17 80.4281 17H75.7131ZM98.5954 13.55C98.5954 14.7 98.2657 15.6047 97.6064 16.264C96.9624 16.908 96.0654 17.23 94.9154 17.23H89.6254C88.4754 17.23 87.5707 16.908 86.9114 16.264C86.2674 15.6047 85.9454 14.7 85.9454 13.55V8.26C85.9454 7.11 86.2674 6.213 86.9114 5.569C87.5707 4.90967 88.4754 4.58 89.6254 4.58H94.9154C96.0654 4.58 96.9624 4.90967 97.6064 5.569C98.2657 6.213 98.5954 7.11 98.5954 8.26V13.55ZM94.5704 8.605C94.5704 7.99167 94.2637 7.685 93.6504 7.685H90.8904C90.2771 7.685 89.9704 7.99167 89.9704 8.605V13.205C89.9704 13.8183 90.2771 14.125 90.8904 14.125H93.6504C94.2637 14.125 94.5704 13.8183 94.5704 13.205V8.605ZM105.378 7.455C104.764 7.455 104.458 7.76167 104.458 8.375V9.64H108.368V8.375C108.368 7.76167 108.061 7.455 107.448 7.455H105.378ZM111.933 16.77C108.973 17.0767 106.29 17.23 103.883 17.23C102.84 17.23 102.004 16.9157 101.376 16.287C100.747 15.6583 100.433 14.8227 100.433 13.78V8.26C100.433 7.11 100.755 6.213 101.399 5.569C102.058 4.90967 102.963 4.58 104.113 4.58H108.713C109.863 4.58 110.76 4.90967 111.404 5.569C112.063 6.213 112.393 7.11 112.393 8.26V12.515H104.458V13.435C104.458 13.665 104.534 13.8567 104.688 14.01C104.841 14.1633 105.033 14.24 105.263 14.24C106.781 14.24 109.004 14.125 111.933 13.895V16.77ZM120.204 12.4H118.479V17H114.454V4.81H118.479V9.295H120.319L121.584 6.765C122.044 5.78367 122.764 5.11667 123.746 4.764C124.098 4.64133 124.436 4.58 124.758 4.58C125.279 4.58 125.754 4.61833 126.184 4.695L126.759 4.81V7.915H125.954C125.432 7.915 125.049 8.145 124.804 8.605L123.654 10.905L127.104 17H122.734L120.204 12.4ZM135.145 7.915V17H131.12V7.915H127.325V4.81H138.94V7.915H135.145Z" fill="white"/>*/}
                                {/*</svg>*/}
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