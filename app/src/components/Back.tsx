import React from 'react';
import {Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {More} from "./More";

interface MenuItemProps {
    title: string,
    onClick: () => void
}
interface BackProps {
    onClick?: () => void
    menuItems?: MenuItemProps[]
}
export function Back({ onClick, menuItems }: BackProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    return (
        <Stack spacing={2} direction="row" justifyContent="space-between" style={{ width: '100%' }}>
            <div style={{ padding: '13px 10px 13px 12px', background: '#FFFFFF', borderRadius: 18 }} onClick={onBackClick}>
                <svg style={{ display: 'block' }} width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 8C0 8.26385 0.118471 8.5066 0.333872 8.70712L7.48519 15.7045C7.70059 15.905 7.92676 16 8.18524 16C8.71298 16 9.13301 15.6201 9.13301 15.0923C9.13301 14.8391 9.03608 14.5858 8.86376 14.4274L6.45127 12.0211L2.82176 8.781L5.42811 8.93931H19.0522C19.6123 8.93931 20 8.54881 20 8C20 7.45119 19.6123 7.06069 19.0522 7.06069H5.42811L2.83253 7.219L6.45127 3.97889L8.86376 1.57256C9.03608 1.40369 9.13301 1.16095 9.13301 0.907652C9.13301 0.379947 8.71298 0 8.18524 0C7.92676 0 7.70059 0.0844327 7.46365 0.316623L0.333872 7.29288C0.118471 7.4934 0 7.73615 0 8Z" fill="black"/>
                </svg>
            </div>
            <div>
                <More menuItems={menuItems}/>
            </div>
        </Stack>

    );
}
