import React from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";
import {Icon} from "./Icon";
import Typography from "./Typography";
import {Stack} from "@mui/material";

interface DialogHeaderProps {
    title?: string
    onClick?: () => void
    isClose?: boolean
}
export function DialogHeaderDefault({ title, onClick, isClose }: DialogHeaderProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    return (
        <Header>
            {!isClose && <Icon name="left" onClick={onBackClick} />}
            <Typography variant="H5">{title}</Typography>
            {isClose && <Icon name="close" onClick={onBackClick} />}
        </Header>
    );
}

export const DialogHeader = React.memo(DialogHeaderDefault);
