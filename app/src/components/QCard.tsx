import React from 'react';
import {Box} from "@mui/material";
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
        <Box>
            <div style={{ padding: '8px 16px', margin: '0 -18px 0 -18px', backgroundColor }} onClick={onClick} onContextMenu={onContextMenu}>
                {children}
            </div>
        </Box>
    )
}
