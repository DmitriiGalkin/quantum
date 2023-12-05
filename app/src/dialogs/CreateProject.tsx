import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddProject, useEditProject, useProject} from "../tools/service";
import {Project} from "../tools/dto";
import {Button, DialogHeader, ImageField, Input, Textarea } from "../components";
import {useParams} from "react-router-dom";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {PlaceSelect} from "../components/PlaceSelect";
import {AgeField} from "../components/AgeField";

export interface CreateProjectProps {
    onClose: () => void
}
function CreateProject({ onClose }: CreateProjectProps) {
    const { id: projectId } = useParams();
    const { data: defaultProject } = useProject(Number(projectId))
    const [project, setProject] = useState<Project>({ id: 0, title: '', description:''})
    const addProject = useAddProject()
    const editProject = useEditProject(project.id)

    useEffect(() => defaultProject && setProject(defaultProject), [defaultProject])
    const onChangePlace = useCallback((place: { latitude: string, longitude: string }) => setProject({ ...project, ...place}), [project, setProject])


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
        <>
            <DialogHeader title={project.id ? 'Редактировать проект' : 'Новый проект'} onClick={onClose} isClose />
            <DialogContent backgroundColor={'white'}>
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
                    <PlaceSelect
                        onChange={onChangePlace}
                        latitude={project.latitude}
                        longitude={project.longitude}
                    />
                    <AgeField
                        ageFrom={project.ageFrom}
                        ageTo={project.ageTo}
                        onChange={({ ageFrom, ageTo }) => setProject({...project, ageFrom, ageTo})}
                    />
                </Stack>
            </DialogContent>
            <div style={{ padding: 15 }}>
                <Button onClick={onClickSave}>
                    { project.id ? 'Сохранить' : "Создать проект" }
                </Button>
            </div>
        </>
    );
}
export default withDialog(CreateProject)
