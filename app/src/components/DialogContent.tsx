import React from 'react';

export function DialogContent({ children, backgroundColor }: { children: React.ReactNode, backgroundColor?: string }) {
    return (
        <div style={{ padding: '16px 18px', flex: '1 1 auto', overflowY: 'auto', backgroundColor: backgroundColor ?? '#F5F5F5' }}>{children}</div>
    );
}

