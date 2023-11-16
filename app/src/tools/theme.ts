import {createTheme} from '@mui/material/styles';

export const DEFAULT_COLOR = 'white'
export const BOX_SHADOW = '0px 2px 1px -1px rgba(0,0,0,0.05), 0px 1px 1px 0px rgba(0,0,0,0.04), 0px 1px 3px 0px rgba(0,0,0,0.03)'
export const COLOR = "#FFA028"

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
            color: "#1B3B6B"
        },
    },
    spacing: 6,
    palette: {
        background: {
            default: "white",
        },
        primary: {
            main: '#FFA427',
            contrastText: '#674100',
        },
        secondary: {
            main: '#FFCE00',
            contrastText: '#674100',
        },
        success: {
            main: '#7139FF',
        },
        text: {
            primary: '#777777',
            secondary: '#A5A5A5',
            disabled: '#C1C1C1',
        },
    },
});

export default theme;