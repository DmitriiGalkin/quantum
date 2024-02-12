import React, {ReactNode} from 'react';
import {Stack} from "@mui/material";
import Typography from "./Typography";
import {Block} from "./Block";
import Masonry from "@mui/lab/Masonry";
import {ProjectCard} from "../cards/ProjectCard";
import {Button} from "./Button";
import {useIdeas, useProjects} from "../tools/service";
import {useAuth} from "../tools/auth";
import {IdeaCard} from "../cards/IdeaCard";
import {Project} from "../tools/dto";

interface RecommendationProjectsProps {
    toggleProjectsC: () => void
}

export function RecommendationProjects({ toggleProjectsC }: RecommendationProjectsProps) {
    const { data: projects = [] } = useProjects();

    return (
        <Stack spacing={2}>
            {Boolean(projects.length) && (
                <>
                    <Typography variant="Header2">Проекты для вдохновения</Typography>
                    <Masonry columns={2} spacing={1}>
                        {projects.map((project) =>
                            <ProjectCard key={project.id} project={project} />
                        )}
                    </Masonry>
                </>
            )}
            <Button onClick={toggleProjectsC} variant="outlined">Банк проектов</Button>
        </Stack>
    )
}
