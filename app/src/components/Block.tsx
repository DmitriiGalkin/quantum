import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import Typography from "./Typography";

interface BlockProps {
    title?: string
    children: ReactNode
}
export function Block({ title, children }: BlockProps) {
    return (
        <Stack spacing={2}>
            {title && <Typography variant="Header2">{title}</Typography>}
            {children}
        </Stack>
    );
}
