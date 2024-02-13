import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

import { Calendar } from '.'
import { getWeek } from '../tools/helper'

interface DateFieldProps {
  label?: string
  value?: string
  onChange: (date: string) => void
}
export function DatePickerDefault({ label, value, onChange }: DateFieldProps): React.ReactNode {
  const data = dayjs(value)
  const selectedDate2 = data.format('YYYY-MM-DD')
  const week = getWeek(selectedDate2)

  const calendarPickerOnChange = (date: string) => {
    if (!date) return
    const hour = data.hour()
    const minute = data.minute()

    onChange(dayjs(date).startOf('day').add(hour, 'hour').add(minute, 'minute').format('YYYY-MM-DD HH:mm:ss'))
  }

  return (
    <Stack spacing={2}>
      {label && <label htmlFor="calendar">{label}</label>}
      <Calendar days={week} onChange={calendarPickerOnChange} />
    </Stack>
  )
}

export const DatePicker = DatePickerDefault
