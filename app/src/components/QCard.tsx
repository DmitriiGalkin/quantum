import React from 'react';
import {Box} from "@mui/material";
import {DEFAULT_COLOR, SELECTED_COLOR} from "../tools/theme";

interface QCardProps {
    active?: boolean
    selected?: boolean
    onClick?: () => void
    children: React.ReactNode
}
export default function QCard({ onClick, active, selected, children }: QCardProps) {
    const backgroundColor = selected ? SELECTED_COLOR : ( active ? DEFAULT_COLOR : undefined)

    return (
        <Box>
            <div style={{ padding: '8px 16px', margin: '0 -12px 0 -12px', backgroundColor }} onClick={onClick}>
                {children}
            </div>
        </Box>
    )
}
