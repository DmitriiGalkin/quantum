import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import Typography from "./Typography";
import {Block} from "./Block";
import Masonry from "@mui/lab/Masonry";
import {ProjectCard} from "../cards/ProjectCard";
import {Button} from "./Button";
import {useIdeas, useProjects} from "../tools/service";
import {useAuth} from "../tools/auth";
import {Project} from "../tools/dto";

interface ProjectsProps {
    items: Project[]
}
export function Projects({ items }: ProjectsProps) {
    return Boolean(items.length) && (
        <Masonry columns={2} spacing={1}>
            {items.map((project) =>
                <ProjectCard key={project.id} project={project} />
            )}
        </Masonry>
    )
}
