import React from 'react';

export function DialogContent({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ padding: '16px 18px', flex: '1 1 auto', overflowY: 'auto' }}>{children}</div>
    );
}

