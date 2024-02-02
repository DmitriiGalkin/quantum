import React from 'react';
import {Idea, Project} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {useToggle} from "usehooks-ts";
import {Button, Card} from "../components";
import SelectProject from "../dialogs/SelectProject";
import {useCreateInvite} from "../tools/service";
import {Parameter} from "../components/Parameter";
import EditIdea from "../dialogs/EditIdea";
import {useAuth} from "../tools/auth";

interface IdeaCardProps {
    idea: Idea
    refetch: () => void
}
export function IdeaCard({ idea, refetch }: IdeaCardProps) {
    const { user, isAuth } = useAuth();

    const [project, toggleProject] = useToggle()
    const [create, toggleCreate] = useToggle()
    const createInvite = useCreateInvite()

    const onSelectProject = (project: Project) => {
        idea && createInvite.mutateAsync({ projectId: project.id, userId: idea.userId, ideaId: idea.id }).then(() => refetch())
    }

    const self = user?.id === idea.userId

    return (
        <>
            <Card onClick={ self ? toggleCreate : undefined}>
                <Stack spacing={2} style={{ padding: '8px 16px' }}>
                    <Typography variant="Body-Bold">{idea.title}</Typography>
                    <Typography variant="Body">{idea.description}</Typography>
                    {!self && (
                        <Stack spacing={1}  justifyContent="space-between" alignItems="center" direction="row">
                            <Stack spacing={1} direction="row" alignItems="center">
                                <Avatar alt={idea.user?.title} src={idea.user?.image} sx={{ width: 21, height: 21}} />
                                <Typography variant="Body">{idea.user?.title}, {idea.user?.age} лет</Typography>
                            </Stack>
                            {idea.latitude && idea.longitude && <Parameter name="place2" title="Москва, Северодвинская 11" />}
                            {isAuth && <Button variant="small" onClick={(e) => {toggleProject(); e.stopPropagation() }}>Пригласить</Button>}
                        </Stack>
                    )}
                </Stack>
            </Card>
            <SelectProject open={project} onClose={() => { toggleProject() }} onChange={(p: Project)=>{onSelectProject(p); toggleProject()}} />
            <EditIdea ideaId={idea.id} open={create} onClose={() => {
                toggleCreate()
                refetch()
            }} />
        </>

    );
}
