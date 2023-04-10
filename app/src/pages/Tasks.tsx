import React from 'react';
import {Box, Stack} from "@mui/material";
import Task from "../components/cards/TaskCard";
import {useOnlyUserTasks} from "../modules/task";
import {useNavigate} from "react-router-dom";

export default function TasksPage() {
    const { data: tasks = [] } = useOnlyUserTasks()
    const navigate = useNavigate();

    return (
        <>
            {Boolean(tasks.length) ? (
                <Stack spacing={2}>
                    {tasks.map((task) => <Task key={task.id} task={task} onClick={() => navigate(`/task/${task.id}`)} />)}
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