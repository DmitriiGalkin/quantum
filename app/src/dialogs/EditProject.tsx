import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddProject, useEditProject, useProject} from "../tools/service";
import {Button, DialogHeader, ImageField, Input, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {PlaceSelect} from "../components/PlaceSelect";
import {AgeField} from "../components/AgeField";
import {Place, Project} from "../tools/dto";
import {Block} from "../components/Block";
import {ParticipationCard} from "../cards/ParticipationCard";

export interface EditProjectProps {
    projectId?: number
    onClose: () => void
}
function EditProject({ projectId, onClose }: EditProjectProps) {
    const { data: defaultProject, refetch } = useProject(projectId)
    const [project, setProject] = useState<Partial<Project>>({ title: '' })
    const addProject = useAddProject()
    const editProject = useEditProject(project.id)

    useEffect(() => defaultProject && setProject(defaultProject), [defaultProject])
    const onChangePlace = useCallback((place: Place) => setProject({ ...project, placeId: place.id}), [project, setProject])

    const onClickSave = () => {
        if (project.id) {
            editProject.mutateAsync(project).then(onClose)
        } else {
            addProject.mutateAsync(project).then(onClose)
        }
    };

    return (
        <>
            <DialogHeader title={project.id ? 'Редактировать проект' : 'Новый проект'} onClick={onClose} isClose />
            <DialogContent>
                <Block variant="primary">
                    <Input
                        name='title'
                        label="Название"
                        value={project.title}
                        onChange={(e) => setProject({ ...project, title: e.target.value})}
                        autoFocus
                    />
                    <Textarea
                        name='title'
                        label="Описание"
                        value={project.description}
                        onChange={(e) => setProject({ ...project, description: e.target.value})}
                    />
                    <ImageField
                        name="meetImage"
                        label="Обложка"
                        value={project.image}
                        onChange={(image) => setProject({ ...project, image })}
                    />
                    <PlaceSelect
                        onChange={onChangePlace}
                        value={project.placeId}
                    />
                    <AgeField
                        ageFrom={project.ageFrom}
                        ageTo={project.ageTo}
                        onChange={({ ageFrom, ageTo }) => setProject({...project, ageFrom, ageTo})}
                    />
                </Block>
                {project.id && (
                    <Block variant="secondary">
                        <Block title="Участники проекта">
                            <Stack spacing={1}>
                                {project.participations?.map((participation) => <ParticipationCard key={participation.id} participation={participation} isOrganizer refetch={refetch} />)}
                            </Stack>
                        </Block>
                    </Block>
                )}
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultProject) === JSON.stringify(project) ? 'none' : 'block' }}>
                <Button onClick={onClickSave}>
                    { project.id ? 'Сохранить' : "Создать" }
                </Button>
            </div>
        </>
    );
}
export default withDialog(EditProject)
