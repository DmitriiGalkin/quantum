import {Stack} from "@mui/material";
import React from "react";
import {useProjects} from "../tools/service";
import {ProjectCard} from "../components";

export default function Projects(): JSX.Element {
    const { data: projects, refetch } = useProjects();

    return (
        <div style={{ padding: 8 }}>
            <div style={{ columnWidth: 150, columnGap: 15 }}>
                {projects?.map((project) =>
                    <div key={project.id} style={{ display: 'inline-block', breakInside: 'avoid' }}>
                        <ProjectCard project={project} refetch={refetch} />
                    </div>
                )}
            </div>
        </div>
    )
}
