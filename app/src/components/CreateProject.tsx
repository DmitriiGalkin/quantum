import React, {useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import Back from "./Back";
import {useNavigate, useParams} from "react-router-dom";
import {Stack} from "@mui/material";
import Input from "./fields/Input";
import Textarea from "./fields/Textarea";
import ImageField from "./fields/ImageField";
import Button from "./Button";

export interface CreateProjectDialogProps {
    onClose: () => void
    close?: boolean
}

export default function CreateProjectDialog({ onClose, close }: CreateProjectDialogProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || {} as Project)

    const addProject = useAddProject()
    const updateProject = useUpdateProject()

    const title = project.id ? 'Редактирование проекта' : "Создание проекта"
    const saveButtonTitle = project.id ? 'Сохранить' : "Создать проект"

    const onClickSave = () => {
        project.id ? updateProject.mutateAsync(project).then(() => {
            onClose()
        }) : addProject.mutateAsync(project).then((projectId) => {
            if (close) {
                onClose()
            } else {
                navigate(`/project/${projectId}`)
            }
        })
    }

    return (
        <>
            <Back title={title} onClick={onClose}/>
            <div style={{ padding: '16px 18px'}}>
                <Stack spacing={2}>
                    <Input
                        name='title'
                        label="Название"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value})}
                    />
                    <Textarea
                        name='title'
                        label="Описание"
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value})}
                    />
                    <ImageField
                        label="Загрузите обложку"
                        onChange={(image) => setProject({...project, image})}
                    />
                </Stack>
                <div style={{ paddingTop: 22 }}>
                    <Button onClick={onClickSave}>
                        {saveButtonTitle}
                    </Button>
                </div>
            </div>
        </>
    );
}