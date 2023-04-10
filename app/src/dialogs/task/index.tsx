import React from 'react';
import Back from "../../components/Back";
import {useEditUserTask, useUserTask} from "../../modules/task";
import {Container} from "@mui/material";
import SelectEmotion from "./SelectEmotion";
import {useEditUserpoints, User, useUser} from "../../modules/user";
import Dialog from "@mui/material/Dialog";

export interface TaskDialogProps {
    userTaskId: number;
    onClose: () => void;
}
export default function TaskDialog({ userTaskId, onClose }: TaskDialogProps) {
    const { data: userTask } = useUserTask(userTaskId)
    const { data: user = {} as User } = useUser()

    const editTask = useEditUserTask()
    const editUser = useEditUserpoints(user.id)

    const onClick = (v: number) => {
        editTask.mutate({ ...userTask, results: JSON.stringify({ emotion: v }) }) // сохраняем результат
        setTimeout(() => {
            editUser.mutate(user.points + Number(userTask?.task.points)) // начисляем баллы
        }, 10)
        onClose()
    };

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <Back title={userTask?.task.title} onClick={onClose} />
            <Container style={{ paddingTop: 20 }}>
                <SelectEmotion onClick={(v) => onClick(v)}/>
            </Container>
        </Dialog>
    );
}