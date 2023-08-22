import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet, useToggleMeetUser} from "../tools/service";
import Dialog from "@mui/material/Dialog";
import {Back, Button, TransitionDialog} from "../components";
import CreateMeet from "../dialogs/CreateMeet";
import {useAuth} from "../tools/auth";
import {useToggle} from "usehooks-ts";
import {Avatar, AvatarGroup, Box, Stack, Tooltip} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {getOnShare} from "../tools/pwa";
import {convertToMeetDateLong, convertToMeetTime} from "../tools/date";
import {makeStyles} from "@mui/styles";

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
    const { isAuth, openLogin } = useAuth();
    const classes = useStyles();

    const { id: meetId } = useParams();
    const { data: meet, refetch } = useMeet(Number(meetId))
    const [create, toggleCreate] = useToggle()
    const toggleMeetUser = useToggleMeetUser()
    const deleteMeet = useDeleteMeet()

    if (!meet) return null;

    const date = convertToMeetDateLong(meet.datetime)
    const time = convertToMeetTime(meet.datetime)

    const onClick = () => isAuth ? toggleMeetUser.mutateAsync(meet.id).then(() => refetch()) : openLogin()
    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))

    const parameters = [
        {
            icon: (
                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.83593 16H15.1731C17.0607 16 18 15.0961 18 13.3058V2.69419C18 0.903857 17.0607 0 15.1731 0H2.83593C0.948319 0 0 0.895166 0 2.69419V13.3058C0 15.1048 0.948319 16 2.83593 16ZM2.70045 14.6008C1.89664 14.6008 1.45409 14.1923 1.45409 13.384V5.18848C1.45409 4.38892 1.89664 3.97175 2.70045 3.97175H15.2905C16.0943 3.97175 16.5459 4.38892 16.5459 5.18848V13.384C16.5459 14.1923 16.0943 14.6008 15.2905 14.6008H2.70045ZM7.23432 7.0918H7.76719C8.08329 7.0918 8.19167 7.00489 8.19167 6.70071V6.18794C8.19167 5.88376 8.08329 5.78816 7.76719 5.78816H7.23432C6.91821 5.78816 6.80983 5.88376 6.80983 6.18794V6.70071C6.80983 7.00489 6.91821 7.0918 7.23432 7.0918ZM10.2418 7.0918H10.7657C11.0818 7.0918 11.1902 7.00489 11.1902 6.70071V6.18794C11.1902 5.88376 11.0818 5.78816 10.7657 5.78816H10.2418C9.91671 5.78816 9.81736 5.88376 9.81736 6.18794V6.70071C9.81736 7.00489 9.91671 7.0918 10.2418 7.0918ZM13.2403 7.0918H13.7732C14.0893 7.0918 14.1887 7.00489 14.1887 6.70071V6.18794C14.1887 5.88376 14.0893 5.78816 13.7732 5.78816H13.2403C12.9242 5.78816 12.8159 5.88376 12.8159 6.18794V6.70071C12.8159 7.00489 12.9242 7.0918 13.2403 7.0918ZM4.23583 9.93373H4.76869C5.0848 9.93373 5.18414 9.84682 5.18414 9.54264V9.02988C5.18414 8.72569 5.0848 8.63878 4.76869 8.63878H4.23583C3.91972 8.63878 3.81134 8.72569 3.81134 9.02988V9.54264C3.81134 9.84682 3.91972 9.93373 4.23583 9.93373ZM7.23432 9.93373H7.76719C8.08329 9.93373 8.19167 9.84682 8.19167 9.54264V9.02988C8.19167 8.72569 8.08329 8.63878 7.76719 8.63878H7.23432C6.91821 8.63878 6.80983 8.72569 6.80983 9.02988V9.54264C6.80983 9.84682 6.91821 9.93373 7.23432 9.93373ZM10.2418 9.93373H10.7657C11.0818 9.93373 11.1902 9.84682 11.1902 9.54264V9.02988C11.1902 8.72569 11.0818 8.63878 10.7657 8.63878H10.2418C9.91671 8.63878 9.81736 8.72569 9.81736 9.02988V9.54264C9.81736 9.84682 9.91671 9.93373 10.2418 9.93373ZM13.2403 9.93373H13.7732C14.0893 9.93373 14.1887 9.84682 14.1887 9.54264V9.02988C14.1887 8.72569 14.0893 8.63878 13.7732 8.63878H13.2403C12.9242 8.63878 12.8159 8.72569 12.8159 9.02988V9.54264C12.8159 9.84682 12.9242 9.93373 13.2403 9.93373ZM4.23583 12.7844H4.76869C5.0848 12.7844 5.18414 12.6888 5.18414 12.3846V11.8718C5.18414 11.5676 5.0848 11.4807 4.76869 11.4807H4.23583C3.91972 11.4807 3.81134 11.5676 3.81134 11.8718V12.3846C3.81134 12.6888 3.91972 12.7844 4.23583 12.7844ZM7.23432 12.7844H7.76719C8.08329 12.7844 8.19167 12.6888 8.19167 12.3846V11.8718C8.19167 11.5676 8.08329 11.4807 7.76719 11.4807H7.23432C6.91821 11.4807 6.80983 11.5676 6.80983 11.8718V12.3846C6.80983 12.6888 6.91821 12.7844 7.23432 12.7844ZM10.2418 12.7844H10.7657C11.0818 12.7844 11.1902 12.6888 11.1902 12.3846V11.8718C11.1902 11.5676 11.0818 11.4807 10.7657 11.4807H10.2418C9.91671 11.4807 9.81736 11.5676 9.81736 11.8718V12.3846C9.81736 12.6888 9.91671 12.7844 10.2418 12.7844Z" fill="black"/>
                </svg>
            ),
            title: 'Дата',
            value: date,
        },
        {
            icon: (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18C13.9235 18 18 13.9147 18 9C18 4.07647 13.9147 0 8.99118 0C4.07647 0 0 4.07647 0 9C0 13.9147 4.08529 18 9 18ZM9 16.5C4.83529 16.5 1.50882 13.1647 1.50882 9C1.50882 4.83529 4.82647 1.5 8.99118 1.5C13.1559 1.5 16.4912 4.83529 16.5 9C16.5088 13.1647 13.1647 16.5 9 16.5ZM4.38529 9.95294H8.99118C9.33529 9.95294 9.60882 9.68824 9.60882 9.33529V3.38824C9.60882 3.04412 9.33529 2.77941 8.99118 2.77941C8.64706 2.77941 8.38235 3.04412 8.38235 3.38824V8.72647H4.38529C4.03235 8.72647 3.76765 8.99118 3.76765 9.33529C3.76765 9.68824 4.03235 9.95294 4.38529 9.95294Z" fill="black"/>
                </svg>
            ),
            title: 'Начало',
            value: time,
        },
        {
            icon: (
                <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="path-1-inside-1_344_841" fill="white">
                        <path fillRule="evenodd" clipRule="evenodd" d="M8 0.34021C12.4179 0.34021 16 3.76999 16 8.00005C16 9.99441 15.204 11.8109 13.8972 13.1701C13.6584 13.4178 8.80265 18.0163 8.80265 18.0163C8.34494 18.4482 7.60862 18.4482 7.15755 18.0163L2.62687 13.6782C2.62687 13.6782 2.62023 13.6719 2.62023 13.6655C1.00829 12.2682 0 10.2485 0 8.00005C0 3.76999 3.58209 0.34021 8 0.34021ZM8 10C9.10667 10 10 9.10669 10 8.00003C10 6.8978 9.10222 6.00003 8 6.00003C6.89333 6.00003 6 6.8978 6 8.00003C6 9.10225 6.89333 10 8 10Z"/>
                    </mask>
                    <path d="M13.8972 13.1701L15.0167 14.2494L15.0182 14.2479L13.8972 13.1701ZM8.80265 18.0163L9.8699 19.1473L9.87194 19.1454L8.80265 18.0163ZM7.15755 18.0163L6.08208 19.1395L7.15755 18.0163ZM2.62687 13.6782L1.55138 14.8015L1.5514 14.8015L2.62687 13.6782ZM2.62023 13.6655H4.17531V12.9556L3.63882 12.4905L2.62023 13.6655ZM17.5551 8.00005C17.5551 2.84816 13.2124 -1.21487 8 -1.21487V1.89529C11.6234 1.89529 14.4449 4.69182 14.4449 8.00005H17.5551ZM15.0182 14.2479C16.5871 12.616 17.5551 10.4193 17.5551 8.00005H14.4449C14.4449 9.56955 13.8208 11.0058 12.7762 12.0924L15.0182 14.2479ZM8.80265 18.0163C9.87194 19.1454 9.87196 19.1454 9.872 19.1453C9.87203 19.1453 9.87209 19.1453 9.87217 19.1452C9.87231 19.145 9.87254 19.1448 9.87283 19.1445C9.87343 19.144 9.87431 19.1431 9.87548 19.142C9.87782 19.1398 9.88131 19.1365 9.88592 19.1322C9.89513 19.1234 9.90879 19.1105 9.92662 19.0936C9.96227 19.0598 10.0146 19.0103 10.0812 18.9471C10.2145 18.8209 10.4052 18.6402 10.6348 18.4226C11.0939 17.9875 11.7087 17.4046 12.3309 16.814C13.5476 15.6592 14.8655 14.4063 15.0167 14.2494L12.7776 12.0908C12.7839 12.0844 12.7704 12.0981 12.7171 12.1499C12.6715 12.1942 12.6095 12.2539 12.5326 12.3278C12.3791 12.4753 12.1714 12.6737 11.9275 12.9062C11.4399 13.371 10.8115 13.9681 10.1898 14.5582C9.56828 15.1481 8.95416 15.7304 8.49537 16.1652C8.26599 16.3826 8.07546 16.5631 7.94229 16.6893C7.87571 16.7524 7.82346 16.8018 7.78787 16.8356C7.77007 16.8524 7.75644 16.8653 7.74726 16.874C7.74267 16.8784 7.7392 16.8817 7.73687 16.8839C7.7357 16.885 7.73483 16.8858 7.73424 16.8863C7.73395 16.8866 7.73373 16.8868 7.73358 16.887C7.73351 16.887 7.73346 16.8871 7.73342 16.8871C7.73339 16.8872 7.73337 16.8872 8.80265 18.0163ZM6.08208 19.1395C7.13888 20.1514 8.81743 20.1404 9.8699 19.1473L7.7354 16.8852C7.81309 16.8119 7.90382 16.7851 7.97761 16.7851C8.05148 16.7851 8.14867 16.8123 8.23301 16.8931L6.08208 19.1395ZM1.5514 14.8015L6.08208 19.1395L8.23301 16.8931L3.70233 12.555L1.5514 14.8015ZM1.06516 13.6655C1.06516 14.1562 1.29432 14.4867 1.34733 14.5628C1.39277 14.6281 1.43559 14.6791 1.46717 14.7144C1.48372 14.7328 1.49917 14.7492 1.513 14.7634C1.51997 14.7706 1.52667 14.7773 1.53304 14.7836C1.53624 14.7868 1.53936 14.7898 1.54241 14.7928C1.54394 14.7943 1.54545 14.7957 1.54695 14.7972C1.54769 14.7979 1.54844 14.7986 1.54918 14.7993C1.54954 14.7997 1.54991 14.8 1.55028 14.8004C1.55046 14.8006 1.55074 14.8008 1.55083 14.8009C1.5511 14.8012 1.55138 14.8015 2.62687 13.6782C3.70235 12.555 3.70263 12.5553 3.7029 12.5556C3.70299 12.5557 3.70327 12.5559 3.70345 12.5561C3.70382 12.5564 3.70419 12.5568 3.70455 12.5572C3.70529 12.5579 3.70603 12.5586 3.70677 12.5593C3.70826 12.5607 3.70976 12.5622 3.71128 12.5637C3.71431 12.5666 3.7174 12.5696 3.72054 12.5727C3.72682 12.579 3.73337 12.5855 3.74016 12.5925C3.75363 12.6063 3.76856 12.6222 3.78448 12.64C3.81483 12.6739 3.85599 12.7228 3.89976 12.7857C3.94164 12.8459 4.0025 12.9423 4.05617 13.0708C4.10842 13.1958 4.17531 13.4023 4.17531 13.6655H1.06516ZM-1.55508 8.00005C-1.55508 10.7282 -0.32866 13.1673 1.60164 14.8406L3.63882 12.4905C2.34524 11.3692 1.55508 9.76873 1.55508 8.00005H-1.55508ZM8 -1.21487C2.78762 -1.21487 -1.55508 2.84816 -1.55508 8.00005H1.55508C1.55508 4.69182 4.37656 1.89529 8 1.89529V-1.21487ZM8.44492 8.00003C8.44492 8.24785 8.24782 8.44495 8 8.44495V11.5551C9.96551 11.5551 11.5551 9.96554 11.5551 8.00003H8.44492ZM8 7.5551C8.24338 7.5551 8.44492 7.75665 8.44492 8.00003H11.5551C11.5551 6.03896 9.96107 4.44495 8 4.44495V7.5551ZM7.55508 8.00003C7.55508 7.7544 7.75443 7.5551 8 7.5551V4.44495C6.03224 4.44495 4.44492 6.04121 4.44492 8.00003H7.55508ZM8 8.44495C7.75443 8.44495 7.55508 8.24565 7.55508 8.00003H4.44492C4.44492 9.95884 6.03224 11.5551 8 11.5551V8.44495Z" fill="black" mask="url(#path-1-inside-1_344_841)"/>
                </svg>
            ),
            title: 'Место',
            value: meet?.place?.title,
        }
    ]

    const menuItems = meet.editable ? [
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
                <div style={{ height: 230 }}>
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
                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="3" r="2.25" stroke="black" strokeWidth="1.5"/>
                                    <circle cx="12" cy="16" r="2.25" stroke="black" strokeWidth="1.5"/>
                                    <circle cx="3" cy="9" r="2.25" stroke="black" strokeWidth="1.5"/>
                                    <line x1="10.0101" y1="4.10176" x2="4.88515" y2="7.91426" stroke="black" strokeWidth="1.5"/>
                                    <line y1="-0.75" x2="6.38755" y2="-0.75" transform="matrix(0.802342 0.596864 0.596864 -0.802342 5.4375 10.0938)" stroke="black" strokeWidth="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div style={{ paddingTop: 24, opacity: .6, lineHeight: '21px'}}>
                            {meet.description}
                        </div>
                        {Boolean(meet.users?.length) && (
                            <div style={{ paddingTop: 36}}>
                                <div style={{ color: '#070707', opacity: .4, lineHeight: '18px', letterSpacing: '0.05em' }}>
                                    Участники
                                </div>
                                <Box sx={{ display: 'flex' }} style={{ paddingTop: 10}}>
                                    <AvatarGroup max={4}>
                                        {meet.users?.map((user) => (
                                            <Tooltip title={user.title} enterTouchDelay={0}>
                                                <Avatar key={user.id} alt={user.title} src={user.image} />
                                            </Tooltip>
                                        ))}
                                    </AvatarGroup>
                                </Box>
                            </div>
                        )}
                        <div id="parameters" style={{ paddingTop: 48}}>
                            <Stack spacing={3} direction="column">
                                {parameters.map(({ icon, title, value }) => (
                                    <Grid container key={title}>
                                        <Grid xs={6}>
                                            <Stack spacing={2} direction="row" alignItems="center">
                                                {icon}
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
                        <div style={{ paddingTop: 20, marginLeft: -8, marginRight: -8 }}>
                            {meet.active ? (
                                <Button onClick={onClick} variant="outlined">
                                    Покинуть встречу
                                </Button>
                            ) : (
                                <Button onClick={onClick}>
                                    Участвовать
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog onClose={toggleCreate} open={create} fullScreen TransitionComponent={TransitionDialog}>
                {create && (<CreateMeet onClose={toggleCreate} />)}
            </Dialog>
        </>
    );
}
