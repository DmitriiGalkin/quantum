import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {
    useAddMeet,
    useDeleteMeet,
    useEditMeet,
    useMeet,
} from "../tools/service";
import {Meet} from "../tools/dto";
import {Button, DatePicker, DialogHeader, Icon, TimePicker,} from "../components";
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
            <DialogContent style={{ flexGrow: 0, backgroundColor: 'white' }}>
                <Stack id="meetParams" spacing={5}>
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
                        </Stack>
                        <PriceField
                            price={{ user: meet.price }}
                            onChange={(price) => setMeet({...meet, price: price.user})}
                        />
                    </Stack>
            </DialogContent>
            <DialogContent style={{ flexGrow: 1 }}>
                <Stack spacing={3}>
                    <div>
                        <Block title="Участники встречи">
                            <Stack spacing={1} direction="column">
                                {meet.visits?.map((visit) => <VisitCard visit={visit} refetch={refetch} meet={meet} />)}
                            </Stack>
                        </Block>
                    </div>
                    <Button onClick={onDelete} variant="gray" icon={<Icon name="delete"/>}>Удалить встречу</Button>
                </Stack>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultMeet) === JSON.stringify(meet) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>{meet.id ? 'Сохранить' : "Создать встречу"}</Button>
            </div>
        </>
    );
}

export default withDialog(CreateMeet)

