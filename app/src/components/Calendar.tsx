import React from 'react';
import {Stack} from "@mui/material";
import {CalendarDay} from "../tools/helper";

interface CalendarProps {
    week: CalendarDay[]
    onChange?: (date: string) => void
}

export default function Calendar ({ week, onChange }: CalendarProps): JSX.Element {

    return (
        <Stack spacing={1} direction="row" justifyContent="space-between">
            {week.map(({id, dayOfWeekValue, day, active, meetsLength}, index) =>
                <Stack spacing={3} direction="column" key={day} alignItems="center" onClick={() => {
                    onChange && onChange(id)
                }} style={{ width: '100%'}}>
                    <div style={{ fontSize: '11px', fontWeight: 500, color: 'black', opacity: active ? 0.8 : 0.4 }}>
                        {dayOfWeekValue}
                    </div>
                    <div style={{position: 'relative', paddingTop: '100%', width: '100%', borderRadius: 100, backgroundColor: active ? '#394F63' : '#ffffff', color: active ? '#ffffff' : '#394F63',
                        border: '1.18718px solid rgba(57, 79, 99, 0.1)', boxShadow: '0px 3.56154px 16.6205px rgba(0, 0, 0, 0.05)' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                            <div style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', width: '100%' }}>
                                <p style={{ textAlign: 'center', margin:0, fontSize: 16, fontWeight: 900 }}>{day}</p>
                            </div>
                        </div>
                        {Boolean(meetsLength) && (
                            <div style={{ position: 'absolute', top: -5, right: -3, width: 17, height: 17, borderRadius: 100, backgroundColor: 'orange', color: 'white' }}>
                                <div style={{ position: 'absolute', top: '50%', transform: 'translate(0, -50%)', width: '100%' }}>
                                    <p style={{ textAlign: 'center', margin:0, fontSize: 8, fontWeight: 900 }}>{meetsLength}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Stack>
            )}
        </Stack>
    )
}
