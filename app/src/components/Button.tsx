import React from 'react';

interface Props {
    variant?: 'outlined'
    children: string | JSX.Element | JSX.Element[]
    onClick?: () => void
    href?: string
}
export function Button({ children, variant, onClick, href }: Props) {
    if (variant === 'outlined'){
        return (
            <a href={href} style={{ display: 'block', height:'100%', fontSize: 19, fontWeight: 500, padding: 13.5, color: '#7139FF', border: '1px solid #7139FF', borderRadius: 16, textAlign: 'center' }} onClick={() => onClick && onClick()}>
                {children}
            </a>
        )
    }

    return (
        <a href={href} style={{ display: 'block', height:'100%', backgroundColor: '#7139FF', fontSize: 19, fontWeight: 500, padding: 13.5, color: 'white', border: '1px solid #7139FF', borderRadius: 16, textAlign: 'center' }} onClick={() => onClick && onClick()}>
            {children}
        </a>
    )
}
