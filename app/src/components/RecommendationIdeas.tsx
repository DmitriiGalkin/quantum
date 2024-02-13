import { Stack } from '@mui/material'
import React from 'react'

import { IdeaCard } from '../cards/IdeaCard'
import { useGeolocation } from '../tools/geolocation'
import { useIdeas } from '../tools/service'
import { Button } from './Button'
import Typography from './Typography'

interface RecommendationIdeasProps {
  toggleIdeasC: () => void
}
export function RecommendationIdeas({ toggleIdeasC }: RecommendationIdeasProps): JSX.Element {
  const { latitude, longitude } = useGeolocation()
  const { data: ideas = [], refetch } = useIdeas({
    type: 'recommendation',
    latitude,
    longitude,
  })

  return (
    <Stack spacing={2}>
      {Boolean(ideas.length) && (
        <>
          <Typography variant="Header2">Идеи для вдохновения</Typography>
          <Stack spacing={1}>
            {ideas?.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
            ))}
          </Stack>
        </>
      )}
      <Button onClick={toggleIdeasC} variant="outlined">
        Банк идеи
      </Button>
    </Stack>
  )
}
