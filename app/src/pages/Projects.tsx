import React, {useState} from 'react';
import ProjectCard from "../components/ProjectCard";
import {Stack} from "@mui/material";
import {useOnlyUserProjects} from "../modules/user";
import {PlaceDialog} from "./PlaceDialog";

export default function ProjectsPage() {
    const { data: projects = [] } = useOnlyUserProjects()
    const [placeId, setPlaceId] = useState<number>()

    return (
        <>
            <Stack spacing={2}>
                {projects.map((project) => <ProjectCard key={project.id} {...project} onClick={() => setPlaceId(project.id)}/>)}
            </Stack>
            {placeId && <PlaceDialog placeId={placeId} onClose={() => setPlaceId(undefined)} />}
        </>
    );
}
