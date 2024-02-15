import { Stack } from '@mui/material'
import React from 'react'

import { Color, Icon, IconName } from './Icon'
import Typography from './Typography'

interface ParameterProps {
  name: IconName
  title: string | number
  variant?: Color
}
export function Parameter({ title, name, variant }: ParameterProps): JSX.Element {
  return (
    <Stack spacing={1} direction="row" alignContent="center" alignItems="center">
      <Icon name={name} color={variant} />
      <Typography
        variant="Body"
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 160 }}
      >
        {title}
      </Typography>
    </Stack>
  )
}
