import React, {useState} from 'react';
import MeetComponent from "../components/Meet";
import {useParams} from "react-router-dom";
import {Meet, NewMeet, useMeet} from "../modules/meet";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";
import CreateMeet from "../components/CreateMeet";
import {useToggleMeetUser} from "../modules/user";
import Back2 from "../components/Back2";
import {getOnShare} from "../tools/share";
import Button from "../components/Button";

export default function MeetPage() {
    const { id: meetId } = useParams();
    const { data: meet, refetch } = useMeet(Number(meetId))
    const [editMeet, setEditMeet] = useState<Meet>()
    const toggleMeetUser = useToggleMeetUser()

    if (!meet) return null;

    const onClick = () => {
        toggleMeetUser.mutateAsync({ meetId: meet.id }).then(() => {
            refetch()
        })
    }

    const menuItems = [
        { title: 'Поделиться', onClick: getOnShare({
                title: meet?.title,
                url: `/meet/${meet?.id}`
            })},
        { title: 'Редактировать', onClick: () => setEditMeet(meet)},
    ]

    const renderHeader = () => <Back2 title={meet.title} menuItems={menuItems} />
    const renderFooter = () => meet.active ? (
            <Button onClick={onClick} variant="outlined">
                Покинуть встречу
            </Button>
        ) : (
            <Button onClick={onClick}>
                Участвовать
            </Button>
        )


    return (
        <>
            <MeetComponent
                meet={meet}
                renderHeader={renderHeader}
                renderFooter={renderFooter}
            />
            <Dialog onClose={() => setEditMeet(undefined)} open={!!editMeet} fullScreen TransitionComponent={TransitionDialog}>
                {!!editMeet && (<CreateMeet onClose={() => {
                    setEditMeet(undefined)
                    refetch()
                }} newMeet={editMeet as NewMeet} />)}
            </Dialog>
        </>
    );
}
