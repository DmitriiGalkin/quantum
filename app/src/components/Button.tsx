import React from 'react';

interface Props {
    variant?: 'outlined'
    children: string | JSX.Element | JSX.Element[]
    onClick?: () => void
    href?: string
    color?: string
}
export function Button({ children, variant, onClick, href, color }: Props) {
    if (variant === 'outlined'){
        return (
            <a href={href} style={{ display: 'block', height:'100%', fontSize: 19, fontWeight: 500, padding: 15.5, color: '#7139FF', border: `1px solid ${color ? color : '#7139FF'}`, borderRadius: 16, textAlign: 'center', lineHeight: '22px' }} onClick={() => onClick && onClick()}>
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

        }} onClick={() => onClick && onClick()}>
            {children}
        </a>
    )
}
