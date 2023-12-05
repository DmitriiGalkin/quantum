import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";

interface HeaderProps {
    children: ReactNode
}
export function Header({ children }: HeaderProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ position: 'sticky', padding: '14px 18px 14px 18px', background: 'linear-gradient(180deg, #FFB628 0%, #FF8F28 100%)', height: 54 }}
        >
            {children}
        </Stack>
    );
}
