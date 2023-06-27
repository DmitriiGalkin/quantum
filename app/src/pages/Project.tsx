import React, {useState} from 'react';
import {makeStyles} from '@mui/styles';
import {Theme} from "@mui/material";
import Button from "../components/Button";
import {useToggleUserProject} from "../modules/user";
import {Project, useProject} from "../modules/project";
import {getFilteredMeetsByDate, getMeetsGroup2, getWeek} from "../tools/helper";
import {NewMeet} from "../modules/meet";
import {useParams} from "react-router-dom";
import CreateMeet from "../components/CreateMeet";
import {getOnShare} from "../tools/share";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";
import CreateProjectDialog from "../components/CreateProject";
import Back2 from "../components/Back2";
import Meets from "../components/Meets";
import {LocalDate} from "@js-joda/core";

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        position: 'absolute',
        top: -38,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `38px 38px 0 0`,
        padding: '25px 33px'
    },
    block: {
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 12,
        padding: 12,
    },
    large: {
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    image: {
        width: '100%',
        height: 150,
        objectFit: 'cover',
    },
}));

export default function ProjectPage() {
    const { id: projectId } = useParams();
    const { data: project, refetch } = useProject(Number(projectId))

    const classes = useStyles();
    const [newMeet, setNewMeet] = useState<NewMeet>()
    const [editProject, setEditProject] = useState<Project>()

    const toggleUserProject = useToggleUserProject()

    const localDate = LocalDate.now()
    const [selectedDate, setSelectedDate] = useState<string>(localDate.toString())
    const meetsGroup = getMeetsGroup2(project?.meets)
    const week = getWeek(selectedDate, meetsGroup)
    const filteredMeets = getFilteredMeetsByDate(project?.meets || [], selectedDate)


    if (!project) { return null }

    const onClick = () => {
        toggleUserProject.mutate({ projectId: project.id })
    }

    const menuItems = [
        { title: 'Новая встреча', onClick: () => setNewMeet({ projectId: project?.id, activeStep: 1 })},
        { title: 'Поделиться', onClick: getOnShare({
                title: project?.title,
                text: project?.description,
                url: `/project/${project?.id}`
            })},
        { title: 'Редактировать', onClick: () => setEditProject(project)},
        { title: 'Выйти из проекта', onClick: () => onClick()},
    ]


    return (
        <div style={{ position: "relative"}}>
            <img src={project.image} className={classes.image}/>
            <div style={{ position: "absolute", top: 25, left: 21, right: 25 }}>
                <Back2 title={project.title} menuItems={menuItems} />
            </div>
            <div style={{ position: "relative"}}>
                <div className={classes.container}>
                    <div style={{ paddingTop: 10, color: '#070707', opacity: .6, fontSize: 18}}>
                        Проект
                    </div>
                    <div style={{ fontSize: 24, color: "black" }}>
                        {project.title}
                    </div>
                    <div style={{ paddingTop: 31, color: '#070707', opacity: .6, fontSize: 18}}>
                        {project.description}
                    </div>
                    {!project.active && (
                        <div style={{ paddingTop: 15 }}>
                            <Button onClick={onClick}>
                                Участвовать
                            </Button>
                        </div>
                    )}
                    <div style={{ paddingTop: 30 }}>
                        <Meets meets={filteredMeets} refetch={refetch} week={week} onChangeDay={setSelectedDate} />
                    </div>
                </div>
            </div>
            <Dialog onClose={() => setNewMeet(undefined)} open={!!newMeet} fullScreen TransitionComponent={TransitionDialog}>
                {!!newMeet && (<CreateMeet newMeet={newMeet} onClose={() => {
                    setNewMeet(undefined)
                    refetch()
                }} />)}
            </Dialog>
            <Dialog onClose={() => setEditProject(undefined)} open={!!editProject} fullScreen TransitionComponent={TransitionDialog}>
                {!!editProject && (<CreateProjectDialog onClose={() => {
                    setEditProject(undefined)
                    refetch()
                }} />)}
            </Dialog>
        </div>
    );
}
