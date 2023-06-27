import React from 'react';
import {TimePicker as TimePickerAnt} from "antd";
import dayjs, {Dayjs} from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";

const format = 'HH:mm';

interface TimeFieldProps {
    label: string
    onChange: (date: Dayjs | null) => void
}
export function TimePicker({ label, onChange }: TimeFieldProps) {
    return (
        <div>
            <div style={{ fontWeight: 900, fontSize: 13, color: '#070707', letterSpacing: '0.01em' }}>
                {label}
            </div>
            <div style={{ paddingTop: 8 }}>
                <TimePickerAnt
                    defaultValue={dayjs('12:08', format)}
                    format={format} locale={locale}
                    getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
                    onChange={onChange}
                />
            </div>
        </div>
    );
}

export default TimePicker;
