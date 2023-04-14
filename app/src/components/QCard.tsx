import React from 'react';
import {Box, Card, Paper} from "@mui/material";
import {DEFAULT_COLOR, SELECTED_COLOR} from "../tools/theme";

interface QCardProps {
    active?: boolean
    selected?: boolean
    onClick?: () => void
    onContextMenu?: (event: React.MouseEvent) => void
    children: React.ReactNode
}
export default function QCard({ onClick, active, selected, children, onContextMenu }: QCardProps) {
    const backgroundColor = selected ? SELECTED_COLOR : ( active ? DEFAULT_COLOR : undefined)
    return (
        <Card sx={{ display: 'flex', backgroundColor }} onClick={onClick} onContextMenu={onContextMenu}>
            {children}
        </Card>
    )
}
