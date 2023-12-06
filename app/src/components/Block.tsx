import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import Typography from "./Typography";
import {Parameters} from "./Parameters";

interface BlockProps {
    title: string
    children: ReactNode
}
export function Block({ title, children }: BlockProps) {
    return (
        <Stack spacing={2} flexDirection="column">
            <Typography variant="Header3">{title}</Typography>
            {children}
        </Stack>
    );
}
