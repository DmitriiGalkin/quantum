import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {
    useAddMeet,
    useDeleteMeet,
    useEditMeet,
    useMeet,
} from "../tools/service";
import {Meet} from "../tools/dto";
import {Button, DatePicker, DialogHeader, Icon, Input} from "../components";
import {convertToMeetsGroupTime, convertToMeetTime, getIsStart} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {VisitCard} from "../cards/VisitCard";

export interface MeetDialogProps {
    meetId: number
    defaultProjectId: number
    onClose: () => void
}
function MeetDialog({ meetId, defaultProjectId, onClose }: MeetDialogProps) {
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    const [meet, setMeet] = useState<Partial<Meet>>({ datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'), projectId: defaultProjectId })
    const navigate = useNavigate();

    const { data: defaultMeet, refetch } = useMeet(meetId)
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)
    const deleteMeet = useDeleteMeet()

    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))


    useEffect(() => defaultMeet && setMeet(defaultMeet), [defaultMeet])

    if (!meet) return null;

    const onClickSave = () => {
        if (meet.id) {
            editMeet.mutateAsync(meet).then(onClose)
        } else {
            addMeet.mutateAsync(meet).then(() => {
                setSelectedDate(convertToMeetsGroupTime(meet.datetime))
                onClose()
            })
        }
    };
    console.log(meet,'meet')

    const onChangeReactIosTimePicker = (timeValue: string) => {
        const date = timeValue.split(':');

        return (dayjs(meet.datetime)
            .startOf('date')
            .add(Number(date[0]), 'hour')
            .add(Number(date[1]), 'minute')
            .format('YYYY-MM-DD HH:mm:ss'))
    }

    return (
        <>
            <DialogHeader title="Встреча" onClick={onClose} isClose />
            <DialogContent>
                <Stack spacing={8}>
                    <Stack id="meetParams" spacing={5} style={{ backgroundColor: 'white', margin: '-16px -18px', padding: '16px 18px', borderRadius: '0 0 28px 28px'}}>
                        <DatePicker
                            value={meet.datetime}
                            onChange={(datetime) => setMeet({ ...meet, datetime })}
                        />
                        <Stack spacing={1} direction="row">
                            <Input
                                name='time'
                                label="Время"
                                type="time"
                                step={60}
                                value={convertToMeetTime(meet.datetime)}
                                min={'09:00'}
                                max={'16:00'}
                                onChange={(e) => setMeet({ ...meet, datetime: onChangeReactIosTimePicker(e.target.value) })}
                            />
                            <Input
                                name='price'
                                label="Длительность"
                                value={meet.duration}
                                onChange={(e) => setMeet({ ...meet, duration: e.target.value })}
                            />
                            <Input
                                name='price'
                                label="Стоимость"
                                value={meet.price}
                                onChange={(e) => setMeet({ ...meet, price: Number(e.target.value) })}
                            />
                        </Stack>
                    </Stack>
                    {meet.id && (
                        <div id="secondary">
                            <Stack spacing={3}>
                                <Block title="Участники встречи">
                                    <Stack spacing={1}>
                                        {meet.visits?.map((visit) => <VisitCard visit={visit} refetch={refetch} />)}
                                    </Stack>
                                </Block>
                                <Button onClick={onDelete} variant="gray" icon={<Icon name="delete"/>}>Удалить встречу</Button>
                            </Stack>
                        </div>
                    )}
                </Stack>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultMeet) === JSON.stringify(meet) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>{meet.id ? 'Сохранить' : "Создать"}</Button>
            </div>
        </>
    );
}

export default withDialog(MeetDialog)

