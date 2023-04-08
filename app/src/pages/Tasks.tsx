import React from 'react';
import {Box, Stack} from "@mui/material";
import TaskCard from "../components/TaskCard";
import {useOnlyUserTasks} from "../modules/task";

export default function TasksPage() {
    const { data: tasks = [] } = useOnlyUserTasks()

    return (
        <>
            {Boolean(tasks.length) ? (
                <Stack spacing={2}>
                    {tasks.map((task) => <TaskCard key={task.id} task={task} onClick={() => setUserTaskId(task.id)} />)}
                </Stack>
            ) : (
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                >
                    <span>Заданий нет. Попробуйте заглянуть сюда позднее, - задания обязательно появятся.</span>
                </Box>
            )}
        </>
    );
}