import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {NewMeet, useAddMeet, useEditMeet} from "../modules/meet";
import {Place, usePlaces} from "../modules/place";
import Back from "./Back";
import Input from "./fields/Input";
import DatePicker from "./fields/DatePicker";
import TimePicker from "./fields/TimePicker";
import ImageField from "./fields/ImageField";
import Textarea from "./fields/Textarea";
import Button from "./Button";
import {Select} from "./fields/Select";

export interface CreateMeetDialogProps {
    newMeet?: NewMeet
    onClose: () => void;
}
export default function CreateMeetDialog({ onClose, newMeet }: CreateMeetDialogProps) {
    const [meet, setMeet] = useState<NewMeet>({ x: '55.933093', y: '37.054661'} as NewMeet)
    const { data: places = [] } = usePlaces()
    const addMeet = useAddMeet()
    const editMeet = useEditMeet()

    const onClickSave = () => {
        if (meet) {
            const meetWithTimezone = {...meet }
            if (meet.id) {
                editMeet.mutateAsync(meetWithTimezone).then(() => {
                    onClose()
                })
            } else {
                addMeet.mutateAsync(meetWithTimezone).then(() => {
                    onClose()
                })
            }
        }
    };

    useEffect(() => {
        if (newMeet) {
            console.log(newMeet, 'newMeet useEffect')
            setMeet(newMeet)
        }
    }, [newMeet])
    const title = meet.id ? 'Редактировать встречу' : 'Создание встречи'
    const saveButtonTitle = meet.id ? 'Сохранить' : "Создать встречу"
    return (
        <div>
            <Back title={title} onClick={onClose}/>
            <div style={{ padding: '16px 18px'}}>
                <Stack spacing={5}>
                    <DatePicker
                        value={meet.datetime}
                        onChange={(datetime) => setMeet({...meet, datetime })}
                    />
                    <Input
                        name='title'
                        label="Название встречи"
                        value={meet?.title}
                        onChange={(e) => setMeet({ ...meet, title: e.target.value})}
                        placeholder="Введите название встречи"
                    />
                    <Textarea
                        name='title'
                        label="Описание"
                        value={meet?.description}
                        onChange={(e) => setMeet({ ...meet, description: e.target.value})}
                        placeholder="Кратко опишите встречу"
                    />
                    <Select<Place>
                        label="Место"
                        selectedId={meet.placeId}
                        items={places}
                        onChange={(place) => setMeet({ ...meet, placeId: place.id})}
                    />
                    <Stack spacing={2}>
                        <TimePicker
                            label="Время"
                            value={meet.datetime}
                            onChange={(datetime) => setMeet({...meet, datetime })}
                        />
                    </Stack>
                    <ImageField
                        label="Загрузите обложку"
                        onChange={(image) => setMeet({...meet, image})}
                    />
                </Stack>
                <div style={{ paddingTop: 22 }}>
                    <Button onClick={onClickSave}>
                        {saveButtonTitle}
                    </Button>
                </div>
            </div>
        </div>
    );
}