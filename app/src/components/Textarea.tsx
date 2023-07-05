import React from 'react';

interface TextareaFieldProps {
    label: string
    value?: string
    name: string
    onChange: (e: any) => void
    placeholder?: string
}
export function Textarea({ label, value, name, onChange, placeholder }: TextareaFieldProps) {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{
                display: 'block',
                width: '100%',
                padding: '11px 12px 10px',
                fontFamily: 'inherit',
                fontWeight: '400',
                color: '#212529',
                backgroundColor: '#F5F5F5',
                backgroundClip: 'padding-box',
                border: 0,
                borderRadius: 8,
            }}/>
        </div>
    );
}
