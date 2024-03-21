import React from 'react'

import { useInputStyles } from './helper'
import {Icon, IconName} from "./Icon";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  iconName?: IconName
}
export function Input({ label, name, iconName, ...rest }: InputProps): JSX.Element {
  const classes = useInputStyles()

  return (
    <div style={{ position: 'relative'}}>
      {label && <label htmlFor={name}>{label}</label>}
      <input id={name} className={classes.input} {...rest} />
      {iconName && <div style={{ position: "absolute", right: 0, top: 5 }}><Icon color="white" name="like"/></div> }
    </div>
  )
}

export default Input
