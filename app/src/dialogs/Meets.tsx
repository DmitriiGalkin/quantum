import { Stack } from '@mui/material'
import React, { useRef, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

import { MeetCard } from '../cards/MeetCard'
import { Calendar, DialogHeader } from '../components'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { useAuth } from '../tools/auth'
import { nowDate } from '../tools/date'
import { getWeek } from '../tools/helper'
import { useMeets } from '../tools/service'

export interface MeetsProps {
  onClose: () => void
  isForPassport?: boolean
}

function Meets({ onClose, isForPassport }: MeetsProps) {
  const { user } = useAuth()
  const [date, setDate] = useState(nowDate())
  const containerRef = useRef<HTMLDivElement | null>(null)
  const { data: meets = [], refetch } = useMeets(user?.id, isForPassport)
  const containerHeight = containerRef.current?.offsetHeight
  const days = getWeek(meets, user?.id)

  return (
    <>
      <DialogHeader
        title={`Календарь ${isForPassport ? 'организатора' : 'участника'}`}
        onClick={onClose}
        isForPassport={isForPassport}
      />
      <DialogContent>
        <Stack spacing={3} style={{ height: '100%', padding: 16 }}>
          <Calendar value={date} days={days} onChange={setDate} />
          <div style={{ flex: '1 1 auto', overflowY: 'auto' }} ref={containerRef}>
            <SwipeableViews
              index={days.findIndex((d) => d.datetime === date)}
              onChangeIndex={(index) => setDate(days[index].datetime)}
              containerStyle={{ height: containerHeight }}
              springConfig={{ duration: '0.2s', delay: '0s', easeFunction: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)' }}
              threshold={4}
            >
              {days.map(({ datetime, meets }) => (
                <Stack key={datetime} spacing={2}>
                  {meets?.map((meet) => (
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
