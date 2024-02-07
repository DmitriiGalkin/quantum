import React, {ReactNode} from 'react';
import {Button} from "./Button";
import {BOX_SHADOW} from "../tools/theme";

interface DialogFooterProps {
    onClick?: () => void
    children?: ReactNode
}
export function DialogFooterDefault({ onClick, children }: DialogFooterProps) {
    return (
        <div style={{ padding: 15, backgroundColor: 'white', boxShadow: BOX_SHADOW, zIndex: 1 }} >
            {onClick && <Button onClick={onClick}>Сохранить</Button>}
            {children}
        </div>
    );
}

export const DialogFooter = DialogFooterDefault;
