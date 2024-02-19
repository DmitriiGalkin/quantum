import React from 'react'

import { useInputStyles } from './helper'

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  name: string
}
export function Textarea({ label, name, ...rest }: TextareaFieldProps): JSX.Element {
  const classes = useInputStyles()

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <textarea id={name} rows={5} className={classes.input} {...rest} />
    </div>
  )
}
