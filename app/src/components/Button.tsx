import React from 'react';
import {Theme, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Avatar, {genConfig} from 'react-nice-avatar'
import {User} from "../modules/user";
interface Props {
    variant?: 'outlined'
    children: string | JSX.Element | JSX.Element[]
    onClick: () => void
}
export default function Button({ children, variant, onClick }: Props) {
    if (variant === 'outlined'){
        return (
            <div style={{ fontSize: 24, fontWeight: 500, padding: 17, color: '#7139FF', border: '1px solid #7139FF', borderRadius: 20, textAlign: 'center' }} onClick={onClick}>
                {children}
            </div>
        )
    }

    return (
        <div style={{ backgroundColor: '#7139FF', fontSize: 24, fontWeight: 500, padding: 17, color: 'white', border: '1px solid #7139FF', borderRadius: 20, textAlign: 'center' }} onClick={onClick}>
            {children}
        </div>
    )
}
