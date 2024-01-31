import React, {useState} from 'react';
import {Button, MobileStepper, Stack} from "@mui/material";
import {DialogHeader, Input, ProjectCard, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Idea, Passport, User} from "../tools/dto";
import {Block} from "../components/Block";
import {useAuth} from "../tools/auth";


interface IdeaStepperData {
    idea: Partial<Idea>
    user: Partial<User>
    passport: Partial<Passport>
}

export interface IdeaStepperProps {
    onClose: () => void
}
function IdeaStepper({ onClose }: IdeaStepperProps) {
    const { authFn } = useAuth();
    const [data, setData] = useState<IdeaStepperData>({idea:{}, user:{}, passport:{}});

    return (
        <>
            <DialogHeader title="Быстрая идея" onClick={onClose} />
            <DialogContent>
                <Block variant="primary">
                    <Input
                        name='title'
                        label="Название"
                        value={data?.idea.title}
                        onChange={(e) => setData({ ...data, idea: { ...data.idea, title: e.target.value }})}
                        autoFocus
                    />
                    <Textarea
                        name='description'
                        label="Описание"
                        value={data?.idea.description}
                        onChange={(e) => setData({ ...data, idea: { ...data.idea, description: e.target.value }})}
                    />
                    <Stack spacing={1} direction="row">
                        <Input
                            name='price'
                            label="Имя"
                            value={data?.user?.title}
                            onChange={(e) => setData({ ...data, user: { ...data.user, title: e.target.value }})}
                        />
                        <Input
                            name='age'
                            label="Возраст"
                            type="number"
                            value={data?.user?.age}
                            onChange={(e) => setData({ ...data, user: { ...data.user, age: Number(e.target.value) }})}
                        />
                    </Stack>
                    <Button onClick={authFn(() => console.log('111'))}>Создать идею</Button>
                </Block>
            </DialogContent>
        </>
    );
}
export default withDialog(IdeaStepper)
