import React from 'react';
import MeetComponent from "./Meet";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet, useProject, useToggleMeetUser} from "../tools/service";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components";
import {useToggle} from "usehooks-ts";
import ProjectComponent from "./Project";
import CreateProject from "./CreateProject";

export default function ProjectPage() {
    const navigate = useNavigate();

    const { id: projectId } = useParams();
    const { data: project } = useProject(Number(projectId))
    const [create, toggleCreate] = useToggle()
    const deleteMeet = useDeleteMeet()

    if (!project) return null;

    const onDelete =  () => deleteMeet.mutateAsync(project.id).then(() => navigate(`/`))

    return (
        <>
            <ProjectComponent project={project}
                              onEdit={toggleCreate}
                              onDelete={onDelete} />
            <Dialog onClose={toggleCreate} open={create} fullScreen TransitionComponent={TransitionDialog}>
                <CreateProject onClose={toggleCreate} />
            </Dialog>
        </>
    );
}
