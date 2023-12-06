import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDeleteMeet, useProject} from "../tools/service";
import Dialog from "@mui/material/Dialog";
import {Back, TransitionDialog} from "../components";
import {useToggle} from "usehooks-ts";
import CreateProject from "../dialogs/CreateProject";
import {getOnShare} from "../tools/pwa";
import {makeStyles} from "@mui/styles";
import {Parameter, Parameters} from "../components/Parameters";
import {ProjectMeetCard} from "../cards/ProjectMeet";
import {getAgeTitle} from "../tools/helper";
import {useAuth} from "../tools/auth";
import {Stack} from "@mui/material";
import Typography from "../components/Typography";
import {ParticipationCard} from "../cards/ParticipationCard";
import {Block} from "../components/Block";

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        top: -33,
        backgroundColor: 'white',
        width: '100%',
        borderRadius: `28px 28px 0 0`,
        padding: '24px 26px'
    },
    image: {
        width: '100%',
        height: 230,
        objectFit: 'cover',
    },
}));

export default function ProjectPage() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const classes = useStyles();

    const { id: projectId } = useParams();
    const { data: project } = useProject(Number(projectId))
    const [create, toggleCreate] = useToggle()
    const deleteMeet = useDeleteMeet()

    if (!project) return null;

    const parameters = [
        { name: "place", title: 'Место проведения', value: project?.place?.title },
        { name: "place", title: 'Возраст', value: getAgeTitle(project?.ageFrom, project?.ageTo) },
        {
            name: "date",
            title: 'Организатор',
            value: (
                <span>
                    {project.user?.title}
                    {project.user?.id === user?.id && '(Вы)'}
                </span>
            ),
        }
    ] as Parameter[]

    const onDelete =  () => deleteMeet.mutateAsync(project.id).then(() => navigate(`/`))
    const menuItems = project.editable ? [
        { title: 'Редактировать', onClick: toggleCreate},
        { title: 'Удалить', onClick: onDelete}
    ] : undefined
    const onShare = getOnShare({
        title: `Приглашаю в проект: ${project?.title}`,
        url: `/project/${project?.id}`
    })

    return (
        <>
            <div style={{ position: "relative", backgroundColor: 'rgb(245, 245, 245)'}}>
                <Back menuItems={menuItems} />
                <div style={{ height: 230 }}>
                    {project.image && <img alt={project.title} src={project.image} className={classes.image}/>}
                </div>
                <div style={{ position: "relative"}}>
                    <Stack className={classes.container} spacing={3}>
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
                        <Typography variant="Body">{project.description}</Typography>
                        <Block title="Параметры">
                            <Parameters items={parameters}/>
                        </Block>
                        <Block title="Расписание">
                            <Stack spacing={2}>
                                {project.meets?.map((meet) => <ProjectMeetCard project={project} meet={meet}/>)}
                            </Stack>
                        </Block>
                        <Block title="Участники">
                            <Stack spacing={1}>
                                {project.participationUsers?.map((participationUser) => <ParticipationCard participationUser={participationUser}/>)}
                            </Stack>
                        </Block>
                    </Stack>
                </div>
            </div>
            <CreateProject open={create} onClose={toggleCreate} />
        </>
    );
}
