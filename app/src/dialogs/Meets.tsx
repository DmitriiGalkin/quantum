import { LocalDate } from '@js-joda/core'
import { Stack } from '@mui/material'
import React, { useRef } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { useLocalStorage } from 'usehooks-ts'

import { MeetCard } from '../cards/MeetCard'
import { Calendar, DialogHeader } from '../components'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { getOm } from '../tools/helper'
import { useMeets } from '../tools/service'

export interface MeetsProps {
  onClose: () => void
  isForPassport?: boolean
}

function Meets({ onClose, isForPassport }: MeetsProps) {
  const { user } = useAuth()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const containerHeight = containerRef.current?.offsetHeight
  const { data: meets = [], refetch } = useMeets(user?.id, isForPassport)
  const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())
  const { index, days, meetsGroup } = getOm(meets, date, user?.id)

  return (
    <>
      <DialogHeader
        title={`Календарь ${isForPassport ? 'организатора' : 'участника'}`}
        onClick={onClose}
        isForPassport={isForPassport}
      />
      <DialogContent>
        <Stack spacing={3} style={{ height: '100%', padding: 16 }}>
          <Calendar days={days} onChange={setDate} />
          <div style={{ flex: '1 1 auto', overflowY: 'auto' }} ref={containerRef}>
            <SwipeableViews
              index={index}
              onChangeIndex={(index) => setDate(days[index].id)}
              containerStyle={{ height: containerHeight }}
              springConfig={{ duration: '0.2s', delay: '0s', easeFunction: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)' }}
              threshold={4}
            >
              {meetsGroup.map(({ id, meets }) => (
                <Stack key={id} spacing={2}>
                  {meets.map((meet) => (
                    <MeetCard key={meet.id} meet={meet} refetch={refetch} />
                  ))}
                </Stack>
              ))}
            </SwipeableViews>
          </div>
        </Stack>
      </DialogContent>
    </>
  )
}

export default withDialog(Meets)
