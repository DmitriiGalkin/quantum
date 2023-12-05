import React from 'react';
import {useNavigate} from "react-router-dom";
import {Header} from "./Header";

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
                        <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1L1 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                )}
            </div>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 20, letterSpacing: '-0.01em', lineHeight: '22px' }}>
                {title}
            </div>
            <div style={{ width: 12 }}>
                {isClose && (
                    <div onClick={onBackClick} style={{ display: 'flex' }}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L11 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M11 1L1 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                )}
            </div>
        </Header>
    );
}

export const DialogHeader = React.memo(DialogHeaderDefault);
