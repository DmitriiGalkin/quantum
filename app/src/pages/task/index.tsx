import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import ForwardAppBar from "../../components/ForwardAppBar";
import {useParams} from "react-router-dom";
import {Task, useEditTask, useTask} from "../../modules/task";
import CampaignIcon from '@mui/icons-material/Campaign';
import {Button, Container, Theme} from "@mui/material";
import SelectEmotion from "./SelectEmotion";
import {useEditUser, useUser} from "../../modules/user";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        height: 0,
        paddingTop: '156.25%', // 16:9
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    title: {
        paddingTop: theme.spacing(1),
    },
}));

export default function UserView() {
    const classes = useStyles();
    const { id } = useParams();
    const { data: user = {} as Task } = useUser(1)
    const { data: task = {} as Task } = useTask(Number(id))
    const campaignIconOnClick = () => {
        let utterance = new SpeechSynthesisUtterance(task.title);
        speechSynthesis.speak(utterance);
    }
    const [emotion, setEmotion] = useState<number>()
    const editTask = useEditTask()
    const editUser = useEditUser(1)

    const onClick = () => {
        editTask.mutate({ ...task, result: JSON.stringify({ emotion }) })
        setTimeout(() => {
            editUser.mutate({ ...user, points: user.points + task.points })
        }, 10)

    };

    return (
        <div className={classes.root}>
            <ForwardAppBar title={task.title} icon={<CampaignIcon/>} onClick={campaignIconOnClick}/>
            <Container style={{ paddingTop: 20 }}>
                <SelectEmotion onClick={(v) => setEmotion(v)}/>
                {emotion === 6 && 'У тебя сегодня прекрасное настроение!'}
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={onClick}
                >
                    Отправить
                </Button>
            </Container>
        </div>
    );
}