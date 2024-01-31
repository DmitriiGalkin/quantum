import React from 'react';
import {Button} from "./Button";

interface DialogFooterProps {
    onClick?: () => void
}
export function DialogFooterDefault({ onClick }: DialogFooterProps) {
    return (
        <div style={{ padding: 15 }} >
            <Button onClick={onClick}>Сохранить</Button>
        </div>
    );
}

export const DialogFooter = React.memo(DialogFooterDefault);
