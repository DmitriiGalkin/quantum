import React, {useCallback, useEffect, useState} from 'react';
import {DialogActions, Stack} from "@mui/material";
import {useAddMeet, useEditMeet, useMeet} from "../tools/service";
import {Meet} from "../tools/dto";
import {
    Button,
    DatePicker,
    DialogHeader,
    ImageField,
    Input,
    Textarea,
    TimePicker,
    TransitionDialog,
} from "../components";
import {convertToMeetsGroupTime} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import {PlaceSelect} from "../components/PlaceSelect";
import Dialog from "@mui/material/Dialog";
import {DialogContent} from "../components/DialogContent";

export interface CreateMeetDialogProps {
    open: boolean
    onClose: () => void
}
export default function CreateMeet({ open, onClose }: CreateMeetDialogProps) {
    const { id: meetId } = useParams();
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const { data: defaultMeet } = useMeet(Number(meetId))
    const [datetime, setDatetime] = useState<string>(dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'))
    const [meet, setMeet] = useState<Meet>({ id: 0, title: '', description:'', latitude: '55.933093', longitude: '37.054661', datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss')})
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)

    useEffect(() => defaultMeet && setMeet(defaultMeet), [defaultMeet])
    const onChangePlace = useCallback((place: { latitude: string, longitude: string }) => setMeet({ ...meet, ...place}), [meet, setMeet])

    if (!meet) return null;

    const onClickSave = () => {
        if (meet.id) {
            editMeet.mutateAsync({...meet, datetime}).then(onClose)
        } else {
            addMeet.mutateAsync({...meet, datetime}).then(() => {
                setSelectedDate(convertToMeetsGroupTime(datetime))
                onClose()
            })
        }
    };

    return (
        <Dialog onClose={onClose} open={open} fullScreen TransitionComponent={TransitionDialog}>
            <DialogHeader title={meet.id ? 'Редактировать встречу' : 'Создание встречи'} onClick={onClose} isClose />
            <DialogContent>
                <Stack spacing={5}>
                    <DatePicker
                        value={datetime}
                        onChange={setDatetime}
                    />
                    <Stack spacing={1} direction="row">
                        <div style={{ paddingRight: 8, flexGrow: 1, width: '100%' }}>
                            <Input
                                name='title'
                                label="Название"
                                value={meet.title}
                                onChange={(e) => setMeet({ ...meet, title: e.target.value})}
                                placeholder="Введите название встречи"
                                autoFocus
                            />
                        </div>
                        <div style={{ width: 80 }}>
                            <TimePicker
                                name='time'
                                label="Время"
                                value={datetime}
                                onChange={setDatetime}
                            />
                        </div>
                    </Stack>
                    <Textarea
                        name='title'
                        label="Описание"
                        value={meet.description}
                        onChange={(e) => setMeet({ ...meet, description: e.target.value})}
                        placeholder="Кратко опишите встречу"
                    />
                    <ImageField
                        name="meetImage"
                        label="Загрузите обложку"
                        value={meet.image}
                        onChange={(image) => setMeet({...meet, image})}
                    />
                    <PlaceSelect
                        onChange={onChangePlace}
                        latitude={meet.latitude}
                        longitude={meet.longitude}
                    />
                </Stack>
            </DialogContent>
            <div style={{ padding: 15 }}>
                <Button onClick={onClickSave}>
                    {meet.id ? 'Сохранить' : "Создать встречу"}
                </Button>
            </div>
        </Dialog>
    );
}