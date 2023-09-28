import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {
    useCreateMeetUser,
    useDeleteMeet,
    useDeleteMeetUser,
    useMeet, usePaidedUserMeet, useStartedUserMeet, useStoppedUserMeet,
} from "../tools/service";
import {Back, Button, Icon} from "../components";
import CreateMeet from "../dialogs/CreateMeet";
import {useAuth} from "../tools/auth";
import {useToggle} from "usehooks-ts";
import {Avatar, AvatarGroup, Box, Stack, Tooltip} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {getOnShare} from "../tools/pwa";
import {convertToMeetDateLong, convertToMeetTime} from "../tools/date";
import {makeStyles} from "@mui/styles";
import {UserMeet} from "../tools/dto";
import {IconName} from "../components/Icon";

interface Parameter {
    name: IconName,
    title: string,
    value?: JSX.Element,
}

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
    const createMeetUser = useCreateMeetUser()
    const startedUserMeet = useStartedUserMeet()
    const stoppedUserMeet = useStoppedUserMeet()
    const paidedUserMeet = usePaidedUserMeet()
    const deleteMeetUser = useDeleteMeetUser()
    const deleteMeet = useDeleteMeet()

    if (!meet) return null;

    const date = convertToMeetDateLong(meet.datetime)
    const time = convertToMeetTime(meet.datetime)
    const isOrganizer = user && (meet.user?.id === user.id)

    const onCreateUserMeet = () => isAuth ? createMeetUser.mutateAsync({ userId: user.id, meetId: meet.id, ...user }).then(() => refetch()) : openLogin()
    const onDeleteUserMeet = () => meet?.userMeet && deleteMeetUser.mutateAsync(meet.userMeet).then(() => refetch())
    const onStarted = (userMeet: UserMeet) => startedUserMeet.mutateAsync(userMeet).then(() => refetch())
    const onStopped =  (userMeet: UserMeet) => stoppedUserMeet.mutateAsync(userMeet).then(() => refetch())
    const onPaided =  (userMeet: UserMeet) => paidedUserMeet.mutateAsync(userMeet).then(() => refetch())
    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))

    const parameters = [
        { name: "date", title: 'Дата', value: date },
        { name: "time", title: 'Начало', value: time },
        { name: "place", title: 'Место', value: meet?.place?.title },
        {
            name: "place",
            title: 'Проект',
            value: <span onClick={() => navigate('/project/' + meet?.project?.id)}>{meet?.project?.title}</span>,
        },
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
                        {meet.userMeet?.paided ? (
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
        title: `Приглашаю ${date} в ${time} на встречу: ${meet?.title}`,
        url: `/meet/${meet?.id}`
    })

    return (
        <>
            <div style={{ position: "relative", backgroundColor: 'rgb(245, 245, 245)'}}>
                <div style={{ height: 230, top: 0, left: 0, right: 0 }}>
                    {meet.image && <img alt={meet.title} src={meet.image} className={classes.image}/>}
                </div>
                <div style={{ position: "absolute", top: 18, left: 16, right: 16 }}>
                    <Back menuItems={menuItems} />
                </div>
                <div style={{ position: "relative"}}>
                    <div className={classes.container}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 23, lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: 900 }}>
                                {meet.title}
                            </div>
                            <div onClick={onShare}>
                                <Icon name="share"/>
                            </div>
                        </div>
                        <div style={{ paddingTop: 24, opacity: .6, lineHeight: '21px'}}>
                            {meet.description}
                        </div>
                        {Boolean(meet.userMeets?.length) && (
                            <div style={{ paddingTop: 36}}>
                                <div style={{ color: '#070707', opacity: .4, lineHeight: '18px', letterSpacing: '0.05em' }}>
                                    Участники
                                </div>
                                <Box sx={{ display: 'flex' }} style={{ paddingTop: 10}}>
                                    {isOrganizer ? (
                                        <Stack spacing={3} direction="column">
                                            {meet.userMeets?.map((userMeet) => (
                                                <Stack spacing={3} direction="row" alignItems="flex-start">
                                                    <Avatar key={userMeet.id} alt={userMeet.title} src={userMeet.image} />
                                                    <Stack spacing={2} direction="column">
                                                        <div style={{ opacity: .6, lineHeight: '21px'}}>
                                                            {userMeet.title}
                                                        </div>
                                                        <div style={{ opacity: .6, lineHeight: '21px'}}>
                                                            {!meet.price || meet?.user?.id === userMeet.userId ? (
                                                                <span>бесплатно</span>
                                                            ) : userMeet.paided ? (
                                                                <span>оплатил</span>
                                                            ) : (
                                                                <span>не оплатил</span>
                                                            )}
                                                        </div>
                                                    </Stack>
                                                    {!userMeet.started && <Button onClick={() => onStarted(userMeet)} variant="small">Пришел</Button>}
                                                    {userMeet.started && !userMeet.stopped && <Button onClick={() => onStopped(userMeet)} variant="small">Ушел</Button>}
                                                </Stack>
                                            ))}
                                        </Stack>
                                    ) : (
                                        <AvatarGroup max={4}>
                                            {meet.userMeets?.map((user) => (
                                                <Tooltip title={user.title} enterTouchDelay={0}>
                                                    <Avatar key={user.id} alt={user.title} src={user.image} />
                                                </Tooltip>
                                            ))}
                                        </AvatarGroup>
                                    )}
                                </Box>
                            </div>
                        )}
                        <div id="parameters" style={{ paddingTop: 48}}>
                            <Stack spacing={3} direction="column">
                                {parameters.map(({ name, title, value }) => (
                                    <Grid container key={title}>
                                        <Grid xs={6}>
                                            <Stack spacing={2} direction="row" alignItems="center">
                                                <Icon name={name}/>
                                                <div style={{ fontWeight: 900 }}>
                                                    {title}
                                                </div>
                                            </Stack>
                                        </Grid>
                                        <Grid xs={6}>
                                            <div style={{ color: '#070707', letterSpacing: '0.05em' }}>
                                                {value}
                                            </div>
                                        </Grid>
                                    </Grid>
                                ))}
                            </Stack>
                        </div>
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
                        {!isOrganizer && (
                            <div style={{ paddingTop: 20, marginLeft: -8, marginRight: -8 }}>
                                {meet.userMeet ? (
                                    <Button onClick={onDeleteUserMeet} variant="outlined">Покинуть встречу</Button>
                                ) : (
                                    <Button onClick={onCreateUserMeet}>Участвовать</Button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <CreateMeet open={create} onClose={toggleCreate} />
        </>
    );
}
