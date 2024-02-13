import React, { ReactNode } from 'react'

interface CardProps {
  onClick?: () => void
  children: ReactNode
}

export function Card({ onClick, children }: CardProps): ReactNode {
  return (
    <div style={{ borderRadius: 8, backgroundColor: 'white', position: 'relative' }} onClick={onClick}>
      {children}
    </div>
  )
}
