import { Box, Skeleton, Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IdeaCard } from '../cards/IdeaCard'
import { Button } from '../components'
import AppBar from '../components/AppBar'
import { DialogContent } from '../components/DialogContent'
import { RecommendationIdeas } from '../components/RecommendationIdeas'
import Tabs from '../components/Tabs'
import { useAuth } from '../tools/auth'
import { useIdeas } from '../tools/service'
import { COLOR_PAPER } from '../tools/theme'

function Ideas() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: selfIdeas = [], refetch, isFetching } = useIdeas({ variant: 'self', userId: user?.id })

  return (
    <Box style={{ backgroundColor: COLOR_PAPER, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar isIdeasTab />
      <DialogContent>
        <Stack spacing={4} style={{ padding: 16 }}>
          <Stack spacing={3}>
            {!user && <img src="/forParent.svg" style={{ width: '100%' }} />}
            {user && isFetching && <Skeleton variant="rounded" height={94} />}
            {user && !isFetching && Boolean(selfIdeas.length) && (
              <Stack spacing={2}>
                {selfIdeas?.map((idea) => (
                  <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                ))}
              </Stack>
            )}
            <Button onClick={() => navigate('/idea')}>Воплотить идею</Button>
          </Stack>
          <RecommendationIdeas />
        </Stack>
      </DialogContent>
      <Tabs />
    </Box>
  )
}
export default Ideas
