import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import Typography from "./Typography";

interface BlockProps {
    title?: string
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'default'
}
export function Block({ title, children, variant = 'default' }: BlockProps) {
    if (variant === 'primary') {
        return (
            <Stack spacing={3} style={{ padding: 16, backgroundColor: 'white', borderRadius: '0 0 28px 28px' }}>
                {children}
            </Stack>
        )
    }
    if (variant === 'secondary') {
        return (
            <Stack spacing={3} style={{ padding: 16, backgroundColor: 'rgb(245, 245, 245)', height: '100%' }}>
                {children}
            </Stack>
        )
    }

    return (
        <Stack spacing={2}>
            {title && <Typography variant="Header2">{title}</Typography>}
            {children}
        </Stack>
    );
}
