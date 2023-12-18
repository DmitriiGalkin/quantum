import React from 'react';
import {Stack} from "@mui/material";
import {Icon, IconName} from "./Icon";
import Typography from "./Typography";

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
            {variant === 'primary' ? <div style={{ borderRadius: 12, padding: '1px 2px', backgroundColor: '#7139FF'}}>{icon}</div> : icon}
            <Typography variant="Body-Bold">{title}</Typography>
            <Icon name='right'/>
        </Stack>
    );
}
