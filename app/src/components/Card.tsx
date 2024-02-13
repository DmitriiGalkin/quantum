import React from 'react'

interface CardProps {
  onClick?: () => void
  children: JSX.Element
}

export function Card({ onClick, children }: CardProps): JSX.Element {
  return (
    <div style={{ borderRadius: 8, backgroundColor: 'white', position: 'relative' }} onClick={onClick}>
      {children}
    </div>
  )
}
