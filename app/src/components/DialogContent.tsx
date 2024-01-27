import React from 'react';

interface DialogContentProps {
    children: React.ReactNode
}
export function DialogContent({ children }: DialogContentProps) {
    return (
        <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>{children}</div>
    );
}

