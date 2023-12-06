import React, {useCallback, useEffect, useState} from 'react';
import {Avatar, Stack} from "@mui/material";
import {
    useAddMeet,
    useDeleteMeet,
    useDeleteVisit,
    useEditMeet,
    useMeet,
    usePaidedVisit,
    useStartedVisit,
    useStoppedVisit
} from "../tools/service";
import {Meet, Visit} from "../tools/dto";
import {Button, DatePicker, DialogHeader, TimePicker,} from "../components";
import {convertToMeetsGroupTime} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {PlaceSelect} from "../components/PlaceSelect";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {PriceField} from "../components/PriceField";
import {Block} from "../components/Block";
import Typography from "../components/Typography";

export interface CreateMeetDialogProps {
    meetId: number
    onClose: () => void
}
function CreateMeet({ meetId, onClose }: CreateMeetDialogProps) {
    const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    const [isSetTime, setIsSetTime] = useState(false)
    const [meet, setMeet] = useState<Partial<Meet>>({ datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss') })
    const navigate = useNavigate();

    const { data: defaultMeet, refetch } = useMeet(meetId)
    const addMeet = useAddMeet()
    const editMeet = useEditMeet(meet.id)
    const deleteMeet = useDeleteMeet()

    const startedVisit = useStartedVisit()
    const stoppedVisit= useStoppedVisit()
    const paidedVisit = usePaidedVisit()
    const deleteVisit = useDeleteVisit()
    const onStarted = (visit: Visit) => startedVisit.mutateAsync(visit).then(() => refetch())
    const onStopped =  (visit: Visit) => stoppedVisit.mutateAsync(visit).then(() => refetch())
    const onPaided =  (visit: Visit) => paidedVisit.mutateAsync(visit).then(() => refetch())
    const onDeleteVisit =  (visit: Visit) => deleteVisit.mutateAsync(visit).then(() => refetch())

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
            <DialogContent backgroundColor={'white'}>
                <Stack spacing={5}>
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
                    <PlaceSelect
                        onChange={onChangePlace}
                        latitude={meet.latitude}
                        longitude={meet.longitude}
                    />
                    <PriceField
                        value={meet.price}
                        onChange={(price) => setMeet({...meet, price})}
                    />
                    <Block title="Управление участниками">
                        <Stack spacing={2} direction="column">
                            {meet.visits?.map((visitUser) => (
                                <Stack spacing={3} direction="row" justifyContent="space-between">
                                    <Avatar key={visitUser.userId} alt={visitUser.title} src={visitUser.image} />
                                    <Stack direction="row" justifyContent="space-between" style={{ flexGrow: 1 }} alignItems="flex-start">
                                        <Stack spacing={1} direction="column">
                                            <Typography variant="Body">{visitUser.title}</Typography>
                                            <div style={{ opacity: .6, lineHeight: '21px'}}>
                                                {!meet?.price || meet?.user?.id === visitUser.userId ? (
                                                    <span>бесплатно</span>
                                                ) : visitUser.paided ? (
                                                    <span>оплатил</span>
                                                ) : (
                                                    <span>не оплатил</span>
                                                )}
                                            </div>
                                        </Stack>
                                        {!visitUser.started && <Button onClick={() => onStarted(visitUser)} variant="small">Пришел</Button>}
                                        {visitUser.started && !visitUser.stopped && <Button onClick={() => onStopped(visitUser)} variant="small">Ушел</Button>}
                                        <svg onClick={() => onDeleteVisit(visitUser)} width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.96582 22.7686H18.043C19.3965 22.7686 20.2666 21.9512 20.3369 20.5977L20.9258 7.94141H21.8926C22.3408 7.94141 22.6836 7.58984 22.6836 7.15039C22.6836 6.71094 22.332 6.37695 21.8926 6.37695H17.9902V5.05859C17.9902 3.70508 17.1289 2.91406 15.6611 2.91406H12.3213C10.8535 2.91406 9.99219 3.70508 9.99219 5.05859V6.37695H6.10742C5.66797 6.37695 5.31641 6.71973 5.31641 7.15039C5.31641 7.59863 5.66797 7.94141 6.10742 7.94141H7.07422L7.66309 20.5977C7.7334 21.96 8.59473 22.7686 9.96582 22.7686ZM11.6357 5.1377C11.6357 4.68945 11.9521 4.39941 12.4355 4.39941H15.5469C16.0303 4.39941 16.3467 4.68945 16.3467 5.1377V6.37695H11.6357V5.1377ZM10.1416 21.1953C9.6582 21.1953 9.30664 20.835 9.28027 20.3164L8.69141 7.94141H19.2822L18.7109 20.3164C18.6934 20.8438 18.3506 21.1953 17.8496 21.1953H10.1416ZM11.4072 19.7803C11.7852 19.7803 12.0225 19.543 12.0137 19.1914L11.75 9.99805C11.7412 9.64648 11.4951 9.41797 11.1348 9.41797C10.7656 9.41797 10.5283 9.65527 10.5371 10.0068L10.8008 19.2002C10.8096 19.5518 11.0557 19.7803 11.4072 19.7803ZM14 19.7803C14.3691 19.7803 14.624 19.5518 14.624 19.2002V10.0068C14.624 9.65527 14.3691 9.41797 14 9.41797C13.6309 9.41797 13.3848 9.65527 13.3848 10.0068V19.2002C13.3848 19.5518 13.6309 19.7803 14 19.7803ZM16.5928 19.7891C16.9443 19.7891 17.1904 19.5518 17.1992 19.2002L17.4629 10.0068C17.4717 9.65527 17.2344 9.42676 16.8652 9.42676C16.5049 9.42676 16.2588 9.65527 16.25 10.0068L15.9863 19.2002C15.9775 19.543 16.2148 19.7891 16.5928 19.7891Z" fill="#1C1C1E"/>
                                        </svg>
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Block>
                </Stack>
            </DialogContent>
            <div style={{ padding: 15 }}>
                <Button onClick={onClickSave} disabled={!(meet.latitude && meet.longitude && meet.project?.title)}>
                    {meet.id ? 'Сохранить' : "Создать встречу"}
                </Button>
                <div style={{ color: 'black',
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 500,
                    lineHeight: '23.7px',
                    letterSpacing: '0.15px', opacity: .4}}
                     onClick={onDelete}
                >
                    удалить встречу
                </div>
            </div>
        </>
    );
}

export default withDialog(CreateMeet)

