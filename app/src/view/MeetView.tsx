import React, {useState} from 'react';
import MeetComponent from "./Meet";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet} from "../tools/service";
import {Meet, NewMeet} from "../tools/dto";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog, Back2, Button} from "../components";
import CreateMeet from "./CreateMeet";
import {useToggleMeetUser} from "../tools/service";
import {getOnShare} from "../tools/pwa";
import {useAuth} from "../tools/auth";
import {convertToMeetsGroupTime} from "../tools/date";

export default function MeetPage() {
    const { isAuth } = useAuth();
    const navigate = useNavigate();

    const { id: meetId } = useParams();
    const { data: meet, refetch } = useMeet(Number(meetId))
    const [editMeet, setEditMeet] = useState<Meet>()
    const toggleMeetUser = useToggleMeetUser()
    const deleteMeet = useDeleteMeet()

    if (!meet) return null;

    const onClick = () => toggleMeetUser.mutateAsync(meet.id).then(() => refetch())

    const menuItems = [
        { title: 'Поделиться', onClick: getOnShare({
                title: 'Приглашаю на встречу: ' + meet?.title,
                url: `/meet/${meet?.id}`
        })},
    ]
    if (meet.editable) {
        menuItems.push({ title: 'Редактировать', onClick: async () => setEditMeet(meet)})
        menuItems.push({ title: 'Удалить', onClick: () => deleteMeet.mutateAsync(meet.id).then(() => {
            navigate(`/?date=${convertToMeetsGroupTime(meet.datetime)}`)
        })})
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
