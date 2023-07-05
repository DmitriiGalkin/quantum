import {makeStyles} from "@mui/styles";

export const useInputStyles = makeStyles(() => ({
    input: {
        display: 'block',
        width: '100%',
        padding: '11px 12px 10px',
        fontFamily: 'inherit',
        color: '#212529',
        backgroundColor: '#F5F5F5',
        backgroundClip: 'padding-box',
        border: 0,
        borderRadius: 8,
    },
}));