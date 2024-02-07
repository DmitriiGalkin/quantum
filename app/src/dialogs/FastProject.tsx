import React, {useState} from 'react';
import {DialogFooter, DialogHeader, Input, ProjectCard, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Idea, Invite, Passport, Place, Project, User} from "../tools/dto";
import {Block} from "../components/Block";
import {useAuth} from "../tools/auth";
import ProjectForm from "../components/ProjectForm";
import {Stack} from "@mui/material";
import {IdeaCard} from "../cards/IdeaCard";
import Typography from "../components/Typography";
import {useIdeas} from "../tools/service";


interface FastProjectData {
    project: Partial<Project>
    place: Partial<Place>
    invites?: Partial<Invite>[]
}

export const FAST_PROJECT = 'fastProject'

export interface FastProjectProps {
    onClose: () => void
}

function FastProject({ onClose }: FastProjectProps) {
    const { openLogin } = useAuth();
    const [data, setData] = useState<FastProjectData>({project:{}, place:{}, invites: []});
    const { data: ideas = [], refetch } = useIdeas({
        ageFrom: data.project.ageFrom,
        ageTo: data.project.ageTo,
        latitude: data.place.latitude,
        longitude: data.place.longitude
    });

    const onSubmit = () => {
        localStorage.setItem(FAST_PROJECT, JSON.stringify(data));
        openLogin()
    }
    const t = (invites: Partial<Invite>[] | undefined, invite: Partial<Invite>): Partial<Invite>[] => {
        if (invites?.map(i=>i.ideaId).includes(invite.ideaId)) {
            const filtered = invites?.filter((i)=>(i.id !== invite.id)) || []
            return filtered
        } else {
            return [...data.invites || [], invite]
        }
    }

    return (
        <>
            <DialogHeader title="Быстрый проект" onClick={onClose} />
            <DialogContent>
                <Block variant="primary">
                    <ProjectForm project={data.project} onChange={(project) => setData({ ...data, project })}/>
                </Block>
                <Block variant="secondary">
                    {Boolean(ideas.length) && (
                        <Stack spacing={2}>
                            <Typography variant="Header2">Рекомендуем пригласить участников</Typography>
                            <Stack spacing={1}>
                                {ideas?.map((idea) => {
                                    const invited = data.invites?.map(i=>i.ideaId).includes(idea.id)
                                    const onAdd = (idea: Idea) => setData({...data, invites: t(data.invites, {
                                            ideaId: idea.id,
                                            userId: idea.userId,
                                        })})
                                    return <IdeaCard invited={invited} key={idea.id} idea={idea} refetch={refetch} onAdd={onAdd}/>
                                })}
                            </Stack>
                        </Stack>
                    )}
                </Block>
            </DialogContent>
            {data?.project.title && <DialogFooter onClick={onSubmit} />}
        </>
    );
}
export default withDialog(FastProject)
