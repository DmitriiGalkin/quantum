import React, {useState} from 'react';
import {Stack, Theme} from "@mui/material";
import {Calendar, MeetCard, TransitionDialog} from "../components";
import {CalendarDay} from "../tools/helper";
import {Meet} from "../tools/dto";
import dayjs from "dayjs";
import {useAuth} from "../tools/auth";
import Dialog from "@mui/material/Dialog";
import CreateMeet from "./CreateMeet";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
    speedDeal: {
        position: 'fixed',
        bottom: 0,
        left: 'calc(50% - 30px)',
        zIndex:100,
        boxShadow: '0px 2.769230604171753px 12.923076629638672px 0px rgba(0, 0, 0, 0.05)',
        border: 1,
        backgroundColor: 'orange',
        padding: 20,
        borderRadius: 50,
        display: 'flex'
    },
}));

interface MeetsProps {
    meets: Meet[]
    week: CalendarDay[]
    refetch?: () => void
    onChangeDay?: (date: string) => void
    selectedMeet?: Meet
}
export default function Meets({meets, refetch, onChangeDay, week, selectedMeet}: MeetsProps) {
    const classes = useStyles();
    const { isAuth } = useAuth();
    const [meet, setMeet] = useState<Meet>()
    const onAdd = () => setMeet({ id: 0, title: '', description:'', x: '55.933093', y: '37.054661', datetime: dayjs().format('YYYY-MM-DD HH:mm:ss')})

    return (
        <>
            <Stack spacing={4} direction="column" style={{ position: 'relative' }}>
                <Calendar week={week} onChange={onChangeDay} />
                {Boolean(meets.length) && (
                    <Stack spacing={2}>
                        {meets.map((meet, index) =>
                            <div key={meet.id}>
                                <div key={meet.id}>
                                    <MeetCard meet={meet} selected={selectedMeet?.id === meet.id} refetch={refetch} />
                                </div>
                            </div>
                        )}
                    </Stack>
                )}
            </Stack>
            {isAuth && (
                <div className={classes.speedDeal} onClick={onAdd}>
                    <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.49642 12.4964H9.50358V20.5036C9.50358 21.3174 10.173 22 11 22C11.827 22 12.4964 21.3174 12.4964 20.5036V12.4964H20.5036C21.3174 12.4964 22 11.827 22 11C22 10.173 21.3174 9.50358 20.5036 9.50358H12.4964V1.49642C12.4964 0.682578 11.827 0 11 0C10.173 0 9.50358 0.682578 9.50358 1.49642V9.50358H1.49642C0.682578 9.50358 0 10.173 0 11C0 11.827 0.682578 12.4964 1.49642 12.4964Z" fill="white"/>
                    </svg>
                </div>
            )}
            <Dialog onClose={() => setMeet(undefined)} open={Boolean(meet)} fullScreen TransitionComponent={TransitionDialog}>
                {meet && (
                    <CreateMeet onClose={() => setMeet(undefined)} meet={meet} setMeet={setMeet} />)}
            </Dialog>
        </>
    );
}
