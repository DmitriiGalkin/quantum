import React, {useState} from 'react';

import {CardContent, Stack, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";
import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../TransitionDialog";
import CreateProject from "../../dialogs/CreateProject";
import NewFieldCard from "./NewFieldCard";

interface NewProjectCardProps {
    refetch: () => void
}

export default function NewProjectCard({ refetch }: NewProjectCardProps) {
    const [newProject, setNewProject] = useState(false)

    return (
        <>
            <NewFieldCard onClick={()=>setNewProject(true)} label="Новый"/>
            <Dialog onClose={() => setNewProject(false)} open={newProject} fullScreen TransitionComponent={TransitionDialog}>
                {newProject && (<CreateProject onClose={() => {
                    setNewProject(false)
                    refetch()
                }} close />)}
            </Dialog>
        </>
    );
}
