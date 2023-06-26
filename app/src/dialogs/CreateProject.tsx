import React, {ChangeEvent, useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import Back from "../components/Back";
import QContainer from "../components/QContainer";
import {useNavigate, useParams} from "react-router-dom";
import {Stack, TextField} from "@mui/material";
import {useUploadImage} from "../modules/image";
import ImageComponent from "../components/Image";
import {compress} from "../tools/image";
import {LoaderWrapper} from "../components/LoaderWrapper";
import InputField from "../components/fields/InputField";
import TextareaField from "../components/fields/TextareaField";
import ImageField from "../components/fields/ImageField";
import Button from "../components/Button";

export interface CreateProjectDialogProps {
    onClose: () => void
    close?: boolean
}

export default function CreateProjectDialog({ onClose, close }: CreateProjectDialogProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || {} as Project)
    const [imageLoading, setImageLoading] = useState(true) // Флаг загрузки изображения по внешнему src

    const addProject = useAddProject()
    const updateProject = useUpdateProject()
    const uploadImage = useUploadImage()

    const title = project.id ? 'Редактирование проекта' : "Создание проекта"
    const saveButtonTitle = project.id ? 'Сохранить' : "Создать"
    const loading = uploadImage.isLoading || imageLoading

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
            <div style={{ padding: '25px 22px'}}>
                <Stack spacing={2}>
                    <InputField
                        name='title'
                        label="Название"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value})}
                    />
                    <TextareaField
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
                <div style={{ paddingTop: 22, marginLeft: -11, marginRight: -11 }}>
                    <Button onClick={onClickSave}>
                        {saveButtonTitle}
                    </Button>
                </div>
            </div>
        </>
    );
}