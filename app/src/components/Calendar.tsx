import { Stack } from '@mui/material'
import React from 'react'

import { convertToDate } from '../tools/date'
import { Day } from '../tools/helper'
import { MemoizedCalendarDay } from './CalendarDay'

interface CalendarProps {
  days: Day[]
  value?: string
  onChange: (date: string) => void
}

export function Calendar({ value, days, onChange }: CalendarProps): JSX.Element {
  return (
    <Stack spacing={1} direction="row">
      {days
        .map((f) => ({ ...f, meets: undefined }))
        .map((day) => (
          <MemoizedCalendarDay
            key={day.datetime}
            {...day}
            onClick={onChange}
            active={value === convertToDate(day.datetime)}
          />
        ))}
    </Stack>
  )
}
