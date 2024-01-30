import React, {ReactNode} from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";
import {Icon} from "./Icon";
import Typography from "./Typography";
import {Button} from "./Button";
import {Stack} from "@mui/material";

interface CardProps {
    onClick?: () => void
    children: ReactNode
}
export function CardDefault({ onClick, children }: CardProps) {
    return (
        <div style={{ borderRadius: 8, backgroundColor: 'white', position: 'relative' }} onClick={onClick}>
            {children}
        </div>
    );
}

export const Card = React.memo(CardDefault);
