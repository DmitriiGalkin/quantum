import React, {ChangeEvent, useRef, useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import Back from "../components/Back";
import QContainer from "../components/QContainer";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Stack, TextField} from "@mui/material";
import axios from "axios";
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
    const [previewImage, setPreviewImage] = useState<string | undefined>()

    const addProject = useAddProject()
    const updateProject = useUpdateProject()
    const navigate = useNavigate();

    // const uploadS3Image = async () => {
    //     console.log(previewImage, 'previewImage')
    //     const file = previewImage
    //     const filename = uuid() + '.' + String(re.exec(file.name)?.[1])
    //
    //     const params = {
    //         Bucket: 'quantum-education', // имя bucket
    //         Key: filename, // имя файла в облаке
    //         Body: blobfile, //fs.readFileSync(file.filepath), // данные файла в blob
    //         ContentType: file.type, // тип файла
    //     }
    //
    //     await new Promise(function(resolve, reject) {
    //         S3.send(new PutObjectCommand(params)).then(
    //             (data: any) => {
    //                 console.log(data)
    //                 resolve(data)
    //             },
    //             (error: any) => {
    //                 console.log(error)
    //                 reject(error)
    //             }
    //         );
    //     });
    // }

    const onClickSave = (image: string) => {
        // const image = uploadS3Image()

        project.id ? updateProject.mutateAsync({ ...project, image }).then(() => {
            onClose()
        }) : addProject.mutateAsync({ ...project, image }).then((projectId) => {
            navigate(`/project/${projectId}`)
        })
    };
    const title = project.id ? 'Редактирование проекта' : "Создание проекта"
// previewImage: ,

    const selectFile = (event: any) => {
        setPreviewImage(URL.createObjectURL(event.target.files[0]))
    }
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

        var formData = new FormData();
        formData.append("image", file);

        console.log(formData,'formData')
        // axios.post('http://localhost::4000/s3', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then((data) => console.log(data))
        //     .catch((err) => console.error(err));

        axios({
            method: "post",
            url: 'http://localhost:4000/s3',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((data) => {
            onClickSave(data.data)
        });
// onClickSave
    };

    const src = file && URL.createObjectURL(file)


    return (
        <>
            <Back title={title} onClick={onClose}/>
            <QContainer>
                <Stack spacing={2}>
                        {src && (
                            <div>
                                <img src={src} alt="" />
                            </div>
                        )}
                        <Button
                            variant="contained"
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
                            Создать
                        </Button>
                </Stack>
            </QContainer>
        </>
    );
}