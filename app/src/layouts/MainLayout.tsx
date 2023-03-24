import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentInd from '@mui/icons-material/AssignmentInd';

import {
    AppBar,
    Box, Container,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    Theme
} from "@mui/material";

import {Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../tools/hooks";
import QBottomNavigation from "../components/QBottomNavigation";
import {makeStyles} from "@mui/styles";
import MainAppBar from "../components/MainAppBar";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        // backgroundColor: theme.palette.background.paper,
        // borderRadius: `${theme.spacing(4)} ${theme.spacing(4)} 0 0`,
    },
    contentAll: {
        // height: '100%',
    },
    content: {
        flexGrow: 1,
        // backgroundColor: theme.palette.background.paper,
        // borderRadius: `${theme.spacing(4)} ${theme.spacing(4)} 0 0`,
    },
}));

export default function MainView() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <MainAppBar/>
            <Box className={classes.contentAll} flexDirection="column" display='flex' sx={{ pb: 7 }}>
                <img src="/img.png" alt="мальчик" style={{ width: '100%' }}/>
                <div className={classes.content}>
                    <Box p={3}>
                        <Container disableGutters>
                            <Outlet />
                        </Container>
                    </Box>
                </div>
            </Box>
            <QBottomNavigation/>
        </Box>
    );
}
