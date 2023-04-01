import React from 'react';
import {Box, Card, CardContent, Typography} from "@mui/material";
import {AutoAwesome} from '@mui/icons-material';
import {UserTask} from "../modules/task";

interface TaskCardProps {
    task: UserTask
    onClick: () => void
}
export default function TaskCard({ task, onClick }: TaskCardProps) {
    return (
        <Card onClick={onClick} style={{ backgroundColor: 'rgba(255,204,0,0.4)' }}>
            <CardContent>
                <div>
                    <Typography variant="h5">
                        {task.task.title}
                    </Typography>
                </div>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography component="div" style={{ flexGrow: 1 }}>
                        Количество баллов
                    </Typography>
                    <AutoAwesome style={{ width: 20, height: 20 }} color="primary"/>
                    <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                         {task.task.points}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}