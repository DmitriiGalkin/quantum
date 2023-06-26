import React from 'react';
import {AppBar, Box, IconButton, Skeleton, Stack, TextField, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {TextFieldProps} from "@mui/material/TextField/TextField";

interface TextareaFieldProps {
    label: string
    value?: string
    name: string
    onChange: (e: any) => void
}
export function TextareaField({ label, value, name, onChange }: TextareaFieldProps) {
    return (
        <Stack spacing={2} direction="column">
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <textarea name="name" value={value} onChange={onChange} rows={3} style={{
                display: 'block',
                width: '100%',
                padding: '14px 15px',
                fontFamily: 'inherit',
                fontSize: '16px',
                fontWeight: '400',
                lineHeight: 1.5,
                color: '#212529',
                backgroundColor: '#F5F5F5',
                backgroundClip: 'padding-box',
                border: 0,
                borderRadius: 10
            }}/>
        </Stack>
    );
}

export default TextareaField;
