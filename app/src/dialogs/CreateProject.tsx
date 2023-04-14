import React, {ChangeEvent, useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import Back from "../components/Back";
import QContainer from "../components/QContainer";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Stack, TextField} from "@mui/material";
import {useUploadImage} from "../modules/image";
import Image from "../components/Image";

export interface CreateProjectDialogProps {
    onClose: () => void
}
export default function CreateProjectDialog({ onClose }: CreateProjectDialogProps) {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || {} as Project)
    const addProject = useAddProject()
    const updateProject = useUpdateProject()
    const uploadImage = useUploadImage()

    const title = project.id ? 'Редактирование проекта' : "Создание проекта"
    const saveButtonTitle = project.id ? 'Сохранить' : "Создать"

    const onChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const formData = new FormData();
            formData.append("image", e.target.files[0]);

            return uploadImage.mutateAsync(formData).then((image) => setProject({...project, image}))
        }
    };
    const onClickSave = () => {
        project.id ? updateProject.mutateAsync(project).then(() => {
            onClose()
        }) : addProject.mutateAsync(project).then((projectId) => {
            navigate(`/project/${projectId}`)
        })
    }

    return (
        <>
            <Back title={title} onClick={onClose}/>
            <QContainer>
                <Stack spacing={2}>
                    {project.image && <Image src={project.image}/>}
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        Выбрать изображение
                        <input
                            type="file"
                            id="file"
                            name="customFile"
                            accept="image/*"
                            hidden
                            onChange={onChangeFile}
                        />
                    </Button>
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
                        {saveButtonTitle}
                    </Button>
                </Stack>
            </QContainer>
        </>
    );
}