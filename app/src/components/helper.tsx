import Dialog from '@mui/material/Dialog'
import { makeStyles } from '@mui/styles'
import React from 'react'

import { COLOR_PAPER } from '../tools/theme'
import { TransitionDialog } from './TransitionDialog'

export const useInputStyles = makeStyles(() => ({
  input: {
    display: 'block',
    width: '100%',
    padding: '11px 12px 10px',
    fontFamily: 'inherit',
    color: '#212529',
    backgroundColor: COLOR_PAPER,
    backgroundClip: 'padding-box',
    border: 0,
    borderRadius: 8,
  },
  timePicker: {
    display: 'block',
    width: '100%',
    padding: '4px 6px 4px',
    fontFamily: 'inherit',
    color: '#212529',
    backgroundColor: '#F5F5F5',
    backgroundClip: 'padding-box',
    borderRadius: 8,
  },
}))

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const withDialog = (WrappedComponent: any) => (props: any) => (
  <Dialog
    onClose={props.onClose}
    open={props.open}
    fullScreen
    TransitionComponent={TransitionDialog}
    style={{ backgroundColor: 'rgb(245,245,245)' }}
  >
    <WrappedComponent {...props} />
  </Dialog>
)
