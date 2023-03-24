import React from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import {Container, IconButton, Skeleton, Typography, Theme, AppBar, Toolbar} from "@mui/material";
import { makeStyles } from '@mui/styles';

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         display: 'flex',
//         justifyContent: 'space-between',
//         padding: '8px 16px',
//     },
//     menuButton: {
//         padding: 0,
//         marginRight: theme.spacing(2),
//     },
//     title: {
//         flexGrow: 1,
//         color: theme.palette.background.paper,
//     },
// }));

export function ForwardAppBar({ title, icon, onClick }: { title?: string, icon?: JSX.Element, onClick?: () => void }) {
//    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => window.history.back()}
                >
                    <ArrowBackIos/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div">
                    {title || <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
                </Typography>
                {icon && (
                    <IconButton onClick={onClick}>
                        {icon}
                    </IconButton>
                )}
            </Toolbar>
        </AppBar>

    );
}

export default React.memo(ForwardAppBar);
