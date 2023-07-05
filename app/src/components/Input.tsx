import React from 'react';
import {useInputStyles} from "./helper";

interface InputFieldProps {
    label: string
    value?: string
    name: string
    onChange: (e: any) => void
    placeholder?: string
}
export function Input({ label, value, name, onChange, placeholder }: InputFieldProps) {
    const classes = useInputStyles();

    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value || ''} onChange={onChange} placeholder={placeholder} className={classes.input} />
        </div>
    );
}

export default Input;
