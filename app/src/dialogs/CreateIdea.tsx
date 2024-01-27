import React, {useCallback, useEffect, useState} from 'react';
import {Stack} from "@mui/material";
import {
    useAddIdea,
    useAddMeet,
    useDeleteMeet, useEditIdea,
    useEditMeet, useIdea,
    useMeet,
} from "../tools/service";
import {Idea, Meet, Project} from "../tools/dto";
import {Button, DatePicker, DialogHeader, Icon, Input, Textarea} from "../components";
import {convertToMeetsGroupTime, convertToMeetTime, getIsStart} from "../tools/date";
import {useLocalStorage} from "usehooks-ts";
import {LocalDate} from "@js-joda/core";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {Block} from "../components/Block";
import {VisitCard} from "../cards/VisitCard";
import {ParticipationCard} from "../cards/ParticipationCard";
import {InviteCard} from "../cards/InviteCard";
import {useAuth} from "../tools/auth";

export interface IdeaDialogProps {
    ideaId: number
    onClose: () => void
}
function CrateIdeaDialog({ ideaId, onClose }: IdeaDialogProps) {
    // const [selectedDate, setSelectedDate] = useLocalStorage<string>('date', LocalDate.now().toString())
    // const [meet, setMeet] = useState<Partial<Meet>>({ datetime: dayjs(selectedDate).format('YYYY-MM-DD HH:mm:ss'), projectId: defaultProjectId })
    // const navigate = useNavigate();
    //
    // const { data: defaultIdea, refetch } = useMeet(meetId)
    const { user, passport } = useAuth();

    const addIdea = useAddIdea()
    const editIdea = useEditIdea(ideaId)
    // const deleteMeet = useDeleteMeet()
    //
    // const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))
    //
    //
    const [idea, setIdea] = useState<Partial<Idea>>({ title: '', userId: user.id })
    const { data: defaultIdea, refetch } = useIdea(ideaId)


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
            <DialogHeader title="Идея" onClick={onClose} />
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
                </Block>
            </DialogContent>
            <div style={{ padding: 15, display: JSON.stringify(defaultIdea) === JSON.stringify(idea) ? 'none' : 'block' }} >
                <Button onClick={onClickSave}>{idea.id ? 'Сохранить' : "Создать"}</Button>
            </div>
        </>
    );
}

export default withDialog(CrateIdeaDialog)

