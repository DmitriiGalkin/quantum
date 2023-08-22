import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddProject, useEditProject, useProject} from "../tools/service";
import {Project} from "../tools/dto";
import {Button, DialogHeader, ImageField, Input, Textarea,} from "../components";
import {useParams} from "react-router-dom";
import {TimingField} from "../components/TimingField";

export interface CreateProjectProps {
    onClose: () => void
}
export default function CreateProject({ onClose }: CreateProjectProps) {
    const { id: projectId } = useParams();
    const { data: defaultProject } = useProject(Number(projectId))
    const [project, setProject] = useState<Project>({ id: 0, title: '', description:''})
    const addProject = useAddProject()
    const editProject = useEditProject(project.id)

    useEffect(() => defaultProject && setProject(defaultProject), [defaultProject])

    if (!project) return null;

    const onClickSave = () => {
        if (project.id) {
            editProject.mutateAsync({ ...project }).then(onClose)
        } else {
            addProject.mutateAsync({ ...project }).then(() => {
                onClose()
            })
        }
    };

    return (
        <div>
            <DialogHeader title={project.id ? 'Редактировать проект' : 'Создание проекта'} onClick={onClose} isClose />
            <div style={{ padding: '16px 18px'}}>
                <Stack spacing={5}>
                    <Stack spacing={1} direction="row">
                        <div style={{ paddingRight: 8, flexGrow: 1, width: '100%' }}>
                            <Input
                                name='title'
                                label="Название"
                                value={project.title}
                                onChange={(e) => setProject({ ...project, title: e.target.value})}
                                placeholder="Введите название проекта"
                                autoFocus
                            />
                        </div>
                    </Stack>
                    <Textarea
                        name='title'
                        label="Описание"
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value})}
                        placeholder="Кратко опишите проект"
                    />
                    <ImageField
                        name="meetImage"
                        label="Загрузите обложку"
                        value={project.image}
                        onChange={(image) => setProject({ ...project, image })}
                    />
                    <TimingField
                        values={project.timing || []}
                        onChange={(values) => setProject({ ...project, timing: values })}
                    />
                </Stack>
                <div style={{ paddingTop: 22 }}>
                    <Button onClick={onClickSave}>
                        { project.id ? 'Сохранить' : "Создать проект" }
                    </Button>
                </div>
            </div>
        </div>
    );
}