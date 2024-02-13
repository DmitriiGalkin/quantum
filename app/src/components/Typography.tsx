import { makeStyles } from '@mui/styles'
import React, { CSSProperties } from 'react'

import { COLOR_BLACK, COLOR_PRIMARY } from '../tools/theme'

export const useStyles = makeStyles(() => ({
  span: ({ variant }: { variant?: Variant }) => {
    switch (variant) {
      case 'Header1':
        return {
          fontSize: 20,
          lineHeight: '28px',
          letterSpacing: '-0.01em',
          fontWeight: 900,
        }
      case 'Subheader1':
        return {
          fontSize: 14,
          opacity: 0.4,
          fontWeight: 400,
          lineHeight: '18px',
          letterSpacing: '0.36px',
        }
      case 'Header2':
        return {
          fontSize: 16,
          // opacity: .4,
          fontWeight: 700,
          lineHeight: '16px',
          letterSpacing: '0.36px',
        }
      case 'Header3':
        return {
          fontSize: 19,
          fontWeight: 600,
          lineHeight: '30px',
          letterSpacing: '0.193px',
        }
      case 'Body':
      default:
        return {
          fontSize: 13,
          // opacity: .6,
        }
      case 'Body-Bold':
        return {
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: -0.369231,
        }
      case 'Caption':
        return {
          fontSize: 9,
          opacity: 0.4,
          fontWeight: 500,
          letterSpacing: '0.18px',
        }
    }
  },
}))

type Variant = 'Header1' | 'Subheader1' | 'Header2' | 'Header3' | 'Body' | 'Body-Bold' | 'Caption'
interface TypographyProps {
  variant?: Variant
  color?: 'primary'
  children: React.ReactNode
  style?: CSSProperties
}
export function Typography({ variant, color, children, style }: TypographyProps): JSX.Element {
  const classes = useStyles({ variant })

  return (
    <span className={classes.span} style={{ color: color === 'primary' ? COLOR_PRIMARY : COLOR_BLACK, ...style }}>
      <>{children}</>
    </span>
  )
}

export default Typography
