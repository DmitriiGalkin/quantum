import React from 'react';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {AppBar, IconButton, Skeleton, Toolbar, Typography} from "@mui/material";

interface BackProps {
    title?: string
    onClick?: () => void
}
export function Back({ title, onClick }: BackProps) {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton onClick={onClick} size="large" edge="start">
                    <BackIcon style={{ color: 'white' }}/>
                </IconButton>
                <Typography variant="h6" component="div" style={{ color: 'white' }}>
                    {title || <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
                </Typography>
            </Toolbar>
        </AppBar>

    );
}

export default React.memo(Back);
