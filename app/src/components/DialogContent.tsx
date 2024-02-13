import React from 'react'

interface DialogContentProps {
  children: React.ReactNode
}
export function DialogContent({ children }: DialogContentProps): JSX.Element {
  return <div style={{ flex: '1 1 auto', overflowY: 'auto' }}>{children}</div>
}
