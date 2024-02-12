import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {Button, DialogHeader, ImageField, Input, Textarea} from "../components";
import {AgeField} from "../components/AgeField";
import {Place, Project} from "../tools/dto";

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
        </>
    );
}
export default ProjectForm
