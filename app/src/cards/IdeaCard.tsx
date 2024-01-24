import React, {useState} from 'react';
import {Idea, Project} from "../tools/dto";
import {Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {useNavigate} from "react-router-dom";
import {getAgeLabel} from "../tools/helper";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import {Button} from "../components";
import CreateProject from "../dialogs/CreateProject";
import SelectProject from "../dialogs/SelectProject";
import {useCreateInvite, useCreateParticipation} from "../tools/service";

interface IdeaCardProps {
    idea: Idea
    refetch: () => void
    onClick?: (idea: Idea) => void
}
export function IdeaCard({ idea, refetch, onClick }: IdeaCardProps) {

    return (
        <div onClick={() => onClick && onClick(idea)} style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
            <Stack spacing={2}>
                <Stack spacing={1}  justifyContent="space-between" direction="row">
                    <Typography variant="Body-Bold">{idea.title}</Typography>
                    <Typography variant="Body">{idea.user?.age} лет</Typography>
                </Stack>
                <>
                    <Typography variant="Body">{idea.description}</Typography>
                    <Typography variant="Body">{idea.latitude} {idea.longitude}</Typography>
                    <Typography variant="Body">{idea.user?.title}, {idea.user?.age} лет</Typography>
                </>
            </Stack>
        </div>
    );
}
