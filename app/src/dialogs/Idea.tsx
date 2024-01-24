import React, {useCallback, useEffect, useState} from 'react';
import {
    useCreateInvite,
    useEditMeet, useIdea,
    useMeet,
} from "../tools/service";
import {Button, DatePicker, DialogHeader, Icon, Input, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import Typography from "../components/Typography";
import {Project} from "../tools/dto";
import SelectProject from "./SelectProject";
import {useToggle} from "usehooks-ts";
import {Stack} from "@mui/material";
import {Block} from "../components/Block";
import {InviteCard} from "../cards/InviteCard";

export interface IdeaDialogProps {
    ideaId: number
    onClose: () => void
}
function IdeaDialog({ ideaId, onClose }: IdeaDialogProps) {
    const { data: idea, refetch } = useIdea(ideaId)
    const [project, toggleProject] = useToggle()

    const createInvite = useCreateInvite()

    const onSelectProject = (project: Project) => {
        console.log(idea,'idea')
        idea && createInvite.mutateAsync({ projectId: project.id, userId: idea.userId, ideaId: idea.id }).then(() => refetch())
    }

    return (
        <>
            <DialogHeader title="Идея" onClick={onClose} />
            <DialogContent>
                <Typography variant="Header1">{idea?.title}</Typography>
                <Typography variant="Subheader1">{idea?.description}</Typography>
                <Stack spacing={1} justifyContent="flex-end" direction="row">
                    <Button variant="small" onClick={(e) => {toggleProject(); e.stopPropagation() }}>Пригласить в свой проект</Button>
                </Stack>

                <div id="secondary">
                    <Block title="Приглашения в проекты">
                        <Stack spacing={1}>
                            {idea?.invites?.map((invite) => <InviteCard key={invite.id} invite={invite} refetch={refetch} />)}
                        </Stack>
                    </Block>
                </div>
            </DialogContent>
            <SelectProject open={project} onClose={() => { toggleProject() }} onChange={(p: Project)=>{onSelectProject(p); toggleProject()}} />
        </>
    );
}

export default withDialog(IdeaDialog)

