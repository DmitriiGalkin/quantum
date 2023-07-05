import React from 'react';
import {Stack} from "@mui/material";
import {useAddMeet, useEditMeet} from "../tools/service";
import {Meet} from "../tools/dto";
import {DialogHeader, TimePicker, Input, DatePicker, ImageField, Textarea, Button} from "../components";
import {useNavigate} from "react-router-dom";
import {convertToMeetsGroupTime} from "../tools/date";

export interface CreateMeetDialogProps {
    meet: Meet
    refetch?: () => void
    onClose: () => void
    setMeet: (meet: Meet) => void
}
export default function CreateMeet({ onClose, meet, setMeet }: CreateMeetDialogProps) {
    const addMeet = useAddMeet()
    const editMeet = useEditMeet()
    const navigate = useNavigate();

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
                    navigate(`/?date=${convertToMeetsGroupTime(meet.datetime)}`)
                })
            }
        }
    };

    const title = meet.id ? 'Редактировать встречу' : 'Создание встречи'
    const saveButtonTitle = meet.id ? 'Сохранить' : "Создать встречу"
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