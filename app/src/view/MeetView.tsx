import React from 'react';
import MeetComponent from "./Meet";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet, useToggleMeetUser} from "../tools/service";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components";
import CreateMeet from "./CreateMeet";
import {useAuth} from "../tools/auth";
import {useToggle} from "usehooks-ts";

export default function MeetPage() {
    const navigate = useNavigate();
    const { isAuth, openLogin } = useAuth();

    const { id: meetId } = useParams();
    const { data: meet, refetch } = useMeet(Number(meetId))
    const [create, toggleCreate] = useToggle()
    const toggleMeetUser = useToggleMeetUser()
    const deleteMeet = useDeleteMeet()

    if (!meet) return null;

    const onClick = () => isAuth ? toggleMeetUser.mutateAsync(meet.id).then(() => refetch()) : openLogin()
    const onDelete =  () => deleteMeet.mutateAsync(meet.id).then(() => navigate(`/`))

    return (
        <>
            <MeetComponent
                meet={meet}
                onClick={onClick}
                onEdit={toggleCreate}
                onDelete={onDelete}
            />
            <Dialog onClose={toggleCreate} open={create} fullScreen TransitionComponent={TransitionDialog}>
                {create && (<CreateMeet onClose={toggleCreate} />)}
            </Dialog>
        </>
    );
}
