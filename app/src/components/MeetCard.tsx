import React from 'react';
import {Meet} from "../tools/dto";
import {convertToMeetDate, convertToMeetTime} from "../tools/date";
import {Avatar, AvatarGroup, Box, Stack, Typography} from "@mui/material";
import {useToggleMeetUser} from "../tools/service";
import {makeStyles} from '@mui/styles';
import {DEFAULT_COLOR} from "../tools/theme";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../tools/auth";

interface MeetCardProps {
    meet: Meet
    selected?: boolean
    refetch?: () => void
}
const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '116%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 9.5,
    },
}));
export function MeetCard({ meet, selected, refetch }: MeetCardProps) {
    const { isAuth, openLogin } = useAuth();
    const toggleMeetUser = useToggleMeetUser()
    const classes = useStyles();
    const navigate = useNavigate();

    const time = convertToMeetTime(meet.datetime)
    const date = convertToMeetDate(meet.datetime)

    const onClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isAuth) {
            toggleMeetUser.mutateAsync(meet.id).then(refetch)
        } else {
            openLogin()
        }
    }
    const title = meet.title

    return (
        <div style={{ padding: 11, backgroundColor: DEFAULT_COLOR, borderRadius: 16, border: `2px solid ${selected ? 'orange' : 'transparent'}` }} onClick={() => navigate(`/meet/${meet.id}`)}>
            <Stack spacing={2} direction="row">
                {meet.image && (
                    <div style={{ width: 90, minWidth: 90 }}>
                        <div className={classes.blockInner}>
                            <img src={meet.image} className={classes.image}/>
                        </div>
                    </div>
                )}
                <div style={{ flexGrow: 1 }}>
                    <Box style={{ display: 'flex', height: '96%' }} flexDirection="column" justifyContent="space-between">
                        <div style={{ textOverflow: 'ellipsis', width: '100%', whiteSpace: 'nowrap', fontSize: 15, overflow: 'hidden', color: '#3F3F3F', fontWeight: 500 }}>
                            {title}
                        </div>
                        <div>
                            <Stack spacing={0} direction="row" justifyContent="space-between" alignContent="center">
                                <div>
                                    {false && (
                                        <Stack spacing={1} direction="row" alignContent="center" alignItems="center">
                                            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11 5.53211C11 2.47706 8.53731 0 5.5 0C2.46269 0 0 2.47706 0 5.53211C0 7.15596 0.693201 8.61468 1.80141 9.62385C1.80141 9.62844 1.80597 9.63303 1.80597 9.63303L4.92081 12.7661C5.23093 13.078 5.73715 13.078 6.05182 12.7661C6.05182 12.7661 9.39013 9.44495 9.55431 9.26606C10.4527 8.2844 11 6.97248 11 5.53211Z" fill="#7139FF"/>
                                                <path d="M8 5.5C8 6.88333 6.88333 8 5.5 8C4.11667 8 3 6.87778 3 5.5C3 4.12222 4.11667 3 5.5 3C6.87778 3 8 4.12222 8 5.5Z" fill="white"/>
                                            </svg>
                                            <div style={{ fontSize: 13, color: 'black', opacity: 0.7 }}>
                                                10 м.
                                            </div>
                                        </Stack>
                                    )}
                                </div>
                                <span style={{ color: '#7139FF', fontSize: 13, fontWeight: 900, letterSpacing: -0.369231, textTransform: 'lowercase' }}>
                                    {date} {time}
                                </span>
                            </Stack>
                            <div style={{ flex: '1 0 auto', display: 'flex', height: 30, paddingTop: 8 }}>
                                <div style={{ flexGrow: 1 }}>
                                    {Boolean(meet.users.length) ? (
                                        <Box sx={{ display: 'flex' }}>
                                            <AvatarGroup max={4}>
                                                {meet.users.map((user) => (
                                                    <Avatar key={user.id} alt={user.title} src={user.image} sx={{ width: 21, height: 21 }} />
                                                ))}
                                            </AvatarGroup>
                                        </Box>
                                    ) : (
                                        <Typography variant="body2" color="textSecondary">
                                            Нет
                                        </Typography>
                                    )}
                                </div>
                                <div>
                                    {meet.active ? (
                                        <div style={{ backgroundColor: '#7139FF', fontSize: 11, fontWeight: 500, padding: '3px 9px', color: 'white', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }} onClick={onClick}>
                                            <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">
                                                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M3.8512 10C4.21225 10 4.5186 9.82301 4.72648 9.48009L9.73742 1.52655C9.85777 1.30531 10 1.06195 10 0.818584C10 0.320796 9.56236 0 9.10284 0C8.81838 0 8.54486 0.176991 8.34792 0.497788L3.80744 7.86504L1.64114 5.04425C1.3895 4.69027 1.13786 4.60177 0.842451 4.60177C0.36105 4.60177 0 4.98894 0 5.47566C0 5.71903 0.0875274 5.95133 0.251641 6.1615L2.91028 9.48009C3.19475 9.84513 3.47921 10 3.8512 10Z" fill="white"/>
                                                </svg>
                                                <span>Участвую</span>
                                            </Stack>
                                        </div>
                                    ) : (
                                        <div style={{ fontSize: 11, fontWeight: 500, padding: '3px 9px', color: '#7139FF', border: '1px solid #7139FF', borderRadius: 8, alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase' }} onClick={onClick}>
                                            Участвовать
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Box>
                </div>
            </Stack>
        </div>
    );
}
