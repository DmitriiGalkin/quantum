import React, {useEffect, useState} from 'react';
import {useProjects, useUpdateUser, useUser, useUserMeets} from "../tools/service";
import {User} from "../tools/dto";
import {Stack} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {Button, DialogHeader, ProjectCard, TransitionDialog} from "../components";
import {useAuth} from "../tools/auth";
import Dialog from "@mui/material/Dialog";
import CreateProject from "./CreateProject";
import {useToggle} from "usehooks-ts";

export interface ProjectsProps {
    onClose: () => void
}
export default function Projects({ onClose }: ProjectsProps) {
    const { data: projects, refetch } = useProjects();
    const [project, toggleProject] = useToggle()

    return (
        <>
            <DialogHeader title="Проекты" onClick={onClose}/>
            <div onClick={toggleProject} style={{ display: 'flex' }}>
                Создать новый проект
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 11H2" stroke="white" strokeWidth="2.25" strokeLinecap="round"/>
                    <path d="M11 2L11 20" stroke="white" strokeWidth="2.25" strokeLinecap="round"/>
                </svg>
            </div>
            <Stack spacing={2} style={{ backgroundColor: '#F5F5F5', padding: '15px' }}>
                {projects?.map((project) =>
                    <div key={project.id}>
                        <ProjectCard project={project} refetch={refetch} />
                    </div>
                )}
            </Stack>
            <Dialog onClose={toggleProject} open={project} fullScreen TransitionComponent={TransitionDialog}>
                <CreateProject onClose={toggleProject} />
            </Dialog>
        </>
    );
}