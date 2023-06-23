import React, {useEffect, useState} from 'react';
import {Button, Stack} from "@mui/material";
import {NewMeet, useAddMeet, useEditMeet} from "../modules/meet";
import {useUserProjects} from "../modules/user";
import dayjs, {Dayjs} from "dayjs";
import {usePlaces} from "../modules/place";
import {useNavigate} from "react-router-dom";
import Back from "../components/Back";
import InputField from "../components/fields/InputField";
import ProjectField from "../components/fields/ProjectField";
import PlaceField from "../components/fields/PlaceField";
import DateField from "../components/fields/DateField";
import TimeField from "../components/fields/TimeField";

export function valuetext(value: number) {
    return `${value}°C2222`;
}
function toHoursAndMinutes(totalMinutes: number) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
}
export function valuetext2(value: number) {
    const {hours, minutes} = toHoursAndMinutes(value)
    return `${hours}:${minutes === 0 ? '00' : minutes}`;
}

export const getProjectDefaultDatetime = (): [string, string] => {
    const datetime = dayjs(dayjs().format('YYYY-MM-DD')).hour(10).format('YYYY-MM-DDTHH:mm:ss')
    const endDatetime = dayjs(dayjs().format('YYYY-MM-DD')).hour(11).format('YYYY-MM-DDTHH:mm:ss')

    return [datetime, endDatetime]
}

export interface CreateMeetDialogProps {
    newMeet?: NewMeet
    onClose: () => void;
}
export default function CreateMeetDialog({ onClose, newMeet }: CreateMeetDialogProps) {
    const [meet, setMeet] = useState<NewMeet>({} as NewMeet)
    const { data: places = [] } = usePlaces()
    const navigate = useNavigate();

    const addMeet = useAddMeet()
    const editMeet = useEditMeet()

    const { data: projects = [] } = useUserProjects()

    const onClickSave = () => {
        if (meet) {
            const meetWithTimezone = {...meet }
            if (meet.id) {
                editMeet.mutateAsync(meetWithTimezone).then(() => {
                    navigate(`/project/${meet.projectId}`)
                })
            } else {
                addMeet.mutateAsync(meetWithTimezone).then(() => {
                    navigate(`/project/${meet.projectId}`)
                })
            }
            onClose()
        }
    };

    const calendarPickerOnChange = (date: Dayjs | null) => {
        if (!date) return
        setMeet({
            ...meet,
            datetime: date.startOf('day').add(dayjs(meet?.datetime).hour(), 'hour').add(dayjs(meet?.datetime).minute(), 'minute').format('YYYY-MM-DDTHH:mm:ss'),
        } as NewMeet)
    }
    const timeOnChange = (date: Dayjs | null) => {
        if (!date) return
        setMeet({
            ...meet,
            datetime: dayjs(meet?.datetime).startOf('day').add(date.hour(), 'hour').add(date.minute(), 'minute').format('YYYY-MM-DDTHH:mm:ss'),
        } as NewMeet)
    }

    useEffect(() => {
        newMeet && setMeet(newMeet)
    }, [newMeet])
    const title = meet.id ? 'Редактировать встречу' : 'Создание встречи'

    return (
        <div>
            <Back title={title} onClick={onClose}/>
            <div style={{ padding: '25px 22px'}}>
                <Stack spacing={4}>
                    <InputField
                        name='title'
                        label="Название встречи"
                        variant="standard"
                        fullWidth
                        value={meet?.title}
                        onChange={(e) => setMeet({ ...meet, title: e.target.value})}
                    />
                    <InputField
                        name='title'
                        label="Описание"
                        variant="standard"
                        fullWidth
                        value={meet?.title}
                        onChange={(e) => setMeet({ ...meet, title: e.target.value})}
                    />
                    <ProjectField
                        label="Проект"
                        selectedProjectId={meet.projectId}
                        projects={projects}
                        onChange={(project) => setMeet({ ...meet, projectId: project.id})}
                    />
                    <PlaceField
                        label="Место"
                        selectedPlaceId={meet.placeId}
                        places={places}
                        onChange={(place) => setMeet({ ...meet, placeId: place.id})}
                    />
                    <DateField
                        label="Дата"
                        selectedDate={meet.datetime}
                        onChange={(datetime) => calendarPickerOnChange(dayjs(datetime))}
                    />
                    <Stack spacing={2}>
                        <TimeField
                            label="Время"
                            onChange={(datetime) => timeOnChange(datetime)}
                        />
                    </Stack>
                </Stack>
                <div>
                    <Button
                        onClick={onClickSave}
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                    >
                        Создать
                    </Button>
                </div>
            </div>
        </div>
    );
}