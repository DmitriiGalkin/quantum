import { Avatar, Stack } from '@mui/material'
import React from 'react'

import { Card, Icon } from '../components'
import Typography from '../components/Typography'
import { Participation } from '../tools/dto'
import { useDeleteParticipation } from '../tools/service'

interface ParticipationCardProps {
  participation: Participation
  isOrganizer?: boolean
  refetch: () => void
  variant?: 'idea' | 'project'
}

export function ParticipationCard({ participation, isOrganizer, refetch }: ParticipationCardProps): React.ReactNode {
  const deleteParticipation = useDeleteParticipation()
  const onDeleteParticipation = () => deleteParticipation.mutateAsync(participation).then(() => refetch())

  return (
    <Card>
      <Stack direction="row" alignItems="center" alignContent="center" spacing={1} justifyContent="space-between">
        <Stack spacing={2} direction="row">
          <Avatar key={participation.user?.id} alt={participation.user?.title} src={participation.user?.image} />
          <span>
            <Typography variant="Body-Bold">{participation.user?.title}</Typography>
            <Typography variant="Body">, {participation.user?.age} лет</Typography>
          </span>
        </Stack>
        {isOrganizer && <Icon name="delete" onClick={onDeleteParticipation} />}
      </Stack>
    </Card>
  )
}
