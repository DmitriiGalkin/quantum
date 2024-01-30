import React, {useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {useAddIdea, useDeleteIdea, useEditIdea, useIdea,} from "../tools/service";
import {Idea} from "../tools/dto";
import {Button, DialogHeader, Icon, Input, Textarea} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {InviteCard} from "../cards/InviteCard";
import {useAuth} from "../tools/auth";

export interface EditIdeaProps {
    ideaId: number
    onClose: () => void
}
function EditIdea({ ideaId, onClose }: EditIdeaProps) {
    // const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    // const [meet, setMeet] = useState<Partial<Meet>>({ datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'), projectId: defaultProjectId })
    // const navigate = useNavigate();
    //
    // const { data: defaultIdea, refetch } = useMeet(meetId)
    const { user, passport } = useAuth();

    const addIdea = useAddIdea()
    const editIdea = useEditIdea(ideaId)
    const deleteIdea = useDeleteIdea()

    const [idea, setIdea] = useState<Partial<Idea>>({ title: '', userId: user.id })
    const { data: defaultIdea, refetch } = useIdea(ideaId)

    const onDelete =  () => deleteIdea.mutateAsync(idea.id).then(onClose)

    const onClickSave = () => {
        if (idea.id) {
            editIdea.mutateAsync(idea).then(onClose)
        } else {
            addIdea.mutateAsync(idea).then(() => {
                onClose()
            })
        }
    };

    useEffect(() => defaultIdea && setIdea(defaultIdea), [defaultIdea])

    return (
        <>
            <DialogHeader title="Идея" onClick={onClose} menuItems={idea.id ? [{ title: 'Удалить', onClick: onDelete}] : undefined} isClose={!idea.id} />
            <DialogContent>
                <Block variant="primary">
                    <Input
                        name='title'
                        label="Название"
                        value={idea.title}
                        onChange={(e) => setIdea({ ...idea, title: e.target.value})}
                        autoFocus
                    />
                    <Textarea
                        name='title'
                        label="Описание"
                        value={idea.description}
                        onChange={(e) => setIdea({ ...idea, description: e.target.value})}
                    />
                </Block>
                <Block variant="secondary">
                    <Block title="Приглашения в проекты">
                        <Stack spacing={1}>
                            {idea.invites?.map((invite) => <InviteCard key={invite.id} invite={invite} refetch={refetch} />)}
                        </Stack>
                    </Block>
                    <Stack spacing={3}>
                        {user.id && <Button onClick={onDelete} variant="gray" icon={<Icon name="delete"/>}>Удалить идею</Button>}
                    </Stack>
                </Block>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultIdea) === JSON.stringify(idea) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>{idea.id ? 'Сохранить' : "Создать"}</Button>
            </div>
        </>
    );
}

export default withDialog(EditIdea)

