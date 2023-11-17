import {Stack} from "@mui/material";
import React from "react";
import {useProjects} from "../tools/service";
import {ProjectCard} from "../components";

export default function Projects(): JSX.Element {
    const { data: projects, refetch } = useProjects();

    return (
        <Stack spacing={2}>
            {projects?.map((project) =>
                <div key={project.id}>
                    <ProjectCard project={project} refetch={refetch} />
                </div>
            )}
        </Stack>    )
}
