import React from 'react';
import {Skeleton, Stack} from "@mui/material";
import {useNavigate} from "react-router-dom";

interface DialogHeaderProps {
    title?: string
    onClick?: () => void
}
export function DialogHeader({ title, onClick }: DialogHeaderProps) {
    const navigate = useNavigate();
    const onBackClick = onClick ? onClick : (() => (window.history.length - 1) ? window.history.back() : navigate('/'))

    return (
        <Stack direction="row" alignItems="center" justifyContent="space-between" style={{ position: 'sticky', padding: '14px 18px 14px 18px', background: 'linear-gradient(180deg, #FFB628 0%, #FF8F28 100%)' }}>
            <div style={{ color: 'white', fontWeight: 'bold', fontSize: 20, letterSpacing: '-0.01em', lineHeight: '22px' }}>
                {title || <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />}
            </div>
            <div onClick={onBackClick}>
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.163206 9.81321C-0.051237 10.0277 -0.0575441 10.3935 0.163206 10.6079C0.383956 10.8224 0.749771 10.8224 0.964214 10.6079L5.00079 6.57134L9.03736 10.6079C9.25181 10.8224 9.62393 10.8287 9.83837 10.6079C10.0528 10.3872 10.0528 10.0277 9.83837 9.81321L5.8018 5.77033L9.83837 1.73375C10.0528 1.51931 10.0591 1.1535 9.83837 0.939054C9.61762 0.718304 9.25181 0.718304 9.03736 0.939054L5.00079 4.97563L0.964214 0.939054C0.749771 0.718304 0.377649 0.711997 0.163206 0.939054C-0.051237 1.1598 -0.051237 1.51931 0.163206 1.73375L4.19978 5.77033L0.163206 9.81321Z" fill="white"/>
                </svg>
            </div>
        </Stack>
    );
}
