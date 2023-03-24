import React from 'react';
import {Alert, Stack} from "@mui/material";
import TaskCard from "../components/TaskCard";
import {useOnlyUserTasks} from "../modules/task";

export default function TasksPage() {
    const { data: tasks = [] } = useOnlyUserTasks()

    return (
        <Stack spacing={2}>
            {tasks.map((task) => <TaskCard key={task.id} {...task} />)}
            <Alert variant="outlined" severity="warning">
                Новых заданий нет, - задания появляются со временем или после продвижения проектов
            </Alert>
        </Stack>
    );
}
