import React from 'react';

interface InputFieldProps {
    label: string
    value?: string
    name: string
    onChange: (e: any) => void
    placeholder?: string
}
export function Input({ label, value, name, onChange, placeholder }: InputFieldProps) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <input type="text" name={name} value={value || ''} onChange={onChange} placeholder={placeholder} style={{
                display: 'block',
                width: '100%',
                padding: '11px 12px 10px',
                fontFamily: 'inherit',
                color: '#212529',
                backgroundColor: '#F5F5F5',
                backgroundClip: 'padding-box',
                border: 0,
                borderRadius: 8,
            }}/>
        </div>
    );
}

export default Input;
