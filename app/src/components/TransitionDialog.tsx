import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'

export const TransitionDialog = React.forwardRef(
  (
    props: TransitionProps & {
      children: React.ReactElement
    },
    ref: React.Ref<unknown>,
  ) => {
    return <Slide direction="left" ref={ref} {...props} children={props.children} />
  },
)
