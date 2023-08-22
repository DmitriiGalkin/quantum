import React from 'react';
import MeetComponent from "./Meet";
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useMeet, useProject, useToggleMeetUser} from "../tools/service";
import Dialog from "@mui/material/Dialog";
import {Back, TransitionDialog} from "../components";
import {useToggle} from "usehooks-ts";
import CreateProject from "../dialogs/CreateProject";
import {getOnShare} from "../tools/pwa";

export default function ProjectPage() {
    const navigate = useNavigate();
    const classes = useStyles();

    const { id: projectId } = useParams();
    const { data: project } = useProject(Number(projectId))
    const [create, toggleCreate] = useToggle()
    const deleteMeet = useDeleteMeet()

    if (!project) return null;

    const onDelete =  () => deleteMeet.mutateAsync(project.id).then(() => navigate(`/`))
    const menuItems = project.editable ? [
        { title: 'Редактировать', onClick: onEdit},
        { title: 'Удалить', onClick: onDelete}
    ] : undefined
    const onShare = getOnShare({
        title: `Приглашаю в проект: ${project?.title}`,
        url: `/project/${project?.id}`
    })

    return (
        <>
            <div style={{ position: "relative", backgroundColor: 'rgb(245, 245, 245)'}}>
                <div style={{ height: 230 }}>
                    {project.image && <img alt={project.title} src={project.image} className={classes.image}/>}
                </div>
                <div style={{ position: "absolute", top: 18, left: 16, right: 16 }}>
                    <Back menuItems={menuItems} />
                </div>
                <div style={{ position: "relative"}}>
                    <div className={classes.container}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 23, lineHeight: '28px', letterSpacing: '-0.01em', fontWeight: 900 }}>
                                {project.title}
                            </div>
                            <div onClick={onShare}>
                                <svg width="15" height="19" viewBox="0 0 15 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="12" cy="3" r="2.25" stroke="black" strokeWidth="1.5"/>
                                    <circle cx="12" cy="16" r="2.25" stroke="black" strokeWidth="1.5"/>
                                    <circle cx="3" cy="9" r="2.25" stroke="black" strokeWidth="1.5"/>
                                    <line x1="10.0101" y1="4.10176" x2="4.88515" y2="7.91426" stroke="black" strokeWidth="1.5"/>
                                    <line y1="-0.75" x2="6.38755" y2="-0.75" transform="matrix(0.802342 0.596864 0.596864 -0.802342 5.4375 10.0938)" stroke="black" strokeWidth="1.5"/>
                                </svg>
                            </div>
                        </div>
                        <div style={{ paddingTop: 24, opacity: .6, lineHeight: '21px'}}>
                            {project.description}
                        </div>
                    </div>
                </div>
            </div>
            <Dialog onClose={toggleCreate} open={create} fullScreen TransitionComponent={TransitionDialog}>
                <CreateProject onClose={toggleCreate} />
            </Dialog>
        </>
    );
}
