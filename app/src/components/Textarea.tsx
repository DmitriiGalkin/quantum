import React, {TextareaHTMLAttributes} from 'react';
import {useInputStyles} from "./helper";

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{
    label: string
    name: string
}
export function Textarea({ label, name, ...rest }: TextareaFieldProps) {
    const classes = useInputStyles();

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <textarea id={name} rows={3} className={classes.input} {...rest} />
        </div>
    );
}
