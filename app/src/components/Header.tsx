import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import {COLOR_LOW} from "../tools/theme";

interface HeaderProps {
    children: ReactNode
}
export function Header({ children }: HeaderProps) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            style={{ position: 'sticky', padding: '13px 18px', background: `linear-gradient(180deg, ${COLOR_LOW} 0%, #FF8F28 100%)`, height: 54 }}
            spacing={1}
        >
            {children}
        </Stack>
    );
}
