import React from 'react'

import { BOX_SHADOW } from '../tools/theme'
import { Button } from './Button'

interface DialogFooterProps {
  onClick?: () => void
  children?: JSX.Element
  title?: string
}
export function DialogFooterDefault({ onClick, children, title }: DialogFooterProps): JSX.Element {
  return (
    <div style={{ padding: '13px 18px', backgroundColor: 'white', boxShadow: BOX_SHADOW, zIndex: 1 }}>
      {onClick && <Button onClick={onClick}>{title || 'Сохранить'}</Button>}
      {children}
    </div>
  )
}

export const DialogFooter = DialogFooterDefault
