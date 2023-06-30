import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {NewMeet, useAddMeet, useEditMeet} from "../modules/meet";
import {useUserProjects} from "../modules/user";
import dayjs, {Dayjs} from "dayjs";
import {Place, usePlaces} from "../modules/place";
import Back from "./Back";
import Input from "./fields/Input";
import DatePicker from "./fields/DatePicker";
import TimePicker from "./fields/TimePicker";
import ImageField from "./fields/ImageField";
import Textarea from "./fields/Textarea";
import Button from "./Button";
import {Select} from "./fields/Select";
import {Project} from "../modules/project";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "./TransitionDialog";
import CreateProject from "./CreateProject";
import {convertToMeetTime} from "../tools/date";

export interface CreateMeetDialogProps {
    newMeet?: NewMeet
    onClose: () => void;
}
export default function CreateMeetDialog({ onClose, newMeet }: CreateMeetDialogProps) {
    const [meet, setMeet] = useState<NewMeet>({} as NewMeet)
    const { data: places = [] } = usePlaces()

    const addMeet = useAddMeet()
    const editMeet = useEditMeet()
    const [newProject, setNewProject] = useState(false)

    const { data: projects = [], refetch } = useUserProjects()

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
    const time = convertToMeetTime(meet.datetime)

    useEffect(() => {
        newMeet && setMeet(newMeet)
    }, [newMeet])
    const title = meet.id ? 'Редактировать встречу' : 'Создание встречи'
    const saveButtonTitle = meet.id ? 'Сохранить' : "Создать встречу"

    return (
        <div>
            <Back title={title} onClick={onClose}/>
            <div style={{ padding: '16px 18px'}}>
                <Stack spacing={5}>
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
                    <Select<Project>
                        label="Проект"
                        selectedId={meet.projectId}
                        items={projects}
                        onChange={(project) => setMeet({ ...meet, projectId: project.id})}
                        onAdd={()=>setNewProject(true)}
                    />
                    <Select<Place>
                        label="Место"
                        selectedId={meet.placeId}
                        items={places}
                        onChange={(place) => setMeet({ ...meet, placeId: place.id})}
                        onAdd={()=>setNewProject(true)}
                    />
                    <DatePicker
                        label="Дата"
                        selectedDate={meet.datetime}
                        onChange={(datetime) => calendarPickerOnChange(dayjs(datetime))}
                    />
                    <Stack spacing={2}>
                        <TimePicker
                            label="Время"
                            value={time}
                            onChange={(datetime) => timeOnChange(datetime)}
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
            <Dialog onClose={() => setNewProject(false)} open={newProject} fullScreen TransitionComponent={TransitionDialog}>
                {newProject && (<CreateProject onClose={() => {
                    setNewProject(false)
                    refetch()
                }} close />)}
            </Dialog>
        </div>
    );
}