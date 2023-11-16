import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddMeet, useEditMeet, useMeet} from "../tools/service";
import {Meet} from "../tools/dto";
import {Button, DatePicker, DialogHeader, ImageField, Input, Textarea, TimePicker,} from "../components";
import {convertToMeetsGroupTime} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useParams} from "react-router-dom";
import {PlaceSelect} from "../components/PlaceSelect";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {ProjectSelect} from "../components/ProjectSelect";
import {PriceField} from "../components/PriceField";
import {AgeField} from "../components/AgeField";

export interface CreateMeetDialogProps {
    onClose: () => void
}
function CreateMeet({ onClose }: CreateMeetDialogProps) {
    const { id: meetId } = useParams();
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    const [isSetTime, setIsSetTime] = useState(false)
    const [meet, setMeet] = useState<Partial<Meet>>({ datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss') })

    const { data: defaultMeet } = useMeet(Number(meetId))
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)

    useEffect(() => defaultMeet && setMeet(defaultMeet), [defaultMeet])
    const onChangePlace = useCallback((place: { latitude: string, longitude: string }) => setMeet({ ...meet, ...place}), [meet, setMeet])

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
        <>
            <DialogHeader title={meet.id ? 'Редактировать встречу' : 'Новая встреча'} onClick={onClose} isClose />
            <DialogContent backgroundColor={'white'}>
                <Stack spacing={5}>
                    <DatePicker
                        value={meet.datetime}
                        onChange={(datetime) => setMeet({ ...meet, datetime })}
                    />
                    <Stack spacing={1} direction="row">
                        {/*<div style={{ paddingRight: 8, flexGrow: 1, width: '100%' }}>*/}
                        {/*    <Input*/}
                        {/*        name='title'*/}
                        {/*        label="Название"*/}
                        {/*        value={meet.title}*/}
                        {/*        onChange={(e) => setMeet({ ...meet, title: e.target.value})}*/}
                        {/*        placeholder="Введите название встречи"*/}
                        {/*        autoFocus*/}
                        {/*    />*/}
                        {/*</div>*/}
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
                    </Stack>
                    {/*<Textarea*/}
                    {/*    name='title'*/}
                    {/*    label="Описание"*/}
                    {/*    value={meet.description}*/}
                    {/*    onChange={(e) => setMeet({ ...meet, description: e.target.value})}*/}
                    {/*    placeholder="Кратко опишите встречу"*/}
                    {/*/>*/}
                    <PlaceSelect
                        onChange={onChangePlace}
                        latitude={meet.latitude}
                        longitude={meet.longitude}
                    />
                    <ProjectSelect
                        onChange={(project) => setMeet({ ...meet, project })}
                        projectId={meet.project?.id}
                    />
                    {/*<ImageField*/}
                    {/*    name="meetImage"*/}
                    {/*    label="Загрузите обложку"*/}
                    {/*    value={meet.image}*/}
                    {/*    onChange={(image) => setMeet({...meet, image})}*/}
                    {/*/>*/}
                    <PriceField
                        value={meet.price}
                        onChange={(price) => setMeet({...meet, price})}
                    />
                    {/*<AgeField*/}
                    {/*    ageFrom={meet.ageFrom}*/}
                    {/*    ageTo={meet.ageTo}*/}
                    {/*    onChange={({ ageFrom, ageTo }) => setMeet({...meet, ageFrom, ageTo})}*/}
                    {/*/>*/}
                </Stack>
            </DialogContent>
            <div style={{ padding: 15 }}>
                <Button onClick={onClickSave} disabled={!(meet.latitude && meet.longitude && meet.project?.title)}>
                    {meet.id ? 'Сохранить' : "Создать встречу"}
                </Button>
            </div>
        </>
    );
}

export default withDialog(CreateMeet)

