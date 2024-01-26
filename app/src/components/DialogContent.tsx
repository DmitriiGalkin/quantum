import React, {CSSProperties} from 'react';

export function DialogContent({ children, backgroundColor, style }: { children: React.ReactNode, backgroundColor?: string, style?: CSSProperties }) {
    return (
        <div style={{ padding: 16, flex: '1 1 auto', overflowY: 'auto', backgroundColor: backgroundColor ?? 'rgb(245, 245, 245);', ...style }}>{children}</div>
    );
}

