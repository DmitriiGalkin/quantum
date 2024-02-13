import { Stack } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import React from 'react'

import { Icon, IconName } from './Icon'
import Typography from './Typography'

export interface Parameter {
  name: IconName
  title: string
  value?: JSX.Element
}
interface ParametersProps {
  items: Parameter[]
}
export function Parameters({ items }: ParametersProps): JSX.Element {
  return (
    <div>
      {items.map(({ name, title, value }) => (
        <Grid container key={title} spacing={2} alignItems="center">
          <Grid xs={5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Icon name={name} />
              <Typography variant="Body-Bold">{title}</Typography>
            </Stack>
          </Grid>
          <Grid xs={7}>
            <Typography variant="Body">{value}</Typography>
          </Grid>
        </Grid>
      ))}
    </div>
  )
}
