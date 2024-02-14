import { Stack } from '@mui/material'
import React from 'react'

import { VisitCard } from '../cards/VisitCard'
import { DialogHeader } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import Typography from '../components/Typography'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { getVisitGroups } from '../tools/helper'
import { useVisits } from '../tools/service'

export interface UserMeetsProps {
  onClose: () => void
}
function Visits({ onClose }: UserMeetsProps) {
  const { user } = useAuth()
  const { data, refetch } = useVisits(user?.id)
  const visitGroups = getVisitGroups(data)

  return (
    <>
      <DialogHeader title="Посещения" onClick={onClose} />
      <DialogContent>
        <Block variant="secondary">
          <Stack spacing={4}>
            {visitGroups.map((group) => (
              <Stack key={group.title} spacing={2}>
                <Typography variant="Header2">{group.title}</Typography>
                <Stack spacing={1}>
                  {group.visits?.map((visit) => (
                    <VisitCard key={visit.id} refetch={refetch} visit={visit} />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        </Block>
      </DialogContent>
    </>
  )
}
export default withDialog(Visits)
