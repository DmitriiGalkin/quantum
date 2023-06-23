import React from 'react';
import {AppBar, Box, IconButton, Skeleton, Stack, TextField, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TextFieldProps} from "@mui/material/TextField/TextField";

export function InputField({ label, ...props }: TextFieldProps) {
    return (
        <>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <TextField {...props} />
        </>
    );
}

export default InputField;
