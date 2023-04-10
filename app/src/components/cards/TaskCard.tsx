import React from 'react';
import {Box, Typography} from "@mui/material";
import {AutoAwesome} from '@mui/icons-material';
import {UserTask} from "../../modules/task";
import QCard from "../QCard";

interface TaskCardProps {
    task: UserTask
    onClick: () => void
}
export default function TaskCard({ task, onClick }: TaskCardProps) {
    return (
        <QCard onClick={onClick} active>
            <Box style={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
                    {task.task.title}
                </Typography>
                <AutoAwesome style={{ width: 20, height: 20 }} color="primary"/>
                <Typography variant="subtitle1" sx={{ paddingLeft: 1 }}>
                     {task.task.points}
                </Typography>
            </Box>
        </QCard>
    );
}