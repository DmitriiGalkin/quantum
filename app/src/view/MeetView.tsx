import React, {useEffect, useState} from 'react';
import MeetComponent from "./Meet";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet} from "../tools/service";
import {Meet} from "../tools/dto";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components";
import CreateMeet from "./CreateMeet";
import {useToggleMeetUser} from "../tools/service";
import {useAuth} from "../tools/auth";

export default function MeetPage() {
    const navigate = useNavigate();
    const [meet, setMeet] = useState<Meet>()
    const { isAuth, openLogin } = useAuth();

    const { id: meetId } = useParams();
    const { data: defaultMeet, refetch } = useMeet(Number(meetId))
    const [editMeet, setEditMeet] = useState<Meet>()
    const toggleMeetUser = useToggleMeetUser()
    const deleteMeet = useDeleteMeet()

    useEffect(() => defaultMeet && setMeet(defaultMeet), [defaultMeet])

    if (!meet) return null;

    const onClick = () => {
        if (isAuth) {
            toggleMeetUser.mutateAsync(meet.id).then(() => refetch())
        } else {
            openLogin()
        }
    }
    const onEdit = async () => setEditMeet(meet)
    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))

    return (
        <>
            <MeetComponent
                meet={meet}
                onClick={onClick}
                onEdit={onEdit}
                onDelete={onDelete}
            />
            <Dialog onClose={() => setEditMeet(undefined)} open={!!editMeet} fullScreen TransitionComponent={TransitionDialog}>
                {!!editMeet && (<CreateMeet onClose={() => {
                    setEditMeet(undefined)
                    refetch()
                }} meet={editMeet} setMeet={setEditMeet} />)}
            </Dialog>
        </>
    );
}
