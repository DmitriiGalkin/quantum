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

    return (
        <>
            <DialogHeader title="Проекты" onClick={onClose}/>
            <Stack spacing={2} style={{ backgroundColor: '#F5F5F5', padding: '15px' }}>
                {projects?.map((project) =>
                    <div key={project.id}>
                        <ProjectCard project={project} refetch={refetch} />
                    </div>
                )}
            </Stack>
        </>
    );
}