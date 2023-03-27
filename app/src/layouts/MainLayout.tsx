import React from 'react';

import {Box, Container, Theme} from "@mui/material";

import {Outlet} from "react-router-dom";
import QBottomNavigation from "../components/QBottomNavigation";
import {makeStyles} from "@mui/styles";
import MainAppBar from "../components/MainAppBar";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        height: '100vh',
        borderRadius: `${theme.spacing(4)} ${theme.spacing(4)} 0 0`,
    },
    contentAll: {
        // height: '100%',
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function MainView() {
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <MainAppBar/>
            <Box className={classes.contentAll} flexDirection="column" display='flex'>
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
