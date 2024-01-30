import React from 'react';
import {Stack} from "@mui/material";
import {Icon} from "./Icon";
import Typography from "./Typography";

interface Props {
    variant?: 'outlined' | 'small' | 'small2' | 'gray' | 'menuButton'
    children?: string | JSX.Element | JSX.Element[]
    onClick?: (e: React.MouseEvent<HTMLElement>) => void
    href?: string
    color?: string
    disabled?: boolean
    icon?: JSX.Element
}
export function Button({ children, variant, onClick, href, color, disabled, icon }: Props) {
    if (variant === 'small') {
        return (
            <div
                style={{ cursor: 'pointer', fontSize: 11, fontWeight: 500, padding: '3px 9px', color: '#7139FF', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}
                onClick={(e) => onClick && !disabled && onClick(e)}
            >
                {children}
            </div>
        )
    }
    if (variant === 'small2') {
        return (
            <div
                style={{ backgroundColor: '#7139FF', fontSize: 11, fontWeight: 500, padding: '3px 9px', color: 'white', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}
                onClick={(e) => onClick && !disabled && onClick(e)}
            >
                <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                    <Icon name="ok"/>
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
            }} onClick={(e) => onClick && !disabled && onClick(e)}>
                {children}
            </a>
        )
    }

    if (variant === 'gray'){
        return (
            <Stack spacing={2} direction="row" onClick={(e) => onClick && !disabled && onClick(e)}  alignItems="center" justifyContent="center">
                {icon}
                <div style={{ color: 'black',
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: '23.7px',
                    letterSpacing: '0.15px', opacity: .4}}>
                    {children}
                </div>
            </Stack>
        )
    }

    if (variant === 'menuButton') {
        const style = color === 'primary' ? ({ backgroundColor: 'rgba(217, 217, 217, 0.4)', padding: '12px 13px', borderRadius: 20, cursor: 'pointer' }) :
            ({ backgroundColor: 'rgba(217, 217, 217, 0.4)', padding: '6px 13px', borderRadius: 16, cursor: 'pointer' })
        return (
            <Stack spacing={2} direction="row" alignItems="center" style={style} onClick={onClick}>
                {color === 'primary' ? <div style={{ borderRadius: 12, backgroundColor: '#7139FF'}}>{icon}</div> : icon}
                {children && <Typography variant="Body-Bold" style={{ flexGrow: 1 }}>{children}</Typography>}
                {children && <Icon name='right'/>}
            </Stack>
        );
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

        }} onClick={(e) => onClick && !disabled && onClick(e)}>
            {children}
        </a>
    )
}
