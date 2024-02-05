import React, {ReactNode} from 'react';
import {Button} from "./Button";

interface DialogFooterProps {
    onClick?: () => void
    children?: ReactNode
}
export function DialogFooterDefault({ onClick, children }: DialogFooterProps) {
    return (
        <div style={{ padding: 15, backgroundColor: 'white', boxShadow: '0 3px 5px black', zIndex: 1 }} >
            {onClick && <Button onClick={onClick}>Сохранить</Button>}
            {children}
        </div>
    );
}

export const DialogFooter = React.memo(DialogFooterDefault);
