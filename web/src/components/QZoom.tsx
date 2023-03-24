import React from 'react';
import {Box, Theme, useTheme, Zoom} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    fabContainer: {
        position: 'absolute',
        top: 100,
        left: theme.spacing(2),
    },
}));
interface QContainerProps {
    children?: React.ReactNode
}
export default function QZoom({children}: QContainerProps) {
    const classes = useStyles();
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    return (
        <Zoom
            in={true}
            timeout={transitionDuration}
            style={{ transitionDelay: `${true ? transitionDuration.exit : 0}ms` }}
            unmountOnExit
        >
            <Box className={classes.fabContainer}>
                {children}
            </Box>
        </Zoom>
    );
}