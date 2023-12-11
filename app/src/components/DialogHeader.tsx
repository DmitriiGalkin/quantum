import React from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";
import {Icon} from "./Icon";

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
            <div style={{ width: 12 }}>
                {!isClose && (
                    <div onClick={onBackClick} style={{ display: 'flex' }}>
                        <Icon name="left" />
                    </div>
                )}
            </div>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 20, letterSpacing: '-0.01em', lineHeight: '22px' }}>
                {title}
            </div>
            <div style={{ width: 12 }}>
                {isClose && (
                    <div onClick={onBackClick} style={{ display: 'flex' }}>
                        <Icon name="close" />
                    </div>
                )}
            </div>
        </Header>
    );
}

export const DialogHeader = React.memo(DialogHeaderDefault);
