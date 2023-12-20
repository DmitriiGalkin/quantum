import {Box} from "@mui/material";
import React from "react";
import {ProjectCard} from "../cards/ProjectCard";
import {useProjects} from "../tools/service";
import Masonry from '@mui/lab/Masonry';
import {AppHeader} from "../components/AppHeader";

export default function Projects(): JSX.Element {
    const { data: projects = [] } = useProjects();

    return (
        <Box style={{
            backgroundColor: '#F5F5F5',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh'
        }}>
            <AppHeader/>
            <div style={{ flex: '1 1 auto', overflowY: 'auto', padding: '8px 2px 8px 8px' }}>
                <Masonry columns={2} spacing={1}>
                    {projects.map((project,index) =>
                        <ProjectCard key={project.id} project={project} />
                    )}
                </Masonry>
            </div>
        </Box>
    )
}
