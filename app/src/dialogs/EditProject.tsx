import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddProject, useDeleteProject, useEditProject, useProject} from "../tools/service";
import {Button, DialogHeader, ImageField, Input, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {PlaceSelect} from "../components/PlaceSelect";
import {AgeField} from "../components/AgeField";
import {Place, Project} from "../tools/dto";
import {Block} from "../components/Block";
import {ParticipationCard} from "../cards/ParticipationCard";
import ProjectForm from "../components/ProjectForm";

export interface EditProjectProps {
    projectId?: number
    onClose: () => void
    onDeleteProject: () => void
}
function EditProject({ projectId, onClose, onDeleteProject }: EditProjectProps) {
    const { data: defaultProject, refetch } = useProject(projectId)
    const [project, setProject] = useState<Partial<Project>>({ title: '' })
    const addProject = useAddProject()
    const editProject = useEditProject(project.id)

    useEffect(() => defaultProject && setProject(defaultProject), [defaultProject])

    const onClickSave = () => {
        if (project.id) {
            editProject.mutateAsync(project).then(onClose)
        } else {
            addProject.mutateAsync(project).then(onClose)
        }
    };

    const deleteProject = useDeleteProject()
    const onDelete =  () => deleteProject.mutateAsync(project.id).then(onDeleteProject)

    return (
        <>
            <DialogHeader title={project.id ? 'Редактировать проект' : 'Новый проект'} onClick={onClose} isClose={!project.id} menuItems={project.id ? [{ title: 'Удалить', onClick: onDelete}] : undefined} />
            <DialogContent>
                <Block variant="primary">
                    <ProjectForm project={project} onChange={setProject}/>
                </Block>
                {project.id && (
                    <Block variant="secondary">
                        {Boolean(project.participations?.length) && (
                            <Block title="Участники проекта">
                                <Stack spacing={1}>
                                    {project.participations?.map((participation) => <ParticipationCard key={participation.id} participation={participation} isOrganizer refetch={refetch} />)}
                                </Stack>
                            </Block>
                        )}
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
