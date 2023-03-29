import React from 'react';

import {Box, Container, Paper, Theme} from "@mui/material";

import {Outlet} from "react-router-dom";
import QBottomNavigation from "../components/QBottomNavigation";
import {makeStyles} from "@mui/styles";
import MainAppBar from "../components/MainAppBar";

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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0
    },
}));

export default function MainView() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <div className={classes.appBar}><MainAppBar/></div>
            <div style={{minHeight: '100vh', height: '100%'}}>
                <Box className={classes.contentAll} flexDirection="column" display='flex'>
                    <Box p={3}>
                        <Container disableGutters>
                            <Outlet />
                        </Container>
                    </Box>
                </Box>
            </div>
            <div className={classes.bottomNavigation}>
                <Paper elevation={2}>
                    <QBottomNavigation/>
                </Paper>
            </div>
        </Box>
    );
}
