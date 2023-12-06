import React from 'react';
import {Stack} from "@mui/material";

interface Props {
    variant?: 'outlined' | 'small' | 'small2'
    children: string | JSX.Element | JSX.Element[]
    onClick?: () => void
    href?: string
    color?: string
    disabled?: boolean
}
export function Button({ children, variant, onClick, href, color, disabled }: Props) {
    if (variant === 'small') {
        return (
            <div
                style={{ cursor: 'pointer', fontSize: 11, fontWeight: 500, padding: '3px 9px', color: '#7139FF', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}
                onClick={() => onClick && !disabled && onClick()}
            >
                {children}
            </div>
        )
    }
    if (variant === 'small2') {
        return (
            <div
                style={{ backgroundColor: '#7139FF', fontSize: 11, fontWeight: 500, padding: '3px 9px', color: 'white', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}
                onClick={() => onClick && !disabled && onClick()}
            >
                <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.8512 10C4.21225 10 4.5186 9.82301 4.72648 9.48009L9.73742 1.52655C9.85777 1.30531 10 1.06195 10 0.818584C10 0.320796 9.56236 0 9.10284 0C8.81838 0 8.54486 0.176991 8.34792 0.497788L3.80744 7.86504L1.64114 5.04425C1.3895 4.69027 1.13786 4.60177 0.842451 4.60177C0.36105 4.60177 0 4.98894 0 5.47566C0 5.71903 0.0875274 5.95133 0.251641 6.1615L2.91028 9.48009C3.19475 9.84513 3.47921 10 3.8512 10Z" fill="white"/>
                    </svg>
                    <span>{children}</span>
                </Stack>
            </div>
        )
    }

    if (variant === 'outlined'){
        return (
            <a href={href} style={{
                display: 'block',
                height:'100%',
                fontSize: 19,
                fontWeight: 500,
                padding: 15.5,
                color: '#7139FF',
                border: `1px solid ${color ? color : '#7139FF'}`,
                borderRadius: 16,
                textAlign: 'center',
                lineHeight: '22px',
                opacity: disabled ? 0.5 : 1
            }} onClick={() => onClick && !disabled && onClick()}>
                {children}
            </a>
        )
    }

    return (
        <a href={href} style={{
            display: 'block',
            height:'100%',
            backgroundColor: color ? color : '#7139FF',
            fontSize: 19,
            fontWeight: 500,
            padding: 15.5,
            color: 'white',
            border: `1px solid ${color ? color : '#7139FF'}`,
            borderRadius: 16,
            textAlign: 'center',
            lineHeight: '22px',
            boxShadow: color === 'black' ? '15px 0px 30px 0px rgba(211, 212, 226, 0.25)' : undefined,
            opacity: disabled ? 0.5 : 1,

        }} onClick={() => onClick && !disabled && onClick()}>
            {children}
        </a>
    )
}
