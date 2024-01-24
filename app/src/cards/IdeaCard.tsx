import React, {useState} from 'react';
import {Idea, Project} from "../tools/dto";
import {Avatar, AvatarGroup, Box, Chip, Stack} from "@mui/material";
import {makeStyles} from '@mui/styles';
import {useNavigate} from "react-router-dom";
import {getAgeLabel} from "../tools/helper";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import {Button, Icon} from "../components";
import CreateProject from "../dialogs/CreateProject";
import SelectProject from "../dialogs/SelectProject";
import {useCreateInvite, useCreateParticipation} from "../tools/service";
import {DialogContent} from "../components/DialogContent";
import {COLOR, COLOR_DEFAULT} from "../tools/theme";
import {Parameter} from "../components/Parameter";
import CreateMeet from "../dialogs/Meet";
import CreateIdea from "../dialogs/CreateIdea";

interface IdeaCardProps {
    idea: Idea
    refetch: () => void
}
export function IdeaCard({ idea, refetch }: IdeaCardProps) {
    const [project, toggleProject] = useToggle()
    const [create, toggleCreate] = useToggle()

    const createInvite = useCreateInvite()

    const onSelectProject = (project: Project) => {
        idea && createInvite.mutateAsync({ projectId: project.id, userId: idea.userId, ideaId: idea.id }).then(() => refetch())
    }
    return (
        <div style={{ borderRadius: 8, backgroundColor: 'white', padding: 8 }}>
            <Stack spacing={2}>
                <Stack spacing={1}  justifyContent="space-between" direction="row">
                    <Typography variant="Body-Bold">{idea.title}</Typography>
                    {true && <Icon name="edit" onClick={toggleCreate} />}
                </Stack>
                <>
                    <Typography variant="Body">{idea.description}</Typography>
                    <Typography variant="Body">{idea.latitude} {idea.longitude}</Typography>
                    <Stack spacing={1}  justifyContent="space-between" alignItems="center" direction="row">
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Avatar alt={idea.user?.title} src={idea.user?.image} sx={{ width: 21, height: 21}} />
                            <Typography variant="Body">{idea.user?.title}, {idea.user?.age} лет</Typography>
                        </Stack>
                        {true && <Button variant="small" onClick={(e) => {toggleProject(); e.stopPropagation() }}>Пригласить в проект</Button>}
                    </Stack>
                </>
            </Stack>
            <SelectProject open={project} onClose={() => { toggleProject() }} onChange={(p: Project)=>{onSelectProject(p); toggleProject()}} />
            <CreateIdea ideaId={idea.id} open={create} onClose={() => {
                toggleCreate()
                refetch()
            }} />
        </div>
    );
}
