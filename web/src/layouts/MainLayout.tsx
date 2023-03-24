import React from 'react';

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
import {makeStyles} from "@mui/styles";
import QAppBar from "../components/QAppBar";

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
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.spacing(4)} ${theme.spacing(4)} 0 0`,
    },
}));

export default function MainView() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <QAppBar/>
            <Box className={classes.contentAll} flexDirection="column" display='flex' sx={{ pb: 7 }}>
                <div className={classes.content}>
                    <Box p={3}>
                        <Container disableGutters>
                            <Outlet />
                        </Container>
                    </Box>
                </div>
            </Box>
        </Box>
    );
}
