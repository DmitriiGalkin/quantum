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
            <div style={{ fontWeight: 900, fontSize: 13, color: '#070707', letterSpacing: '0.01em' }}>
                {label}
            </div>
            <div style={{ paddingTop: 8 }}>
                <textarea name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3} style={{
                    display: 'block',
                    width: '100%',
                    padding: '11px 12px 10px',
                    fontFamily: 'inherit',
                    fontSize: '13px',
                    fontWeight: '400',
                    lineHeight: '18px',
                    color: '#212529',
                    backgroundColor: '#F5F5F5',
                    backgroundClip: 'padding-box',
                    border: 0,
                    borderRadius: 8,
                    letterSpacing: '0.02em'
                }}/>
            </div>
        </div>
    );
}
