import { Stack } from '@mui/material'
import React from 'react'

import { Day } from '../tools/helper'
import { MemoizedCalendarDay } from './CalendarDay'

interface CalendarProps {
  days: Day[]
  onChange: (date: string) => void
}

export function Calendar({ days, onChange }: CalendarProps): JSX.Element {
  return (
    <Stack spacing={1} direction="row">
      {days
        .map((f) => ({ ...f, meets: undefined }))
        .map((day) => (
          <MemoizedCalendarDay key={day.id} {...day} onClick={onChange} />
        ))}
    </Stack>
  )
}
