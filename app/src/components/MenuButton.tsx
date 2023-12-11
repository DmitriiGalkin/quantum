import React from 'react';
import {Stack} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Icon, IconName} from "./Icon";

interface MenuButtonProps {
    title: string
    icon: JSX.Element
    onClick: () => void
    variant?: 'primary'
}
export function MenuButton({ title, icon, onClick, variant }: MenuButtonProps) {
    const style = variant === 'primary' ? ({ backgroundColor: 'rgba(217, 217, 217, 0.4)', padding: '13px 15px', borderRadius: 20, cursor: 'pointer' }) :
        ({ backgroundColor: 'rgba(217, 217, 217, 0.4)', padding: '6px 15px', borderRadius: 16, cursor: 'pointer' })
    return (
        <Stack key={title} spacing={3} direction="row" alignItems="center" style={style} onClick={onClick}>
            <div style={{ display: 'flex' }}>
                {icon}
            </div>
            <div style={{ flexGrow: 1, fontSize: 15, fontWeight: 500, lineHeight: '30px', letterSpacing: '0.15px' }}>{title}</div>
            <div style={{ display: 'flex' }}>
                <Icon name='right'/>
            </div>
        </Stack>
    );
}
