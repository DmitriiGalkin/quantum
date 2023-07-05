import React, {useState} from 'react';
import MeetComponent from "./Meet";
import {useParams} from "react-router-dom";
import {useMeet} from "../tools/service";
import {Meet, NewMeet} from "../tools/dto";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog, Back2, Button} from "../components";
import CreateMeet from "./CreateMeet";
import {useToggleMeetUser} from "../tools/service";
import {getOnShare} from "../tools/pwa";
import {useAuth} from "../tools/auth";

export default function MeetPage() {
    const { isAuth } = useAuth();

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
                title: 'Приглашаю на встречу: ' + meet?.title,
                url: `/meet/${meet?.id}`
        })},
    ]
    if (isAuth) {
        menuItems.push({ title: 'Редактировать', onClick: async () => setEditMeet(meet)})
    }

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
                renderFooter={isAuth ? renderFooter : undefined }
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
