import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { useToggle } from 'usehooks-ts'

import { IdeaCard } from '../cards/IdeaCard'
import { DialogHeader } from '../components'
import { AgeField } from '../components/AgeField'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { IdeaFilter, useIdeas } from '../tools/service'

export interface IdeasProps {
  onClose: () => void
  ideaFilter?: IdeaFilter
}
function Ideas({ onClose, ideaFilter }: IdeasProps) {
  const [filter, setFilter] = useState<IdeaFilter | undefined>(ideaFilter)
  const { data, refetch } = useIdeas(filter)
  const [options, toggleOptions] = useToggle()

  return (
    <>
      <DialogHeader title="Банк идей" onClick={onClose} onClickOption={toggleOptions} />
      <DialogContent>
        {options && (
          <Block variant="primary">
            <AgeField
              ageFrom={filter?.ageFrom}
              ageTo={filter?.ageTo}
              onChange={({ ageFrom, ageTo }) => {
                setFilter({ ...filter, ageFrom, ageTo })
              }}
            />
          </Block>
        )}
        <Block variant="secondary">
          <Stack spacing={1}>
            {data?.map((idea) => (
              <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
            ))}
          </Stack>
        </Block>
      </DialogContent>
    </>
  )
}
export default withDialog(Ideas)
