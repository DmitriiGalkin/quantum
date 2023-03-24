import React from 'react';
import {Container, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '32px 32px 0 0',
    },
}));
interface QContainerProps {
    children?: React.ReactNode
}
export default function QContainer({children}: QContainerProps) {
    const classes = useStyles();

    return (
        <div className={classes.content}>
            <Container style={{ padding: '18px' }}>
                {children}
            </Container>
        </div>
    );
}