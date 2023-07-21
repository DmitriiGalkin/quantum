import {Box, ClickAwayListener, Stack, SwipeableDrawer} from "@mui/material";
import CreateMeet from "../view/CreateMeet";
import Profile from "./Profile";
import { Map2 } from "../components/Map";
import UserMeets from "./UserMeets";
import React, {useState} from "react";
import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import {AppBanner, Calendar, MeetCard, TransitionDialog} from "../components";
import {useAuth} from "../tools/auth";
import {useLocalStorage, useToggle} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import {useMeets} from "../tools/service";
import {getWeek} from "../tools/helper";
import SwipeableViews from "react-swipeable-views";
import {Map, Placemark, YMaps} from "@pbe/react-yandex-maps";
import {COLOR} from "../tools/theme";
import {usePosition} from "../tools/pwa";

const useStyles = makeStyles(() => ({
    root: {
        backgroundColor: '#F5F5F5',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    header: {
        padding: '11px 15px 11px 15px',
        background: 'linear-gradient(180deg, #FFB628 0%, #FF8F28 100%)',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        position: 'fixed'
    },
    outlet: {
        paddingTop: 55,
        backgroundColor: '#F5F5F5',
    },
    blockImage: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 100
    },
}));

export default function MeetsView(): JSX.Element {
    const classes = useStyles();

    const { user, authFn } = useAuth();
    const { data: meets = [], refetch } = useMeets()
    const [profile, toggleProfile] = useToggle()
    const [menu, toggleMenu] = useToggle()
    const [map, toggleMap] = useToggle()
    const [meet, toggleMeet] = useToggle()
    const [userMeets, toggleUserMeets] = useToggle()
    const [selectedMeetId, setSelectedMeetId] = useState<number>()
    const [date, setDate] = useLocalStorage<string>('date', LocalDate.now().toString())

    const days = getWeek(date, meets)
    const selectedDay = days.find(({ id }) => id === date);
    const filteredMeets = selectedDay?.meets || []
    const selectedMeet = meets.find(({id}) => id === selectedMeetId)
    const { latitude, longitude } = usePosition()

    const onAdd = authFn(toggleMeet)

    return (
        <>
            <Box className={classes.root}>
                <div className={classes.header}>
                    <Stack spacing={2} direction="row" justifyContent="space-between" style={{ width: '100%' }} alignItems="center">
                        <Stack spacing={3} direction="row" justifyContent="space-between" alignItems="center">
                            {user && (
                                <div onClick={toggleMenu} style={{ display: 'flex' }}>
                                    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 2H2" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                        <path d="M17 10L2 10" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                            )}
                            <svg width="99" height="25" viewBox="0 0 99 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M19.5427 12.1165C19.5427 16.2179 16.2179 19.5427 12.1165 19.5427C8.01509 19.5427 4.69026 16.2179 4.69026 12.1165C4.69026 8.01509 8.01509 4.69026 12.1165 4.69026C16.2179 4.69026 19.5427 8.01509 19.5427 12.1165ZM16.6939 23.3385C15.2816 23.9152 13.7362 24.233 12.1165 24.233C5.42474 24.233 0 18.8082 0 12.1165C0 5.42474 5.42474 0 12.1165 0C18.8082 0 24.233 5.42474 24.233 12.1165C24.233 14.4852 23.5533 16.6951 22.3783 18.5619C21.7815 18.1926 21.0778 17.9794 20.3244 17.9794C18.1658 17.9794 16.4159 19.7293 16.4159 21.8879C16.4159 22.4005 16.5145 22.89 16.6939 23.3385Z" fill="white"/>
                                <circle cx="20.3245" cy="21.8881" r="2.34513" fill="white"/>
                                <path d="M32.6616 17.3909C30.5813 17.3909 28.9361 15.8544 28.9361 13.6382V7.69644H29.8607V13.6654C29.8607 15.3786 31.098 16.5343 32.6616 16.5343C34.2116 16.5343 35.4625 15.3786 35.4625 13.6654V7.69644H36.3735V13.6382C36.3735 15.8544 34.7419 17.3909 32.6616 17.3909ZM48.303 17.2141H47.3376L46.6986 14.8347H41.1919L40.5393 17.2141H39.5739L42.2389 7.69644H45.638L48.303 17.2141ZM42.9051 8.62102L41.4367 13.9781H46.4538L44.999 8.62102H42.9051ZM59.0453 16.3439V7.69644H59.9563V17.2141H57.7944L53.8514 8.56663H53.1172V17.2141H52.1926V7.69644H54.436L58.3791 16.3439H59.0453ZM63.6042 7.69644H70.9464V8.56663H67.7376V17.2141H66.813V8.56663H63.6042V7.69644ZM78.1717 17.3909C76.0914 17.3909 74.4462 15.8544 74.4462 13.6382V7.69644H75.3708V13.6654C75.3708 15.3786 76.6081 16.5343 78.1717 16.5343C79.7217 16.5343 80.9726 15.3786 80.9726 13.6654V7.69644H81.8836V13.6382C81.8836 15.8544 80.252 17.3909 78.1717 17.3909ZM97.5192 17.2141H96.5674L95.7788 8.56663H95.1262L92.3661 17.2141H90.8024L88.0559 8.56663H87.4033L86.6147 17.2141H85.6629L86.5603 7.69644H88.7901L91.4415 16.3439H91.7542L94.392 7.69644H96.6218L97.5192 17.2141Z" fill="white"/>
                                <path d="M28.9361 7.69644V7.36897H28.6086V7.69644H28.9361ZM29.8607 7.69644H30.1882V7.36897H29.8607V7.69644ZM35.4625 7.69644V7.36897H35.135V7.69644H35.4625ZM36.3735 7.69644H36.701V7.36897H36.3735V7.69644ZM32.6616 17.0634C30.7574 17.0634 29.2636 15.6689 29.2636 13.6382H28.6086C28.6086 16.04 30.4052 17.7183 32.6616 17.7183V17.0634ZM29.2636 13.6382V7.69644H28.6086V13.6382H29.2636ZM28.9361 8.02392H29.8607V7.36897H28.9361V8.02392ZM29.5332 7.69644V13.6654H30.1882V7.69644H29.5332ZM29.5332 13.6654C29.5332 15.5605 30.9182 16.8618 32.6616 16.8618V16.2068C31.2778 16.2068 30.1882 15.1967 30.1882 13.6654H29.5332ZM32.6616 16.8618C34.3904 16.8618 35.79 15.5615 35.79 13.6654H35.135C35.135 15.1956 34.0329 16.2068 32.6616 16.2068V16.8618ZM35.79 13.6654V7.69644H35.135V13.6654H35.79ZM35.4625 8.02392H36.3735V7.36897H35.4625V8.02392ZM36.046 7.69644V13.6382H36.701V7.69644H36.046ZM36.046 13.6382C36.046 15.6704 34.5642 17.0634 32.6616 17.0634V17.7183C34.9196 17.7183 36.701 16.0385 36.701 13.6382H36.046ZM48.303 17.2141V17.5416H48.7347L48.6183 17.1258L48.303 17.2141ZM47.3376 17.2141L47.0214 17.2991L47.0865 17.5416H47.3376V17.2141ZM46.6986 14.8347L47.0148 14.7498L46.9497 14.5072H46.6986V14.8347ZM41.1919 14.8347V14.5072H40.9422L40.8761 14.7481L41.1919 14.8347ZM40.5393 17.2141V17.5416H40.789L40.8551 17.3007L40.5393 17.2141ZM39.5739 17.2141L39.2586 17.1258L39.1422 17.5416H39.5739V17.2141ZM42.2389 7.69644V7.36897H41.9905L41.9235 7.60815L42.2389 7.69644ZM45.638 7.69644L45.9534 7.60815L45.8864 7.36897H45.638V7.69644ZM42.9051 8.62102V8.29354H42.6553L42.5893 8.53445L42.9051 8.62102ZM41.4367 13.9781L41.1208 13.8915L41.0073 14.3056H41.4367V13.9781ZM46.4538 13.9781V14.3056H46.8821L46.7699 13.8923L46.4538 13.9781ZM44.999 8.62102L45.315 8.53519L45.2494 8.29354H44.999V8.62102ZM48.303 16.8866H47.3376V17.5416H48.303V16.8866ZM47.6539 17.1292L47.0148 14.7498L46.3823 14.9196L47.0214 17.2991L47.6539 17.1292ZM46.6986 14.5072H41.1919V15.1622H46.6986V14.5072ZM40.8761 14.7481L40.2235 17.1275L40.8551 17.3007L41.5077 14.9213L40.8761 14.7481ZM40.5393 16.8866H39.5739V17.5416H40.5393V16.8866ZM39.8893 17.3024L42.5542 7.78474L41.9235 7.60815L39.2586 17.1258L39.8893 17.3024ZM42.2389 8.02392H45.638V7.36897H42.2389V8.02392ZM45.3227 7.78474L47.9876 17.3024L48.6183 17.1258L45.9534 7.60815L45.3227 7.78474ZM42.5893 8.53445L41.1208 13.8915L41.7525 14.0647L43.2209 8.70759L42.5893 8.53445ZM41.4367 14.3056H46.4538V13.6506H41.4367V14.3056ZM46.7699 13.8923L45.315 8.53519L44.683 8.70684L46.1378 14.0639L46.7699 13.8923ZM44.999 8.29354H42.9051V8.94849H44.999V8.29354ZM59.0453 16.3439V16.6714H59.3728V16.3439H59.0453ZM59.0453 7.69644V7.36897H58.7178V7.69644H59.0453ZM59.9563 7.69644H60.2838V7.36897H59.9563V7.69644ZM59.9563 17.2141V17.5416H60.2838V17.2141H59.9563ZM57.7944 17.2141L57.4965 17.35L57.5838 17.5416H57.7944V17.2141ZM53.8514 8.56663L54.1493 8.43077L54.062 8.23916H53.8514V8.56663ZM53.1172 8.56663V8.23916H52.7897V8.56663H53.1172ZM53.1172 17.2141V17.5416H53.4446V17.2141H53.1172ZM52.1926 17.2141H51.8651V17.5416H52.1926V17.2141ZM52.1926 7.69644V7.36897H51.8651V7.69644H52.1926ZM54.436 7.69644L54.734 7.56058L54.6466 7.36897H54.436V7.69644ZM58.3791 16.3439L58.0811 16.4798L58.1685 16.6714H58.3791V16.3439ZM59.3728 16.3439V7.69644H58.7178V16.3439H59.3728ZM59.0453 8.02392H59.9563V7.36897H59.0453V8.02392ZM59.6288 7.69644V17.2141H60.2838V7.69644H59.6288ZM59.9563 16.8866H57.7944V17.5416H59.9563V16.8866ZM58.0924 17.0782L54.1493 8.43077L53.5534 8.70249L57.4965 17.35L58.0924 17.0782ZM53.8514 8.23916H53.1172V8.8941H53.8514V8.23916ZM52.7897 8.56663V17.2141H53.4446V8.56663H52.7897ZM53.1172 16.8866H52.1926V17.5416H53.1172V16.8866ZM52.5201 17.2141V7.69644H51.8651V17.2141H52.5201ZM52.1926 8.02392H54.436V7.36897H52.1926V8.02392ZM54.1381 7.8323L58.0811 16.4798L58.677 16.2081L54.734 7.56058L54.1381 7.8323ZM58.3791 16.6714H59.0453V16.0165H58.3791V16.6714ZM63.6042 7.69644V7.36897H63.2768V7.69644H63.6042ZM70.9464 7.69644H71.2739V7.36897H70.9464V7.69644ZM70.9464 8.56663V8.8941H71.2739V8.56663H70.9464ZM67.7376 8.56663V8.23916H67.4101V8.56663H67.7376ZM67.7376 17.2141V17.5416H68.0651V17.2141H67.7376ZM66.813 17.2141H66.4856V17.5416H66.813V17.2141ZM66.813 8.56663H67.1405V8.23916H66.813V8.56663ZM63.6042 8.56663H63.2768V8.8941H63.6042V8.56663ZM63.6042 8.02392H70.9464V7.36897H63.6042V8.02392ZM70.619 7.69644V8.56663H71.2739V7.69644H70.619ZM70.9464 8.23916H67.7376V8.8941H70.9464V8.23916ZM67.4101 8.56663V17.2141H68.0651V8.56663H67.4101ZM67.7376 16.8866H66.813V17.5416H67.7376V16.8866ZM67.1405 17.2141V8.56663H66.4856V17.2141H67.1405ZM66.813 8.23916H63.6042V8.8941H66.813V8.23916ZM63.9317 8.56663V7.69644H63.2768V8.56663H63.9317ZM74.4462 7.69644V7.36897H74.1187V7.69644H74.4462ZM75.3708 7.69644H75.6982V7.36897H75.3708V7.69644ZM80.9726 7.69644V7.36897H80.6451V7.69644H80.9726ZM81.8836 7.69644H82.211V7.36897H81.8836V7.69644ZM78.1717 17.0634C76.2675 17.0634 74.7737 15.6689 74.7737 13.6382H74.1187C74.1187 16.04 75.9153 17.7183 78.1717 17.7183V17.0634ZM74.7737 13.6382V7.69644H74.1187V13.6382H74.7737ZM74.4462 8.02392H75.3708V7.36897H74.4462V8.02392ZM75.0433 7.69644V13.6654H75.6982V7.69644H75.0433ZM75.0433 13.6654C75.0433 15.5605 76.4282 16.8618 78.1717 16.8618V16.2068C76.7879 16.2068 75.6982 15.1967 75.6982 13.6654H75.0433ZM78.1717 16.8618C79.9005 16.8618 81.3001 15.5615 81.3001 13.6654H80.6451C80.6451 15.1956 79.5429 16.2068 78.1717 16.2068V16.8618ZM81.3001 13.6654V7.69644H80.6451V13.6654H81.3001ZM80.9726 8.02392H81.8836V7.36897H80.9726V8.02392ZM81.5561 7.69644V13.6382H82.211V7.69644H81.5561ZM81.5561 13.6382C81.5561 15.6704 80.0743 17.0634 78.1717 17.0634V17.7183C80.4297 17.7183 82.211 16.0385 82.211 13.6382H81.5561ZM97.5192 17.2141V17.5416H97.879L97.8452 17.1834L97.5192 17.2141ZM96.5674 17.2141L96.2413 17.2439L96.2685 17.5416H96.5674V17.2141ZM95.7788 8.56663L96.1049 8.53689L96.0778 8.23916H95.7788V8.56663ZM95.1262 8.56663V8.23916H94.887L94.8142 8.46706L95.1262 8.56663ZM92.3661 17.2141V17.5416H92.6053L92.678 17.3137L92.3661 17.2141ZM90.8024 17.2141L90.4903 17.3132L90.5629 17.5416H90.8024V17.2141ZM88.0559 8.56663L88.368 8.4675L88.2955 8.23916H88.0559V8.56663ZM87.4033 8.56663V8.23916H87.1043L87.0772 8.53689L87.4033 8.56663ZM86.6147 17.2141V17.5416H86.9136L86.9408 17.2439L86.6147 17.2141ZM85.6629 17.2141L85.3369 17.1834L85.3031 17.5416H85.6629V17.2141ZM86.5603 7.69644V7.36897H86.2622L86.2343 7.6657L86.5603 7.69644ZM88.7901 7.69644L89.1032 7.60045L89.0323 7.36897H88.7901V7.69644ZM91.4415 16.3439L91.1284 16.4399L91.1994 16.6714H91.4415V16.3439ZM91.7542 16.3439V16.6714H91.9967L92.0674 16.4395L91.7542 16.3439ZM94.392 7.69644V7.36897H94.1495L94.0787 7.6009L94.392 7.69644ZM96.6218 7.69644L96.9478 7.6657L96.9199 7.36897H96.6218V7.69644ZM97.5192 16.8866H96.5674V17.5416H97.5192V16.8866ZM96.8936 17.1844L96.1049 8.53689L95.4527 8.59637L96.2413 17.2439L96.8936 17.1844ZM95.7788 8.23916H95.1262V8.8941H95.7788V8.23916ZM94.8142 8.46706L92.0541 17.1145L92.678 17.3137L95.4382 8.6662L94.8142 8.46706ZM92.3661 16.8866H90.8024V17.5416H92.3661V16.8866ZM91.1146 17.115L88.368 8.4675L87.7438 8.66576L90.4903 17.3132L91.1146 17.115ZM88.0559 8.23916H87.4033V8.8941H88.0559V8.23916ZM87.0772 8.53689L86.2886 17.1844L86.9408 17.2439L87.7294 8.59637L87.0772 8.53689ZM86.6147 16.8866H85.6629V17.5416H86.6147V16.8866ZM85.9889 17.2449L86.8863 7.72718L86.2343 7.6657L85.3369 17.1834L85.9889 17.2449ZM86.5603 8.02392H88.7901V7.36897H86.5603V8.02392ZM88.4771 7.79244L91.1284 16.4399L91.7546 16.2479L89.1032 7.60045L88.4771 7.79244ZM91.4415 16.6714H91.7542V16.0165H91.4415V16.6714ZM92.0674 16.4395L94.7052 7.79199L94.0787 7.6009L91.441 16.2484L92.0674 16.4395ZM94.392 8.02392H96.6218V7.36897H94.392V8.02392ZM96.2958 7.72718L97.1932 17.2449L97.8452 17.1834L96.9478 7.6657L96.2958 7.72718Z" fill="white"/>
                            </svg>
                        </Stack>
                        <Stack spacing={5} direction="row" justifyContent="space-between" alignItems="center">
                            <div onClick={toggleMap} style={{ display: 'flex' }}>
                                <div style={{ opacity: map ? .5 : undefined, border: '2px solid white', borderRight: 0, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: map ? COLOR : 'white', padding: '6px 7px', display: 'flex' }}>
                                    <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.75" y="0.75" width="22.1786" height="14.5" rx="3.25" stroke={map ? 'white' : COLOR} strokeWidth="1.5"/>
                                        <mask id="path-2-inside-1_542_1158" fill="white">
                                            <rect x="4" y="3.42859" width="7.28571" height="9.14286" rx="1"/>
                                        </mask>
                                        <rect x="4" y="3.42859" width="7.28571" height="9.14286" rx="1" stroke={map ? 'white' : COLOR} strokeWidth="3" mask="url(#path-2-inside-1_542_1158)"/>
                                        <path d="M19.1121 4.28217L14.2075 4.28217" stroke={map ? 'white' : COLOR} strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M19.1121 11.8528L14.2075 11.8528" stroke={map ? 'white' : COLOR} strokeWidth="1.5" strokeLinecap="round"/>
                                        <path d="M16.6599 7.08667H14.2076" stroke={map ? 'white' : COLOR} strokeWidth="1.5" strokeLinecap="round"/>
                                    </svg>
                                </div>
                                <div style={{ opacity: !map ? .5 : undefined, border: '2px solid white', borderLeft: 0, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: map ? 'white' : COLOR, padding: '6px 10px', display: 'flex' }}>
                                    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.923558 15.8067C1.12788 15.8067 1.34038 15.7332 1.60192 15.5861L5.76202 13.3466L10.2817 15.8803C10.576 16.0438 10.8947 16.1255 11.1971 16.1255C11.4832 16.1255 11.7692 16.0519 12.0144 15.913L16.2889 13.4856C16.7793 13.2159 17 12.8236 17 12.276V1.26683C17 0.662019 16.6649 0.326923 16.0764 0.326923C15.8721 0.326923 15.6596 0.392308 15.3899 0.539423L11.0582 2.95048L6.62019 0.228846C6.36683 0.0817308 6.08077 0 5.79471 0C5.50048 0 5.20625 0.0817308 4.95288 0.228846L0.702885 2.64808C0.220673 2.92596 0 3.31827 0 3.86587V14.8587C0 15.4635 0.335096 15.8067 0.923558 15.8067ZM5.23077 12.0471L1.54471 14.074C1.50385 14.0904 1.46298 14.1149 1.42212 14.1149C1.35673 14.1149 1.31587 14.0659 1.31587 13.9841V4.18462C1.31587 3.98846 1.38942 3.84952 1.58558 3.7351L4.93654 1.77356C5.04279 1.71635 5.13269 1.66731 5.23077 1.6101V12.0471ZM6.54663 12.1779V1.78173C6.62837 1.83077 6.72644 1.87981 6.80817 1.92885L10.4534 4.15192V14.3683C10.3389 14.3029 10.2163 14.2457 10.0938 14.1803L6.54663 12.1779ZM11.7692 14.5154V4.07019L15.4553 2.05962C15.4962 2.0351 15.537 2.01875 15.5697 2.01875C15.6433 2.01875 15.6841 2.06779 15.6841 2.14952V11.949C15.6841 12.1534 15.6024 12.2923 15.4144 12.4067L12.137 14.3111C12.0144 14.3846 11.8918 14.4582 11.7692 14.5154Z" fill={map ? '#FFA028' : 'white'}/>
                                    </svg>
                                </div>
                            </div>
                            <div onClick={onAdd} style={{ display: 'flex' }}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 11H2" stroke="white" strokeWidth="2.25" strokeLinecap="round"/>
                                    <path d="M11 2L11 20" stroke="white" strokeWidth="2.25" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </Stack>
                    </Stack>
                </div>
                <div className={classes.outlet}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ backgroundColor: map ? 'rgba(34, 52, 69, .8)' : undefined, zIndex: 2 }}>
                            <div style={{ display: 'block', padding: 15 }}><Calendar days={days} onChange={setDate} map={map} /></div>
                        </div>
                        <div style={{ overflow: 'auto', flexGrow: 1 }}>
                            {!map ? (
                                <SwipeableViews
                                    index={selectedDay?.index}
                                    onChangeIndex={(index) => setDate(days[index].id)}
                                    containerStyle={{ height: 400 }}
                                    springConfig={{duration: '0.2s', delay: '0s', easeFunction: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)'}}
                                    threshold={4}
                                >
                                    {days.map(({id, meets}) => (
                                        <div key={id} style={{ padding: '5px 15px'}}>
                                            <Stack spacing={2}>
                                                {meets.map((meet) =>
                                                    <div key={meet.id}>
                                                        <MeetCard meet={meet} refetch={refetch} />
                                                    </div>
                                                )}
                                            </Stack>
                                        </div>
                                    ))}
                                </SwipeableViews>
                            ) : (
                                <>
                                    {latitude && longitude && (
                                        <div style={{ position: 'absolute', top: 54, bottom: 0, left: 0, right: 0 }}>
                                            {/*<Map2 state={{ center: [latitude, longitude], zoom: 13 }} meets={filteredMeets} />*/}
                                            <YMaps>
                                                <Map defaultState={{ center: [latitude, longitude], zoom: 16 }} width="100%" height="100%">
                                                    {filteredMeets.map((meet) => (
                                                        <Placemark
                                                            key={meet.id}
                                                            modules={["geoObject.addon.balloon"]}
                                                            defaultGeometry={[meet.latitude, meet.longitude]}
                                                            iconContent='12'
                                                            options={{ preset: 'islands#icon', iconColor: '#FFA427' }}
                                                            onClick={() => setSelectedMeetId(meet.id)}
                                                        />
                                                    ))}
                                                </Map>
                                            </YMaps>
                                        </div>
                                    )}
                                    {selectedMeetId && selectedMeet && (
                                        <ClickAwayListener onClickAway={() => setSelectedMeetId(undefined)}>
                                            <div style={{ position: 'absolute', bottom: 15, left: 15, right: 15 }}>
                                                <MeetCard meet={selectedMeet} refetch={refetch} />
                                            </div>
                                        </ClickAwayListener>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Box>
            {user && (
                <SwipeableDrawer
                    anchor="left"
                    open={menu}
                    onClose={toggleMenu}
                    onOpen={toggleMenu}
                >
                    <div style={{ padding: 15, color: 'black', height: '100%', width: 275 }}>
                        <Stack direction="column" justifyContent="space-between" style={{ height: '100%' }}>
                            <Stack spacing={2} direction="column">
                                <Stack spacing={3} direction="column" onClick={toggleProfile}>
                                    <div style={{ padding: 14 }}>
                                        <Stack spacing={3} direction="row"  justifyContent="space-between" alignItems="center">
                                            <Stack spacing={2} direction="row">
                                                <div style={{ width: 72 }}>
                                                    <div className={classes.blockImage}>
                                                        <img alt={user.title} src={user.image} className={classes.image}/>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div style={{ fontSize: 9, fontWeight: 500, letterSpacing: '0.18px' }}>Профиль</div>
                                                    <div style={{ fontSize: 19, fontWeight: 600, lineHeight: '30px', letterSpacing: '0.193px' }}>{user.title}</div>
                                                </div>
                                            </Stack>
                                            <div>
                                                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L7 7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                                    <path d="M7 7L1 13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                        </Stack>
                                    </div>
                                </Stack>
                                <div>
                                    {[
                                        { title: 'Посещения', onClick: toggleUserMeets }
                                    ].map(({ title, onClick }) => (
                                        <Stack spacing={3} direction="row" style={{ backgroundColor: '#D9D9D9', padding: '13px 15px', borderRadius: 20 }} onClick={onClick} alignItems="center">
                                            <div>
                                                <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M24.4484 6.07871L24.4485 6.07877C24.7805 6.33869 25.1256 6.60883 25.5143 6.90972C23.7985 7.46376 22.6332 8.41721 21.9162 10.0278C21.1735 8.48163 20.0467 7.45087 18.2796 6.9226L18.3613 6.85809C18.9779 6.37146 19.4947 5.96362 20.0467 5.54396C19.2656 4.86108 18.7662 3.97205 18.8558 2.86398C18.9198 2.00071 19.2912 1.26629 19.9698 0.699374C21.2119 -0.344273 23.0814 -0.202543 24.1698 1.0086C25.1173 2.05225 25.4503 4.10089 23.7472 5.53108C23.9817 5.71337 24.2117 5.89344 24.4484 6.07871ZM3.72949 15.2981C1.46749 13.6718 1.80679 11.3186 3.13572 10.0742C4.62016 8.70661 7.20732 8.63269 8.77658 9.93867C10.572 11.4295 10.4448 13.3885 8.5221 15.1503C9.46932 15.9142 10.4165 16.6781 11.2931 17.3803L11.6241 17.1119C12.3663 16.5101 13.201 15.8333 14.0357 15.138C13.0602 14.448 12.4806 13.4624 12.5513 12.2057C12.6078 11.3063 13.0037 10.5424 13.7388 9.92635C15.3081 8.59573 17.867 8.64501 19.3797 10.0126C20.6804 11.1831 21.2034 13.4501 18.9839 15.1133C19.9311 15.8772 20.8924 16.6534 21.7548 17.3557C22.1169 17.0615 22.4977 16.7487 22.8926 16.4244L22.8927 16.4243C23.4072 16.0017 23.9456 15.5595 24.4975 15.1133C23.522 14.4111 22.8999 13.3885 23.013 12.1071C23.0979 11.1831 23.5503 10.3822 24.3844 9.76618C26.0243 8.54644 28.3712 8.64501 29.8556 10.0003C31.4955 11.4788 31.3259 13.3145 29.3608 15.1996C29.4956 15.2779 29.6332 15.3525 29.7705 15.4269C30.0653 15.5866 30.3586 15.7455 30.619 15.9388C31.9197 16.8629 32.6548 18.058 32.7255 19.5364C32.736 19.7695 32.7426 19.851 32.746 19.8933C32.7472 19.9081 32.748 19.9181 32.7485 19.9281C32.7494 19.9492 32.7488 19.9703 32.7469 20.0357C32.7453 20.0906 32.7429 20.1765 32.7396 20.3196C32.7255 20.9233 32.4427 21.1451 31.7359 21.1698H31.3824H1.58059C0.393043 21.1698 0.166843 20.9973 0.195118 19.9623C0.195822 19.9231 0.196455 19.8866 0.197046 19.8525C0.202351 19.5465 0.204264 19.4361 0.222904 19.3287C0.23342 19.268 0.24926 19.2083 0.274037 19.1149C0.298835 19.0215 0.332584 18.8943 0.378906 18.6986C0.788893 17.1093 1.96231 16.0004 3.72949 15.2981ZM13.3226 5.8871C13.181 5.77549 13.0393 5.66387 12.8952 5.55063C14.7007 3.94611 14.2013 1.95339 13.2794 0.95703C12.1525 -0.246365 10.2446 -0.324003 9.02818 0.775874C8.43917 1.31934 8.09344 1.99221 8.01661 2.79447C7.91417 3.94611 8.36234 4.86483 9.19465 5.56357C8.64262 5.98506 8.12584 6.39467 7.50922 6.88342L7.42759 6.94812C9.16904 7.43983 10.2959 8.46207 11.0513 10.0278C11.7812 8.42325 12.9464 7.46571 14.6623 6.93518C14.1725 6.55671 13.7476 6.22191 13.3226 5.8871Z" fill="#7139FF"/>
                                                </svg>
                                            </div>
                                            <div style={{ flexGrow: 1, fontSize: 15, fontWeight: 500, lineHeight: '30px', letterSpacing: '0.15px' }}>{title}</div>
                                            <div>
                                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1.12549 1L7.6367 7" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                                    <path d="M7.63672 7L1.12551 13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                                                </svg>
                                            </div>
                                        </Stack>
                                    ))}
                                </div>
                            </Stack>
                            <AppBanner title="Установите наше приложение, пожалуйста"/>
                        </Stack>
                    </div>
                </SwipeableDrawer>
            )}
            <Dialog onClose={toggleProfile} open={profile} fullScreen TransitionComponent={TransitionDialog}>
                <Profile onClose={toggleProfile} onLogout={toggleMenu} />
            </Dialog>
            <Dialog onClose={toggleUserMeets} open={userMeets} fullScreen TransitionComponent={TransitionDialog}>
                <UserMeets onClose={toggleUserMeets} />
            </Dialog>
            <Dialog onClose={toggleMeet} open={meet} fullScreen TransitionComponent={TransitionDialog}>
                <CreateMeet onClose={toggleMeet} />
            </Dialog>
        </>
    )
};
