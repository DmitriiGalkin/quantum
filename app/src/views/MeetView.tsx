import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    useCreateVisit,
    useDeleteMeet,
    useDeleteVisit,
    useMeet, usePaidedVisit, useStartedVisit, useStoppedVisit,
} from "../tools/service";
import {Back, Button, Icon} from "../components";
import CreateMeet from "../dialogs/CreateMeet";
import {useAuth} from "../tools/auth";
import {useToggle} from "usehooks-ts";
import {Avatar, AvatarGroup, Box, Stack, Tooltip} from "@mui/material";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {getOnShare} from "../tools/pwa";
import {convertToMeetDateLong, convertToMeetTime} from "../tools/date";
import {makeStyles} from "@mui/styles";
import {Visit} from "../tools/dto";
import {Parameters, Parameter} from "../components/Parameters";
import {getAgeTitle} from "../tools/helper";
import {Block} from "../components/Block";
import Typography from "../components/Typography";

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        top: -33,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `28px 28px 0 0`,
        padding: '24px 26px'
    },
    image: {
        width: '100%',
        height: 230,
        objectFit: 'cover',
    },
}));

export default function MeetPage() {
    const navigate = useNavigate();
    const { isAuth, user, openLogin } = useAuth();
    const classes = useStyles();

    const { id: meetId } = useParams();
    const { data: meet, refetch } = useMeet(Number(meetId))
    const [create, toggleCreate] = useToggle()
    const createMeetUser = useCreateVisit()
    const startedUserMeet = useStartedVisit()
    const stoppedUserMeet = useStoppedVisit()
    const paidedUserMeet = usePaidedVisit()
    const deleteMeetUser = useDeleteVisit()
    const deleteMeet = useDeleteMeet()

    if (!meet) return null;

    const date = convertToMeetDateLong(meet.datetime)
    const time = convertToMeetTime(meet.datetime)
    const isOrganizer = user && (meet.user?.id === user.id)
    const userVisit = meet.visits.find(({ userId }) => userId === user.id)

    const onCreateVisit = () => isAuth ? createMeetUser.mutateAsync({ userId: user.id, meetId: meet.id }).then(() => refetch()) : openLogin()
    const onDeleteVisit = () => console.log('удаление визита' ) // meet?.userMeet && deleteMeetUser.mutateAsync(meet.userMeet).then(() => refetch())
    const onStarted = (userMeet: Visit) => startedUserMeet.mutateAsync(userMeet).then(() => refetch())
    const onStopped =  (userMeet: Visit) => stoppedUserMeet.mutateAsync(userMeet).then(() => refetch())
    const onPaided =  (userMeet: Visit) => paidedUserMeet.mutateAsync(userMeet).then(() => refetch())
    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))

    const parameters = [
        { name: "date", title: 'Дата', value: date },
        { name: "time", title: 'Начало', value: time },
        { name: "place", title: 'Место', value: meet?.placeTitle },
        {
            name: "place",
            title: 'Проект',
            value: <span onClick={() => navigate('/project/' + meet?.project?.id)}>{meet?.project?.title}</span>,
        },
        { name: "place", title: 'Возраст', value: getAgeTitle(meet?.project?.ageFrom, meet?.project?.ageTo) },
        {
            name: "date",
            title: 'Организатор',
            value: (
                <span>
                    {meet.user?.title}
                    {meet.user?.id === user?.id && '(Вы)'}
                </span>
            ),
        }
    ] as Parameter[]

    if (isOrganizer) {
        parameters.push({
            name: "date",
            title: 'Прибыль с участников',
            value: (<span>Подсчет прибыли</span>)
        })
    } else {
        parameters.push({
            name: "date",
            title: 'Стоимость',
            value: meet?.price ? (
                <Stack spacing={3} direction="row" alignItems="flex-start">
                    <div>{meet?.price}</div>
                    <div>
                        {userVisit?.paided ? (
                            <div>Оплачено</div>
                        ) : (
                            <div
                                style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', color: '#7139FF', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }}
                                onClick={() => onPaided({ userId: user.id, meetId: meet.id, ...user })}
                            >
                                Оплатить
                            </div>
                        )}
                    </div>
                </Stack>
            ) : (
                <div>Бесплатно</div>
            )
        })
    }

    const menuItems = isOrganizer ? [
        { title: 'Редактировать', onClick: toggleCreate},
        { title: 'Удалить', onClick: onDelete}
    ] : undefined

    const onShare = getOnShare({
        title: `Приглашаю ${date} в ${time} на встречу: ${meet?.project?.title}`,
        url: `/meet/${meet?.id}`
    })

    return (
        <>
            <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', position: 'absolute' }}>
                <div style={{ position: "relative", backgroundColor: 'rgb(245, 245, 245)', flex: '1 1 auto', overflowY: 'auto' }}>
                    <Back menuItems={menuItems} />
                    <div style={{ height: 230, backgroundImage: `url(${meet.project?.image})`, backgroundSize: 'cover' }} />
                    <div style={{ position: "relative"}}>
                        <Stack className={classes.container} spacing={3}>
                            <Stack flexDirection="row" justifyContent='space-between' alignItems='center' spacing={2}>
                                <Typography variant="Header1">{meet.project?.title}</Typography>
                                <div onClick={onShare}>
                                    <Icon name="share"/>
                                </div>
                            </Stack>
                            <Typography variant="Body">{meet.project?.description}</Typography>
                            <Block title="Участники">
                                <AvatarGroup>
                                    {meet.visits?.map((visitUser) => (
                                        <Tooltip title={visitUser.title} enterTouchDelay={0}>
                                            <Avatar key={visitUser.userId} alt={visitUser.title} src={visitUser.image} />
                                        </Tooltip>
                                    ))}
                                </AvatarGroup>
                            </Block>
                            {isOrganizer && (
                                <Block title="Управление участниками">
                                    <Stack spacing={3} direction="column">
                                        {meet.visits?.map((visitUser) => (
                                            <Stack spacing={3} direction="row" alignItems="flex-start">
                                                {visitUser && (
                                                    <>
                                                        <Avatar key={visitUser.userId} alt={visitUser.title} src={visitUser.image} />
                                                        <Stack spacing={2} direction="column">
                                                            <div style={{ opacity: .6, lineHeight: '21px'}}>
                                                                {visitUser.title}
                                                            </div>
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
                                                    </>
                                                )}
                                                {!visitUser.started && <Button onClick={() => onStarted(visitUser)} variant="small">Пришел</Button>}
                                                {visitUser.started && !visitUser.stopped && <Button onClick={() => onStopped(visitUser)} variant="small">Ушел</Button>}
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Block>
                            )}
                            <Block title="Параметры">
                                <Parameters items={parameters}/>
                            </Block>
                            <div style={{ width: '100%', height: '200px', marginTop: 25, borderRadius: 15, overflow: 'hidden' }}>
                                <YMaps>
                                    <Map defaultState={{ center: [Number(meet.latitude), Number(meet.longitude)], zoom: 16 }} width="100%" height="100%">
                                        <Placemark
                                            key={meet.id}
                                            modules={["geoObject.addon.balloon"]}
                                            defaultGeometry={[meet.latitude, meet.longitude]}
                                            options={{
                                                preset: 'islands#icon',
                                                iconColor: '#FFA427',
                                            }}
                                        />
                                    </Map>
                                </YMaps>
                            </div>
                        </Stack>
                    </div>
                </div>
                {!isOrganizer && (
                    <div style={{ padding: 15 }}>
                        {userVisit ? (
                            <Button onClick={onDeleteVisit} variant="outlined">Покинуть встречу</Button>
                        ) : (
                            <Button onClick={onCreateVisit}>Участвовать</Button>
                        )}
                    </div>
                )}
            </div>
            <CreateMeet open={create} onClose={toggleCreate} />
        </>
    );
}
