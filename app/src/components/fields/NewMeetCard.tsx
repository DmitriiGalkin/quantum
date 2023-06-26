import React, {useState} from 'react';

import {CardContent, Stack, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";
import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../TransitionDialog";
import CreateMeet from "../../dialogs/CreateMeet";
import NewFieldCard from "./NewFieldCard";

interface NewMeetCardProps {
    refetch?: () => void
}

export default function NewMeetCard({ refetch }: NewMeetCardProps) {
    const [newMeet, setNewMeet] = useState(false)

    return (
        <>
            <NewFieldCard onClick={()=>setNewMeet(true)} label="Новая"/>
            <Dialog onClose={() => setNewMeet(false)} open={newMeet} fullScreen TransitionComponent={TransitionDialog}>
                {newMeet && (<CreateMeet onClose={() => {
                    setNewMeet(false)
                    refetch && refetch()
                }} />)}
            </Dialog>
        </>
    );
}
