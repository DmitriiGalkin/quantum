import React from 'react';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {AppBar, Box, IconButton, Skeleton, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {More} from "./More";

interface MenuItemProps {
    title: string,
    onClick: () => void
}
interface BackProps {
    title?: string
    onClick?: () => void
    menuItems?: MenuItemProps[]
}
export function Back({ title, onClick, menuItems }: BackProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    return (
        <AppBar position="sticky">
            <Toolbar variant="dense">
                <IconButton onClick={onBackClick} size="large" edge="start">
                    <BackIcon style={{ color: 'white' }}/>
                </IconButton>
                <Typography variant="h6" component="div" style={{ color: 'white', fontWeight: 'bold' }}>
                    {title || <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <More menuItems={menuItems}/>
            </Toolbar>
        </AppBar>

    );
}

export default React.memo(Back);
