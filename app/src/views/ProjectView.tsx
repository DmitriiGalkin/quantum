import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useCreateParticipation, useDeleteMeet, useDeleteParticipation, useProject} from "../tools/service";
import {Back, Button, Icon, MeetCard} from "../components";
import {useToggle} from "usehooks-ts";
import CreateProject from "../dialogs/CreateProject";
import {getOnShare} from "../tools/pwa";
import {makeStyles} from "@mui/styles";
import {Parameter, Parameters} from "../components/Parameters";
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
    const { data: project, refetch } = useProject(Number(projectId))
    const [create, toggleCreate] = useToggle()
    const deleteMeet = useDeleteMeet()
    const createParticipation = useCreateParticipation()
    const deleteParticipation = useDeleteParticipation()

    if (!project) return null;

    const participation = project.participationUsers?.find(({ userId }) => userId === user.id)
    const editable = project.participationUsers?.find(({ userId }) => userId === user.id)


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
    const onCreateParticipation =  () => createParticipation.mutateAsync(project.id).then(() => refetch())
    const onDeleteParticipation =  () => participation && deleteParticipation.mutateAsync(participation).then(() => refetch())


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
                            <Icon onClick={onShare} name="share" />
                        </div>
                        <Typography variant="Body">{project.description}</Typography>
                        {!participation && <Button onClick={onCreateParticipation}>Присоединиться</Button>}
                        <Block title="Параметры">
                            <Parameters items={parameters}/>
                        </Block>
                        <Block title="Расписание">
                            <div>
                                {project.meets?.map((meet, index, meets) => {
                                    return (
                                        <div style={{ borderBottom: meets.length === index + 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.12)' }}>
                                            <MeetCard meet={meet} refetch={refetch}/>
                                        </div>
                                    )
                                })}
                            </div>
                        </Block>
                        <Block title="Участники проекта">
                            <Stack spacing={1}>
                                {project.participationUsers?.map((participationUser) => <ParticipationCard participationUser={participationUser}/>)}
                            </Stack>
                        </Block>
                        {participation && <Button onClick={onDeleteParticipation} variant="gray">Выйти из проекта</Button>}

                    </Stack>
                </div>
            </div>
            <CreateProject open={create} onClose={toggleCreate} />
        </>
    );
}
