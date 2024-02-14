import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import React, { useEffect, useState } from 'react'

import { VisitCard } from '../cards/VisitCard'
import { DatePicker, DialogFooter, DialogHeader, Input } from '../components'
import { Block } from '../components/Block'
import { DialogContent } from '../components/DialogContent'
import { withDialog } from '../components/helper'
import { convertToMeetTime, FORMAT } from '../tools/date'
import { Meet } from '../tools/dto'
import { useAddMeet, useDeleteMeet, useEditMeet, useMeet } from '../tools/service'

export interface EditMeetProps {
  meetId: number
  defaultProjectId: number
  onClose: () => void
}
function EditMeet({ meetId, defaultProjectId, onClose }: EditMeetProps) {
  const [meet, setMeet] = useState<Partial<Meet>>({
    datetime: dayjs().format(FORMAT),
    projectId: defaultProjectId,
  })

  const { data: defaultMeet, refetch, isFetching } = useMeet(meetId)
  const addMeet = useAddMeet()
  const editMeet = useEditMeet(meetId)
  const deleteMeet = useDeleteMeet()

  const onDelete = () => deleteMeet.mutateAsync(meet.id).then(onClose)

  useEffect(() => defaultMeet && setMeet(defaultMeet), [defaultMeet])

  if (!meet) return null

  const onClickSave = () => {
    if (meet.id) {
      editMeet.mutateAsync(meet).then(onClose)
    } else {
      addMeet.mutateAsync(meet).then(() => {
        onClose()
      })
    }
  }

  const onChangeReactIosTimePicker = (timeValue: string) => {
    const date = timeValue.split(':')

    return dayjs(meet.datetime)
      .startOf('date')
      .add(Number(date[0]), 'hour')
      .add(Number(date[1]), 'minute')
      .format(FORMAT)
  }

  return (
    <>
      <DialogHeader
        title="Встреча"
        onClick={onClose}
        menuItems={meet.id ? [{ title: 'Удалить', onClick: onDelete }] : undefined}
      />
      <DialogContent>
        <Block variant="primary">
          <DatePicker value={meet.datetime} onChange={(datetime) => setMeet({ ...meet, datetime })} />
          <Stack spacing={1} direction="row">
            <Input
              name="time"
              label="Время"
              type="time"
              step={60}
              value={convertToMeetTime(meet.datetime)}
              min="09:00"
              max="16:00"
              onChange={(e) => setMeet({ ...meet, datetime: onChangeReactIosTimePicker(e.target.value) })}
            />
            <Input
              name="price"
              label="Длительность"
              value={meet.duration}
              onChange={(e) => setMeet({ ...meet, duration: e.target.value })}
            />
            <Input
              type="number"
              name="price"
              label="Стоимость"
              value={meet.price}
              onChange={(e) => setMeet({ ...meet, price: Number(e.target.value) })}
            />
          </Stack>
        </Block>
        {meet.id && (
          <Block variant="secondary">
            <Stack spacing={3}>
              {Boolean(meet.visits?.length) && (
                <Block title="Участники встречи">
                  <Stack spacing={1}>
                    {meet.visits?.map((visit) => (
                      <VisitCard visit={visit} refetch={refetch} />
                    ))}
                  </Stack>
                </Block>
              )}
            </Stack>
          </Block>
        )}
      </DialogContent>
      {meet && JSON.stringify(defaultMeet) !== JSON.stringify(meet) && !isFetching && (
        <DialogFooter onClick={onClickSave} />
      )}
    </>
  )
}

export default withDialog(EditMeet)
