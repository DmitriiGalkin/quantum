import React from 'react';
import BackIcon from '@mui/icons-material/ArrowBackIos';
import {AppBar, Box, IconButton, Skeleton, Stack, Toolbar, Typography} from "@mui/material";
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
        <Stack spacing={2} direction="row" justifyContent="space-between" style={{ width: '100%' }}>
            <div style={{ padding: '15px 12px', background: '#FFFFFF', borderRadius: '21.2px' }} onClick={onBackClick}>
                <svg width="28" height="23" viewBox="0 0 28 23" fill="none" xmlns="http://www.w3.org/2000/svg" style={{     display: 'block' }}>
                    <path d="M0 11.4292C0 11.8061 0.165859 12.1529 0.467421 12.4394L10.4793 22.4362C10.7808 22.7227 11.0975 22.8584 11.4593 22.8584C12.1982 22.8584 12.7862 22.3156 12.7862 21.5617C12.7862 21.1998 12.6505 20.8379 12.4093 20.6117L9.03177 17.1739L3.95046 12.545L7.59935 12.7711H26.6731C27.4572 12.7711 28 12.2132 28 11.4292C28 10.6451 27.4572 10.0872 26.6731 10.0872H7.59935L3.96554 10.3134L9.03177 5.68444L12.4093 2.24663C12.6505 2.00539 12.7862 1.65859 12.7862 1.29672C12.7862 0.542811 12.1982 0 11.4593 0C11.0975 0 10.7808 0.120625 10.4491 0.452343L0.467421 10.419C0.165859 10.7054 0 11.0522 0 11.4292Z" fill="black"/>
                </svg>
            </div>
            <div>
                <More menuItems={menuItems}/>
            </div>
        </Stack>

    );
}

export default React.memo(Back);
