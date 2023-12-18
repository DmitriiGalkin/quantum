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
import CreateMeet from "../dialogs/CreateMeet";

const useStyles = makeStyles(() => ({
    container: {
        position: 'absolute',
        top: -33,
        width: '100%',
    },
    container2: {
        backgroundColor: 'white',
        borderRadius: 28,
        padding: '24px 26px'
    },
    container3: {
        padding: '24px 26px',
        backgroundColor: 'rgb(245, 245, 245)'
    },
    image: {
        width: '100%',
        height: 230,
        objectFit: 'cover',
    },
}));

export default function ProjectPage() {
    const navigate = useNavigate();
    const { user, passport } = useAuth();
    const classes = useStyles();

    const { id: projectId } = useParams();
    const { data: project, refetch } = useProject(Number(projectId))
    const [create, toggleCreate] = useToggle()
    const [createMeet, toggleCreateMeet] = useToggle()

    const deleteMeet = useDeleteMeet()
    const createParticipation = useCreateParticipation()
    const deleteParticipation = useDeleteParticipation()

    if (!project) return null;

    const participation = project.participationUsers?.find(({ userId }) => userId === user?.id)
    const editable = project.passportId === passport?.id


    const parameters = [
        { name: "place", title: 'Место проведения', value: project?.place?.title },
        { name: "age", title: 'Возраст', value: getAgeTitle(project?.ageFrom, project?.ageTo) },
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
    const onCreateParticipation =  () => createParticipation.mutateAsync({ projectId: project.id, userId: user.id }).then(() => refetch())
    const onDeleteParticipation =  () => participation && deleteParticipation.mutateAsync(participation).then(() => refetch())


    const menuItems = []
    if (editable) {
        menuItems.push({ title: 'Новая встреча', onClick: toggleCreateMeet})
        menuItems.push({ title: 'Редактировать', onClick: toggleCreate})
        menuItems.push({ title: 'Удалить', onClick: onDelete})
    }
    if (participation) {
        menuItems.push({ title: 'Выйти из проекта', onClick: onDeleteParticipation})
    }
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
                        <Stack className={classes.container2} spacing={3}>
                            <Stack direction="row" justifyContent="space-between" alignContent="center">
                                <Typography variant="TITLE">{project.title}</Typography>
                                <Icon name="share" onClick={onShare} />
                            </Stack>
                            <Typography variant="Body">{project.description}</Typography>
                            {!participation && <Button onClick={onCreateParticipation}>Присоединиться</Button>}
                            <Parameters items={parameters}/>
                        </Stack>
                        <div className={classes.container3}>
                            <Stack flexDirection="column" spacing={3}>
                                <Block title="Расписание">
                                    {Boolean(project.meets?.length) ? (
                                        <div>
                                            {project.meets?.map((meet, index, meets) => {
                                                return (
                                                    <div key={index} style={{ borderBottom: meets.length === index + 1 ? 'none' : '1px solid rgba(0, 0, 0, 0.12)' }}>
                                                        <MeetCard meet={meet} refetch={refetch}/>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    ) : (
                                        <div style={{ height: 60, alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
                                            <Typography variant="Caption">Ближайших встреч нет</Typography>
                                        </div>
                                    )}
                                </Block>
                                <Block title="Участники проекта">
                                    <Stack spacing={1}>
                                        {project.participationUsers?.map((participationUser) => <ParticipationCard key={participationUser.id} participationUser={participationUser}/>)}
                                    </Stack>
                                </Block>
                            </Stack>
                        </div>
                    </Stack>
                </div>
            </div>
            <CreateProject open={create} onClose={() => {
                toggleCreate()
                refetch()
            }} />
            <CreateMeet defaultProjectId={project.id} open={createMeet} onClose={() => {
                toggleCreateMeet()
                refetch()
            }} />
        </>
    );
}
