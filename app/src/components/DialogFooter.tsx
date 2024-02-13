import React, { ReactNode } from 'react'

import { BOX_SHADOW } from '../tools/theme'
import { Button } from './Button'

interface DialogFooterProps {
  onClick?: () => void
  children?: ReactNode
}
export function DialogFooterDefault({ onClick, children }: DialogFooterProps): ReactNode {
  return (
    <div style={{ padding: 15, backgroundColor: 'white', boxShadow: BOX_SHADOW, zIndex: 1 }}>
      {onClick && <Button onClick={onClick}>Сохранить</Button>}
      {children}
    </div>
  )
}

export const DialogFooter = DialogFooterDefault
