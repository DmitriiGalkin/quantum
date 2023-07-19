import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddMeet, useEditMeet, useMeet, usePlaces} from "../tools/service";
import {Meet, Place} from "../tools/dto";
import {
    Button,
    DatePicker,
    DialogHeader,
    ImageField,
    Input,
    Textarea,
    TimePicker,
} from "../components";
import {convertToMeetsGroupTime} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import {PlaceSelect} from "../components/PlaceSelect";

export interface CreateMeetDialogProps {
    onClose: () => void
}
export default function CreateMeet({ onClose }: CreateMeetDialogProps) {
    const { id: meetId } = useParams();
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const { data: defaultMeet } = useMeet(Number(meetId))
    const [meet, setMeet] = useState<Meet>({ id: 0, title: '', description:'', latitude: '55.933093', longitude: '37.054661', datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss')})
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)

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

    return (
        <div>
            <DialogHeader title={meet.id ? 'Редактировать встречу' : 'Создание встречи'} onClick={onClose}/>
            <div style={{ padding: '16px 18px'}}>
                <Stack spacing={5}>
                    <DatePicker
                        value={meet.datetime}
                        onChange={(datetime) => setMeet({...meet, datetime })}
                    />
                    <Stack spacing={1} direction="row">
                        <div style={{ paddingRight: 8, flexGrow: 1, width: '100%' }}>
                            <Input
                                name='title'
                                label="Название"
                                value={meet.title}
                                onChange={(e) => setMeet({ ...meet, title: e.target.value})}
                                placeholder="Введите название встречи"
                            />
                        </div>
                        <div style={{ width: 80 }}>
                            <TimePicker
                                name='time'
                                label="Время"
                                value={meet.datetime}
                                onChange={(datetime) => setMeet({...meet, datetime })}
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
                        label="Загрузите обложку"
                        value={meet.image}
                        onChange={(image) => setMeet({...meet, image})}
                    />
                    <PlaceSelect
                        onChange={(place) => setMeet({ ...meet, ...place})}
                        latitude={meet.latitude}
                        longitude={meet.longitude}
                    />
                </Stack>
                <div style={{ paddingTop: 22 }}>
                    <Button onClick={onClickSave}>
                        {meet.id ? 'Сохранить' : "Создать встречу"}
                    </Button>
                </div>
            </div>
        </div>
    );
}