import React from 'react';
import {UserTask} from "../modules/task";
import {Box, Button, Chip, Tooltip, Typography} from "@mui/material";
import {AutoAwesome} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";

export default function TaskCard(userTask: UserTask) {
    const navigate = useNavigate();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', border: '1px solid #E1E3E8',
            borderRadius: 2,
            padding: 2,
            '& > * + *': {
                marginTop: 2,
            },
            marginBottom: 2,
        }}>
            <div>
                <Typography variant="h5">
                    {userTask.task.title}
                </Typography>
            </div>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="div" style={{ flexGrow: 1 }}>
                    Количество баллов
                </Typography>
                <AutoAwesome style={{ width: 20, height: 20 }} color="primary"/>
                <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                     {userTask.task.points}
                </Typography>
            </Box>
            <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{
                    borderRadius: 2,
                    marginRight: 2,
                    marginTop: 1,
                }}
                onClick={() => navigate(`/task/${userTask.id}`)}
            >
                Начать
            </Button>


        </Box>
    );
}