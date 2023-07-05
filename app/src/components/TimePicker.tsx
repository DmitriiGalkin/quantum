import React from 'react';
import {TimePicker as TimePickerAnt} from "antd";
import dayjs, {Dayjs} from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";

const format = 'HH:mm';

interface TimeFieldProps {
    label: string
    value?: string
    onChange: (date: string) => void
}
export function TimePicker({ label, value, onChange }: TimeFieldProps) {
    const data = dayjs(value)
    const timeOnChange = (date: Dayjs | null) => {
        if (!date) return
        onChange(data.startOf('date').add(date.hour(), 'hour').add(date.minute(), 'minute').format('YYYY-MM-DD HH:mm:ss'))
    }
    const v = dayjs(value)
    return (
        <div>
            <div style={{ fontWeight: 900, color: '#070707', letterSpacing: '0.01em' }}>
                {label}
            </div>
            <div style={{ paddingTop: 8 }}>
                <TimePickerAnt
                    value={v}
                    format={format}
                    locale={locale}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    onChange={timeOnChange}
                />
            </div>
        </div>
    );
}
