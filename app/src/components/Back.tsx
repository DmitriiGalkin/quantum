import React from 'react';
import {AppBar, Box, IconButton, Skeleton, Stack, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface BackProps {
    title?: string
    onClick?: () => void
}
export function Back({ title, onClick }: BackProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    return (
        <Stack direction="row" justifyContent="space-between" style={{ position: 'sticky', padding: '15px 15px 14px 15px', background: 'linear-gradient(180deg, #FFB628 0%, #FF8F28 100%)' }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>
                {title || <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
            </div>
            <div onClick={onBackClick}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.214794 11.9002C-0.0674326 12.1824 -0.0757333 12.6639 0.214794 12.9461C0.505321 13.2283 0.986767 13.2283 1.26899 12.9461L6.58149 7.63362L11.894 12.9461C12.1762 13.2283 12.666 13.2366 12.9482 12.9461C13.2304 12.6556 13.2304 12.1824 12.9482 11.9002L7.63569 6.57942L12.9482 1.26692C13.2304 0.984691 13.2387 0.503246 12.9482 0.221019C12.6577 -0.0695081 12.1762 -0.0695081 11.894 0.221019L6.58149 5.53352L1.26899 0.221019C0.986767 -0.0695081 0.497021 -0.0778089 0.214794 0.221019C-0.0674326 0.511547 -0.0674326 0.984691 0.214794 1.26692L5.52729 6.57942L0.214794 11.9002Z" fill="white"/>
                </svg>
            </div>
        </Stack>
    );
}

export default React.memo(Back);
