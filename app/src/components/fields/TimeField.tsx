import React from 'react';
import {TimePicker} from "antd";
import dayjs, {Dayjs} from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";

const format = 'HH:mm';

interface TimeFieldProps {
    label: string
    onChange: (date: Dayjs | null) => void
}
export function TimeField({ label, onChange }: TimeFieldProps) {
    return (
        <>
            <div style={{ fontWeight: 900, fontSize: 18, color: '#070707' }}>
                {label}
            </div>
            <div>
                <TimePicker
                    defaultValue={dayjs('12:08', format)}
                    format={format} locale={locale}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    onChange={onChange}
                />
            </div>
        </>
    );
}

export default TimeField;
