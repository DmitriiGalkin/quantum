import React from 'react';
import MeetComponent from "./Meet";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet, useProject, useToggleMeetUser} from "../tools/service";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components";
import CreateMeet from "./CreateMeet";
import {useAuth} from "../tools/auth";
import {useToggle} from "usehooks-ts";
import ProjectComponent from "./Project";

export default function ProjectPage() {
    const { id: projectId } = useParams();
    const { data: project } = useProject(Number(projectId))

    if (!project) return null;

    return (
        <>
            <ProjectComponent project={project} />
        </>
    );
}
