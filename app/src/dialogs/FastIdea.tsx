import React, {useState} from 'react';
import {Button, MobileStepper, Stack} from "@mui/material";
import {DialogHeader, Input, ProjectCard, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Idea, Passport, User} from "../tools/dto";
import {Block} from "../components/Block";
import {useAuth} from "../tools/auth";


interface FastIdeaData {
    idea: Partial<Idea>
    user: Partial<User>
}

export const FAST_IDEA = 'fastIdea'

export interface FastIdeaProps {
    onClose: () => void
}
function FastIdea({ onClose }: FastIdeaProps) {
    const { openLogin } = useAuth();
    const [data, setData] = useState<FastIdeaData>({idea:{}, user:{}});
    const onSubmit = () => {
        localStorage.setItem(FAST_IDEA, JSON.stringify(data));
        openLogin()
    }

    return (
        <>
            <DialogHeader title="Быстрая идея" onClick={onClose} />
            <DialogContent>
                <Block variant="primary">
                    <Input
                        name='title'
                        label="Название"
                        value={data?.idea.title || ''}
                        onChange={(e) => setData({ ...data, idea: { ...data.idea, title: e.target.value }})}
                        autoFocus
                    />
                    <Textarea
                        name='description'
                        label="Описание"
                        value={data?.idea.description || ''}
                        onChange={(e) => setData({ ...data, idea: { ...data.idea, description: e.target.value }})}
                    />
                    <Stack spacing={1} direction="row">
                        <Input
                            name='price'
                            label="Имя"
                            value={data?.user?.title || ''}
                            onChange={(e) => setData({ ...data, user: { ...data.user, title: e.target.value }})}
                        />
                        <Input
                            name='age'
                            label="Возраст"
                            type="number"
                            value={data?.user?.age || ''}
                            onChange={(e) => setData({ ...data, user: { ...data.user, age: Number(e.target.value) }})}
                        />
                    </Stack>
                    <Button onClick={onSubmit}>Создать идею</Button>
                </Block>
            </DialogContent>
        </>
    );
}
export default withDialog(FastIdea)
