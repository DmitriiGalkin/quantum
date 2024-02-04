import React, {useState} from 'react';
import {DialogFooter, DialogHeader, Input, ProjectCard, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Idea, Passport, Place, Project, User} from "../tools/dto";
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
    ideas?: Idea[]
}

export const FAST_PROJECT = 'fastProject'

export interface FastProjectProps {
    onClose: () => void
}

function FastProject({ onClose }: FastProjectProps) {
    const { openLogin } = useAuth();
    const [data, setData] = useState<FastProjectData>({project:{}, place:{}, ideas: []});
    const { data: ideas = [], refetch } = useIdeas();

    const onSubmit = () => {
        localStorage.setItem(FAST_PROJECT, JSON.stringify(data));
        openLogin()
    }
    const t = (ideas: Idea[] | undefined, idea: Idea): Idea[] => {
        if (ideas?.map(i=>i.id).includes(idea.id)) {
            const filtered = ideas?.filter((i)=>(i.id !== idea.id)) || []
            return filtered
        } else {
            return [...data.ideas || [], idea]
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
                    <Stack spacing={2}>
                    <Typography variant="Header2">Рекомендуем пригласить участников</Typography>
                        <Stack spacing={1}>
                            {ideas?.map((idea) => {
                                const invited = data.ideas?.map(i=>i.id).includes(idea.id)
                                const onAdd = (idea: Idea) => setData({...data, ideas: t(data.ideas, idea)})
                                return <IdeaCard invited={invited} key={idea.id} idea={idea} refetch={refetch} onAdd={onAdd}/>
                            })}
                        </Stack>
                    </Stack>
                </Block>
            </DialogContent>
            {data?.project.title && <DialogFooter onClick={onSubmit} />}
        </>
    );
}
export default withDialog(FastProject)
