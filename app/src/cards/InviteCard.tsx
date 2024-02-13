import { Chip, Stack } from '@mui/material'
import React from 'react'
import { useToggle } from 'usehooks-ts'

import { Button, Card } from '../components'
import { Parameter } from '../components/Parameter'
import Typography from '../components/Typography'
import ProjectPage from '../dialogs/Project'
import { Invite } from '../tools/dto'
import { useAcceptInvite, useDeleteInvite } from '../tools/service'

interface InviteCardProps {
  invite: Invite
  refetch: () => void
}

export function InviteCard({ invite, refetch }: InviteCardProps): JSX.Element {
  const [open, toggleOpen] = useToggle()
  const acceptInvite = useAcceptInvite()
  const deleteInvite = useDeleteInvite()
  const onAccept = () => invite.id && acceptInvite.mutateAsync(invite.id).then(refetch)
  const onDelete = () => invite.id && deleteInvite.mutateAsync(invite.id).then(refetch)

  return (
    <>
      <Card onClick={toggleOpen}>
        <Stack direction="row">
          {invite.project && (
            <div>
              <div
                style={{
                  borderRadius: '8px 0 0 8px',
                  height: '100%',
                  display: 'flex',
                  width: 60,
                  backgroundImage: `url(${invite.project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          )}
          <Stack spacing={2} direction="column" style={{ padding: 9, width: '100%' }}>
            <Stack spacing={1} style={{ flexGrow: 1 }}>
              {invite.project && <Typography variant="Header2">{invite.project.title}</Typography>}
              {invite.project?.place && (
                <Parameter variant="primary" name="place2" title={invite.project?.place.title} />
              )}
              <Stack direction="row" justifyContent="space-between" spacing={1}>
                {invite.accepted && <Chip label="Принято" color="success" size="small" />}
                {invite.deleted && <Chip label="Отклонено" color="error" size="small" />}
                {!(invite.deleted || invite.accepted) && (
                  <Stack direction="row" spacing={1} style={{ width: '100%', justifyContent: 'end' }}>
                    <Button
                      variant="small"
                      onClick={(e) => {
                        onDelete()
                        e.stopPropagation()
                      }}
                    >
                      Отклонить
                    </Button>
                    <Button
                      variant="small"
                      onClick={(e) => {
                        onAccept()
                        e.stopPropagation()
                      }}
                    >
                      Присоединиться
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Card>
      <ProjectPage projectId={invite.project?.id} open={open} onClose={toggleOpen} />
    </>
  )
}
