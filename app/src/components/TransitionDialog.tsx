import React from "react";
import {TransitionProps} from "@mui/material/transitions";
import {Slide} from "@mui/material";

export const TransitionDialog = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});