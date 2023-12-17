import React from 'react';



export type IconName = 'date' | 'time' | 'place' | 'share' | 'passport' | 'visits' | 'request' | 'right' | 'delete' | 'close' | 'left' | 'place2' | 'left2' | 'dots' | 'leave' | 'ok' | 'burger'

}

export function Icon({ name, onClick }: IconProps) {
    const icon = getIcon(name)

    return <div style={{ display: 'flex' }} onClick={onClick}>{icon}</div>
}

interface IconProps {
    name?: IconName
    onClick?: () => void
}
export function Icon({ name, onClick }: IconProps) {
    const svg = getSvg(name)

    return (
        <div onClick={onClick}>{svg}</div>
    )

}
