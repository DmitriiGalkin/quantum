import React, {useState} from 'react';
import {Button, MobileStepper, Stack} from "@mui/material";
import {DialogHeader, Input, ProjectCard, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Idea, Passport, Place, Project, User} from "../tools/dto";
import {Block} from "../components/Block";
import {useAuth} from "../tools/auth";
import ProjectForm from "../components/ProjectForm";


interface FastProjectData {
    project: Partial<Project>
    place: Partial<Place>
}

export const FAST_PROJECT = 'fastProject'

export interface FastProjectProps {
    onClose: () => void
}
function FastProject({ onClose }: FastProjectProps) {
    const { openLogin } = useAuth();
    const [data, setData] = useState<FastProjectData>({project:{}, place:{}});
    const onSubmit = () => {
        localStorage.setItem(FAST_PROJECT, JSON.stringify(data));
        openLogin()
    }

    return (
        <>
            <DialogHeader title="Быстрый проект" onClick={onClose} />
            <DialogContent>
                <Block variant="primary">
                    <ProjectForm project={data.project} onChange={(project) => setData({ ...data, project })}/>
                </Block>
            </DialogContent>
        </>
    );
}
export default withDialog(FastProject)
