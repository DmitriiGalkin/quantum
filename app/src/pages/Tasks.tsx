import React from 'react';
import {Stack} from "@mui/material";
import TaskCard from "../components/TaskCard";
import {useOnlyUserTasks} from "../modules/task";

export default function TasksPage() {
    const { data: tasks = [] } = useOnlyUserTasks()

    return (
        <Stack spacing={2}>
            {tasks.map((task) => <TaskCard key={task.taskId} {...task} />)}
        </Stack>
    );
}
