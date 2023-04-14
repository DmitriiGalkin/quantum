import React, {ChangeEvent, useRef, useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import Back from "../components/Back";
import QContainer from "../components/QContainer";
import {useNavigate, useParams} from "react-router-dom";
import {Button, CardMedia, Stack, TextField} from "@mui/material";
import axios from "axios";
import {useUploadImage} from "../modules/image";
// import S3 from "../tools/s3";
// import path from "path";
// import fs from "fs";
// const { v4: uuid } = require('uuid');
// const { PutObjectCommand } = require('@aws-sdk/client-s3');
// const mime = require('mime');
// var re = /(?:\.([^.]+))?$/;



export interface CreateProjectDialogProps {
    onClose: () => void
}
export default function CreateProjectDialog({ onClose }: CreateProjectDialogProps) {
    const { id } = useParams();
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || {} as Project)

    const addProject = useAddProject()
    const updateProject = useUpdateProject()
    const uploadImage = useUploadImage()

    const navigate = useNavigate();

    const onClickSave = (image: string) => {
        project.id ? updateProject.mutateAsync({ ...project, image }).then(() => {
            onClose()
        }) : addProject.mutateAsync({ ...project, image }).then((projectId) => {
            navigate(`/project/${projectId}`)
        })
    };

    const [file, setFile] = useState<File>();
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("image", file);

        uploadImage.mutateAsync(formData).then((image) => onClickSave(image))
    };

    const src = file ? URL.createObjectURL(file) : project.image
    const title = project.id ? 'Редактирование проекта' : "Создание проекта"
    const saveButtonTitle = project.id ? 'Сохранить' : "Создать"

    return (
        <>
            <Back title={title} onClick={onClose}/>
            <QContainer>
                <Stack spacing={2}>
                        {src && (
                            <CardMedia
                                component="img"
                                image={src}
                                alt={project.title}
                            />
                        )}
                        <Button
                            variant="outlined"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                id="file"
                                name="customFile"
                                accept="image/*"
                                hidden
                                onChange={handleFileChange}
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
                            onClick={handleUploadClick}
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