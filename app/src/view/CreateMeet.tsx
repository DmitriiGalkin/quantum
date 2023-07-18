import React from 'react';
import {Stack} from "@mui/material";
import {useAddMeet, useEditMeet, usePlaces} from "../tools/service";
import {Meet, Place} from "../tools/dto";
import {
    Button,
    DatePicker,
    DialogHeader,
    ImageField,
    Input,
    Textarea,
    TimePicker,
    TransitionDialog
} from "../components";
import {convertToMeetsGroupTime} from "../tools/date";
import {useLocalStorage, useToggle} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import {ImageSelect} from "../components";
import Dialog from "@mui/material/Dialog";
import Places from "./Places";

export interface CreateMeetDialogProps {
    meet: Meet
    refetch?: () => void
    onClose: () => void
    setMeet: (meet: Meet) => void
}
export default function CreateMeet({ onClose, meet, setMeet }: CreateMeetDialogProps) {
    const { data: places = [] } = usePlaces()
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)
    const [, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const onClickSave = () => {
        if (meet) {
            const meetWithTimezone = {...meet }
            if (meet.id) {
                editMeet.mutateAsync(meetWithTimezone).then(() => {
                    onClose()
                })
            } else {
                addMeet.mutateAsync(meetWithTimezone).then(() => {
                    setSelectedDate(convertToMeetsGroupTime(meet.datetime))
                    onClose()
                })
            }
        }
    };
    const title = meet.id ? 'Редактировать встречу' : 'Создание встречи'
    const saveButtonTitle = meet.id ? 'Сохранить' : "Создать встречу"
    const [findPlace, toggleFindPlace] = useToggle()

    return (
        <div>
            <DialogHeader title={title} onClick={onClose}/>
            <div style={{ padding: '16px 18px'}}>
                <Stack spacing={5}>
                    <Stack spacing={1} direction="row">
                        <div style={{ paddingRight: 8, flexGrow: 1, width: '100%' }}>
                            <Input
                                name='title'
                                label="Название"
                                value={meet?.title}
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
                    <DatePicker
                        value={meet.datetime}
                        onChange={(datetime) => setMeet({...meet, datetime })}
                    />
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
                    <ImageSelect<Place>
                        label="Место"
                        selected={places.find(p => p.latitude === meet.latitude && p.longitude === meet.longitude)}
                        items={places}
                        onChange={(place) => setMeet({ ...meet, latitude: place.latitude, longitude: place.longitude})}
                        onAdd={toggleFindPlace}
                    />
                    <Dialog onClose={toggleFindPlace} open={findPlace} fullScreen TransitionComponent={TransitionDialog}>
                        <Places onSuccess={(place) => {
                            setMeet({ ...meet, latitude: place.latitude, longitude: place.longitude})
                            toggleFindPlace()
                        }} onClose={toggleFindPlace}  />
                    </Dialog>
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