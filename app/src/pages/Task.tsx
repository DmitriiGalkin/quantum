import React from 'react';
import Back from "../components/Back";
import {useEditUserTask, useUserTask} from "../modules/task";
import SelectEmotion from "../components/SelectEmotion";
import {useEditUserpoints} from "../modules/user";
import {useNavigate, useParams} from "react-router-dom";
import {useProfileContext} from "../layouts/ProfileLayout";

export default function Task() {
    const { id: taskId } = useParams();
    const { user } = useProfileContext();
    const { data: userTask } = useUserTask(Number(taskId))
    const navigate = useNavigate();

    const editTask = useEditUserTask()
    const editUser = useEditUserpoints()

    const onClick = (v: number) => {
        editTask.mutate({ ...userTask, results: JSON.stringify({ emotion: v }) }) // сохраняем результат
        setTimeout(() => {
            editUser.mutate(user.points + Number(userTask?.task.points)) // начисляем баллы
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