import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "./TransitionDialog";
import React from "react";
import {COLOR_PAPER} from "../tools/theme";

export const useInputStyles = makeStyles(() => ({
    input: {
        display: 'block',
        width: '100%',
        padding: '11px 12px 10px',
        fontFamily: 'inherit',
        color: '#212529',
        backgroundColor: COLOR_PAPER,
        backgroundClip: 'padding-box',
        border: 0,
        borderRadius: 8,
        //border: 'none !important',
        //borderColor: 'transparent !important',
    },
    timePicker: {
        display: 'block',
        width: '100%',
        padding: '4px 6px 4px',
        fontFamily: 'inherit',
        color: '#212529',
        backgroundColor: '#F5F5F5',
        backgroundClip: 'padding-box',
        borderRadius: 8,
    }
}));

export const withDialog = (WrappedComponent: any) => (props: any) => (
    <Dialog onClose={props.onClose} open={props.open} fullScreen TransitionComponent={TransitionDialog} style={{ backgroundColor: 'rgb(245,245,245)'}}>
        <WrappedComponent {...props} />
    </Dialog>
)
