import { Stack } from '@mui/material'
import React from 'react'

import { Calendar } from '.'
import { getWeek } from '../tools/helper'

interface DateFieldProps {
  label?: string
  value?: string
  onChange: (date: string) => void
}
export function DatePickerDefault({ label, value, onChange }: DateFieldProps): JSX.Element {
  const week = getWeek()
  return (
    <Stack spacing={2}>
      {label && <label htmlFor="calendar">{label}</label>}
      <Calendar value={value} days={week} onChange={onChange} />
    </Stack>
  )
}

export const DatePicker = DatePickerDefault
