import { Stack } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { IdeaCard } from '../cards/IdeaCard'
import { Button } from '../components'
import { DialogContent } from '../components/DialogContent'
import { RecommendationIdeas } from '../components/RecommendationIdeas'
import Tabs from '../components/Tabs'
import Typography from '../components/Typography'
import { useAuth } from '../tools/auth'
import { useIdeas } from '../tools/service'

function Ideas() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { data: selfIdeas = [], refetch } = useIdeas({ variant: 'self', userId: user?.id })

  return (
    <>
      <DialogContent>
        <Stack spacing={4} style={{ padding: 16 }}>
          {selfIdeas.length ? (
            <Stack spacing={2}>
              <Stack spacing={2}>
                <Typography variant="Header2">Мои идеи</Typography>
                <Stack spacing={2}>
                  {selfIdeas?.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                  ))}
                </Stack>
              </Stack>
              <Button onClick={() => navigate('/idea')}>Создать идею</Button>
            </Stack>
          ) : (
            <Stack spacing={3}>
              <img src="/forParent.svg" style={{ width: '100%' }} />
              <Button onClick={() => navigate('/idea')}>Создать идею проекта</Button>
            </Stack>
          )}
          <RecommendationIdeas />
        </Stack>
      </DialogContent>
      <Tabs />
    </>
  )
}
export default Ideas
