import { Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { COLOR, COLOR_GRAY } from '../tools/theme'
import { DialogFooter } from './DialogFooter'
import { Icon } from './Icon'

export function Tabs({ isProjectsTab }: { isProjectsTab?: boolean }): React.ReactElement {
  const navigate = useNavigate()

  return (
    <DialogFooter>
      <Stack spacing={2} direction="row" justifyContent="space-evenly">
        <Stack spacing={2} direction="row" alignItems="center" onClick={() => navigate('/projects')}>
          <Icon name="project" color={isProjectsTab ? 'secondary' : 'gray'} />
          <span
            style={{
              fontSize: 9,
              fontWeight: 900,
              textTransform: 'uppercase',
              color: isProjectsTab ? COLOR : COLOR_GRAY,
            }}
          >
            Проекты
          </span>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center" onClick={() => navigate('/ideas')}>
          <Icon name="idea" color={!isProjectsTab ? 'secondary' : 'gray'} />
          <span
            style={{
              fontSize: 9,
              fontWeight: 900,
              textTransform: 'uppercase',
              color: !isProjectsTab ? COLOR : COLOR_GRAY,
            }}
          >
            Идеи
          </span>
        </Stack>
      </Stack>
    </DialogFooter>
  )
}

export default Tabs
