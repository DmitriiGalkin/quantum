import React, {useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import ForwardAppBar from "../components/ForwardAppBar";
import QContainer from "../components/QContainer";
import {useParams} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import Dialog from "@mui/material/Dialog";

const DEFAULT_PROJECT: Project = {
    id: 12,
    title: '',
    description: '',
    users: [],
    meets: [],
}

export interface CreateProjectDialogProps {
    openCreateProject: boolean
    isEdit?: boolean;
    onClose: () => void;
    setOpenProject: (open: boolean) => void
    setProjectId: (projectId: number) => void
}
export default function CreateProjectDialog({ openCreateProject, isEdit, onClose, setOpenProject, setProjectId }: CreateProjectDialogProps) {
    const { id } = useParams();
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || DEFAULT_PROJECT)
    const addProject = useAddProject()
    const updateProject = useUpdateProject()

    const onClickSave = () => {
        isEdit ? updateProject.mutate(project) : addProject.mutateAsync(project).then((projectId) => {
            setProjectId(projectId)
            setOpenProject(true)
        })
        onClose()
    };

    return (
        <Dialog onClose={onClose} open={openCreateProject} fullScreen>
            <ForwardAppBar title={isEdit ? 'Редактирование проекта' : "Создание проекта"} onClick={onClose}/>
            <QContainer>
                <TextField
                    name='title'
                    label="Название"
                    variant="standard"
                    fullWidth
                    value={project.title}
                    onChange={(e) => setProject({ ...project, title: e.target.value})}
                />
                <TextField
                    name='description'
                    label="Описание"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    value={project.description}
                    onChange={(e) => setProject({ ...project, description: e.target.value})}
                />
                <Button
                    onClick={onClickSave}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    size="large"
                >
                    Создать
                </Button>
            </QContainer>
        </Dialog>
    );
}