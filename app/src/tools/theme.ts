import { createTheme } from '@mui/material/styles'

export const COLOR_PAPER = '#F5F5F5'
export const DEFAULT_COLOR = 'white'
export const BOX_SHADOW =
  '0px 2px 1px -1px rgba(0,0,0,0.5), 0px 1px 1px 0px rgba(0,0,0,0.4), 0px 1px 3px 0px rgba(0,0,0,0.3)'
export const COLOR = '#FFA028'
export const COLOR_LOW = '#FFB628'
export const COLOR_PRIMARY = '#7139FF'
export const COLOR_DEFAULT = '#e1e1e1'
export const COLOR_BLACK = '#070707'
export const COLOR_GRAY = '#A5A5A5'
export const COLOR_PRICE = '#7ED6D8'

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 30,
      fontWeight: 400,
    },
    h4: {
      fontSize: 24,
      fontWeight: 700,
    },
    h5: {
      fontSize: 16,
      fontWeight: 700,
    },
    h6: {
      fontSize: 19,
      fontWeight: 500,
    },
    subtitle1: {
      fontSize: 14,
      fontWeight: 700,
    },
    body1: {
      fontSize: 13,
      lineHeight: '18px',
      fontWeight: 400,
      letterSpacing: '0.02em',
      color: '#070707',
    },
    allVariants: {
      color: '#1B3B6B',
    },
  },
  spacing: 6,
  palette: {
    background: {
      default: 'rgb(245,245,245)',
      paper: 'rgb(245,245,245)',
    },
    primary: {
      main: '#FFA427',
      contrastText: '#674100',
    },
    secondary: {
      main: '#FFCE00',
      contrastText: '#674100',
    },
    // success: {
    //     // main: '#00ff00',
    // },
    text: {
      primary: '#777777',
      secondary: '#A5A5A5',
      disabled: '#C1C1C1',
    },
  },
})

export default theme
