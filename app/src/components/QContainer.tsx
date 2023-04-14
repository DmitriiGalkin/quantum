import React from 'react';
import {Container, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
    },
}));
interface QContainerProps {
    children?: React.ReactNode
}
export default function QContainer({children}: QContainerProps) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Container style={{ paddingTop: 12, paddingBottom: 12 }}>
                {children}
            </Container>
        </div>
    );
}