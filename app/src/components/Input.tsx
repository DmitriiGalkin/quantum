import React from 'react'

import { useInputStyles } from './helper'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
}
export function Input({ label, name, ...rest }: InputProps): React.ReactNode {
  const classes = useInputStyles()

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} className={classes.input} {...rest} />
    </div>
  )
}

export default Input
