import { Stack } from '@mui/material'
import React from 'react'

import { COLOR_LOW } from '../tools/theme'

interface HeaderProps {
  children: React.ReactNode
  isForPassport?: boolean
}
export function Header({ children, isForPassport }: HeaderProps): JSX.Element {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={{
        position: 'sticky',
        padding: '13px 18px',
        background: `linear-gradient(180deg, ${isForPassport ? '#805214' : COLOR_LOW} 0%, ${
          isForPassport ? '#805214' : '#FF8F28'
        } 100%)`,
        height: 54,
      }}
      spacing={1}
    >
      {children}
    </Stack>
  )
}
