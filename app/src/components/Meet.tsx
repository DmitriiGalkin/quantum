import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Avatar, AvatarGroup, Box, Button, Stack, Theme, Typography} from "@mui/material";
import {Meet, NewMeet, useMeet} from "../modules/meet";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: -38,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `38px 38px 0 0`,
        padding: '25px 33px'
    },
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    image: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
    },
}));
interface MeetComponentProps {
    meet: Meet
    renderHeader?: () => JSX.Element
    renderFooter?: () => JSX.Element
}
export default function MeetComponent({meet, renderHeader, renderFooter}: MeetComponentProps) {
    const classes = useStyles();

    if (!meet) { return null }


    const parameters = [
        {
            title: 'Дата',
            value: 'Июнь 15',
        },
        {
            title: 'Начало',
            value: '19:00',
        },
        {
            title: 'Длительность',
            value: '3ч 30м',
        },
        {
            title: 'Место',
            value: 'Лесной дом',
        }
    ]

    return (
        <div style={{ position: "relative"}}>
            <img src={meet.project.image} className={classes.image}/>
            <div style={{ position: "absolute", top: 25, left: 21, right: 25 }}>
                {renderHeader && renderHeader()}
            </div>
            <div style={{ position: "relative"}}>
                <div className={classes.container}>
                    <Typography variant="h1">
                        {meet.title || 'Заголовок'}
                    </Typography>
                    <Typography variant="body1" style={{ paddingTop: 31}}>
                        {meet.description || 'Описание'}
                    </Typography>
                    <div style={{ paddingTop: 50}}>
                        <Typography variant="body1">
                            Участники
                        </Typography>
                        {Boolean(meet.users.length) ? (
                            <Box sx={{ display: 'flex', paddingTop: 1 }}>
                                <AvatarGroup max={4}>
                                    {meet.users.map((user) => (
                                        <Avatar alt={user.title} src={user.image} />
                                    ))}
                                </AvatarGroup>
                            </Box>
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                Участников нет
                            </Typography>
                        )}
                    </div>
                    <div id="parameters" style={{ paddingTop: 50}}>
                        {parameters.map(({ title, value }, index) => (
                            <Stack spacing={2} direction="row" justifyContent="space-between" style={{ paddingTop: 10 }}>
                                <Typography variant="h5">
                                    {title}
                                </Typography>
                                <Typography variant="h5" style={{ color: '#7139FF' }}>
                                    {value}
                                </Typography>
                            </Stack>
                        ))}
                    </div>
                    <div style={{ paddingTop: 50}}>
                        <img src="/1686906706498.jpg" style={{ width: '100%', display: 'block' }}/>
                    </div>
                    <div style={{ paddingTop: 22, marginLeft: -11, marginRight: -11 }}>
                        {renderFooter && renderFooter()}
                    </div>
                </div>
            </div>

        </div>
    );
}
