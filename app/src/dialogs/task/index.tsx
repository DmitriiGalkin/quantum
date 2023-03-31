import React from 'react';
import ForwardAppBar from "../../components/ForwardAppBar";
import {Task, useEditUserTask, useTask} from "../../modules/task";
import {Container} from "@mui/material";
import SelectEmotion from "./SelectEmotion";
import {useEditUser, useUser} from "../../modules/user";
import Dialog from "@mui/material/Dialog";

export interface TaskDialogProps {
    taskId: number;
    onClose: () => void;
}
export default function TaskDialog({ taskId, onClose }: TaskDialogProps) {
    const { data: user = {} as Task } = useUser(taskId)
    const { data: task = {} as Task } = useTask(taskId)

    const editTask = useEditUserTask()
    const editUser = useEditUser(1)

    const onClick = (v: number) => {
        editTask.mutate({ ...task, result: JSON.stringify({ emotion: v }) })
        setTimeout(() => {
            editUser.mutate({ ...user, points: user.points + task.points })
        }, 10)
        window.history.back()
    };

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <ForwardAppBar title={task.title} onClick={onClose} />
            <Container style={{ paddingTop: 20 }}>
                <SelectEmotion onClick={(v) => onClick(v)}/>
            </Container>
        </Dialog>
    );
}