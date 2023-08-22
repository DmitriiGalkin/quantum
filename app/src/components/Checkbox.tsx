import React from 'react';
import {TemporalAdjusters} from "@js-joda/core";

interface CheckboxProps {
    checked?: boolean
    onChange: (value: boolean) => void
}
function Checkbox({ checked, onChange }: CheckboxProps) {
    if (checked) {
        return (
            <div onClick={() => onChange(false)}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="20" height="20" rx="6" fill="#7139FF"/>
                    <path d="M9.12937 15.5932C9.51649 15.5932 9.84497 15.4055 10.0796 15.0536L15.4407 6.60717C15.5698 6.38428 15.7223 6.12619 15.7223 5.85637C15.7223 5.3402 15.253 5 14.7721 5C14.467 5 14.1738 5.17597 13.9509 5.5279L9.08244 13.3408L6.7714 10.3494C6.48986 9.97401 6.23177 9.86843 5.91503 9.86843C5.39886 9.86843 5 10.279 5 10.8069C5 11.0533 5.10558 11.3114 5.26982 11.5343L8.13222 15.0536C8.4255 15.4407 8.74224 15.5932 9.12937 15.5932Z" fill="white"/>
                </svg>
            </div>
        )
    }

    return (
        <div onClick={() => onChange(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="20" height="20" rx="6" fill="#7139FF"/>
            </svg>
        </div>
    );
}

export default Checkbox;
