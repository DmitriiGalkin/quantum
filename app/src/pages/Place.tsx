import * as React from 'react';
import Typography from '@mui/material/Typography';
import {usePlace} from "../modules/place";
import {Stack} from "@mui/material";
import ProjectCard from "../components/cards/ProjectCard";
import {useNavigate, useParams} from "react-router-dom";
import Back from "../components/Back";
import QContainer from "../components/QContainer";

export default function PlaceDialog() {
    const { id: placeId } = useParams();
    const navigate = useNavigate();

    const { data: place } = usePlace(Number(placeId))
    if (!place) return null;

    return (
        <>
            <Back title={place.title}/>
            <QContainer>
                <Stack spacing={2}>
                    <Typography>
                        {place.description}
                    </Typography>
                    <Stack spacing={2}>
                        {place.projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => navigate(`/project/${project.id}`)}
                            />
                        ))}
                    </Stack>
                </Stack>
            </QContainer>
        </>
    );
}
