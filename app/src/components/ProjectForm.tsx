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

export interface ProjectFormProps {
    project: Partial<Project>
    onChange: (project: Partial<Project>) => void
}
function ProjectForm({ project, onChange }: ProjectFormProps) {
    return (
        <>
            <Stack spacing={1} direction="row">
                <div style={{ flexGrow: 1 }}>
                    <Input
                        name='title'
                        label="Название"
                        value={project.title}
                        onChange={(e) => onChange({ ...project, title: e.target.value})}
                        autoFocus
                    />
                </div>
                <AgeField
                    ageFrom={project.ageFrom}
                    ageTo={project.ageTo}
                    onChange={({ ageFrom, ageTo }) => onChange({...project, ageFrom, ageTo})}
                />
            </Stack>
            <Textarea
                name='title'
                label="Описание"
                value={project.description}
                onChange={(e) => onChange({ ...project, description: e.target.value})}
            />
            <ImageField
                name="meetImage"
                label="Обложка"
                value={project.image}
                onChange={(image) => onChange({ ...project, image })}
            />
            <PlaceSelect
                onChange={(place: Place) => onChange({ ...project, placeId: place.id})}
                value={project.placeId}
            />
        </>
    );
}
export default ProjectForm
