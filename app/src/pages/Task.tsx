import React from 'react';
import Back from "../components/Back";
import {useEditUserTask, useUserTask} from "../modules/task";
import SelectEmotion from "../components/SelectEmotion";
import {useEditUserpoints, useUser} from "../modules/user";
import {useNavigate, useParams} from "react-router-dom";

export default function Task() {
    const { id: taskId } = useParams();
    const { data: user } = useUser();
    const { data: userTask } = useUserTask(Number(taskId))
    const navigate = useNavigate();

    const editTask = useEditUserTask()
    const editUser = useEditUserpoints()

    const onClick = (v: number) => {
        editTask.mutate({ ...userTask, results: JSON.stringify({ emotion: v }) }) // сохраняем результат
        setTimeout(() => {
            editUser.mutate(Number(user?.points) + Number(userTask?.task.points)) // начисляем баллы
        }, 10)
        navigate('/tasks')
    };

    return (
        <>
            <Back title={userTask?.task.title} />
            <SelectEmotion onClick={(v) => onClick(v)}/>
        </>
    );
}