import {createTheme} from '@mui/material/styles';

export const SELECTED_COLOR = '#CDEBFC'
export const DEFAULT_COLOR = '#E1F1FA'

// A custom theme for this app
const theme = createTheme({
    typography: {
        fontFamily: 'Manrope, Arial',
        h4: {
            fontSize: 24,
            fontWeight: 700,
        },
        h5: {
            fontSize: 16,
            fontWeight: 700,
        },
        h6: {
            fontSize: 15,
            fontWeight: 500,
        },
        subtitle1: {
            fontSize: 14,
            fontWeight: 700,
        },
        body1: {
            fontSize: 14,
            fontWeight: 400,
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
        text: {
            primary: '#777777',
            secondary: '#A5A5A5',
            disabled: '#C1C1C1',
        },
    },
});

export default theme;