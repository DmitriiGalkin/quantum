import React from 'react';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import {AppBar, IconButton, Skeleton, Toolbar, Typography} from "@mui/material";

export function ForwardAppBar({ title, icon, onClick }: { title?: string, icon?: JSX.Element, onClick?: () => void }) {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={onClick}
                >
                    <ArrowBackIos style={{ color: 'white' }}/>
                </IconButton>
                <Typography variant="h6" color="inherit" component="div" style={{ color: 'white' }}>
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
