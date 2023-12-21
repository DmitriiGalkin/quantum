import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {
    useAddMeet,
    useDeleteMeet,
    useEditMeet,
    useMeet,
} from "../tools/service";
import {Meet} from "../tools/dto";
import {Button, DatePicker, DialogHeader, Icon, Input, TimePicker,} from "../components";
import {convertToMeetsGroupTime, getIsStart} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {PlaceSelect} from "../components/PlaceSelect";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {PriceField} from "../components/PriceField";
import {Block} from "../components/Block";
import {VisitCard} from "../cards/VisitCard";

export interface CreateMeetDialogProps {
    meetId: number
    defaultProjectId: number
    onClose: () => void
}
function CreateMeet({ meetId, defaultProjectId, onClose }: CreateMeetDialogProps) {
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    const [isSetTime, setIsSetTime] = useState(false)
    const [meet, setMeet] = useState<Partial<Meet>>({ datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'), projectId: defaultProjectId })
    const navigate = useNavigate();

    const { data: defaultMeet, refetch } = useMeet(meetId)
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)
    const deleteMeet = useDeleteMeet()

    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))


    useEffect(() => defaultMeet && setMeet(defaultMeet), [defaultMeet])
    const onChangePlace = useCallback((place: { latitude: string, longitude: string }) => setMeet({ ...meet, ...place}), [meet, setMeet])

    if (!meet) return null;

    const onClickSave = () => {
        if (meet.id) {
            editMeet.mutateAsync(meet) //.then(onClose)
        } else {
            addMeet.mutateAsync(meet).then(() => {
                setSelectedDate(convertToMeetsGroupTime(meet.datetime))
                onClose()
            })
        }
    };

    return (
        <>
            <DialogHeader title={meet.id ? 'Редактировать встречу' : 'Новая встреча'} onClick={onClose} isClose />
            <DialogContent>
                <Stack spacing={5}>
                    <Stack id="meetParams" spacing={5} style={{ backgroundColor: 'white', margin: '-16px -18px', padding: '16px 18px'}}>
                        <DatePicker
                            value={meet.datetime}
                            onChange={(datetime) => setMeet({ ...meet, datetime })}
                        />
                        <Stack spacing={1} direction="row">
                            <div style={{ width: 80 }}>
                                <TimePicker
                                    name='time'
                                    label="Время"
                                    value={isSetTime ? meet.datetime : undefined}
                                    onChange={(datetime) => {
                                        setMeet({ ...meet, datetime })
                                        setIsSetTime(true)
                                    }}
                                />
                            </div>
                            <div style={{ width: 80 }}>
                                <Input
                                    name='price'
                                    label="Продолжительность"
                                    value={meet.duration}
                                    onChange={(e) => setMeet({ ...meet, duration: e.target.value })}
                                />
                            </div>
                        </Stack>
                        <Input
                            name='price'
                            label="Стоимость"
                            value={meet.price}
                            onChange={(e) => setMeet({ ...meet, price: Number(e.target.value) })}
                        />
                    </Stack>
                    {meet.id && (
                        <Stack spacing={3}>
                            <Block title="Участники встречи">
                                <Stack spacing={1}>
                                    {meet.visits?.map((visit) => <VisitCard visit={visit} refetch={refetch} />)}
                                </Stack>
                            </Block>
                            <Button onClick={onDelete} variant="gray" icon={<Icon name="delete"/>}>Удалить встречу</Button>
                        </Stack>
                    )}
                </Stack>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultMeet) === JSON.stringify(meet) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>{meet.id ? 'Сохранить' : "Создать встречу"}</Button>
            </div>
        </>
    );
}

export default withDialog(CreateMeet)

