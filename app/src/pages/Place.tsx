import React from 'react';
import {makeStyles} from '@mui/styles';
import ForwardAppBar from "../components/ForwardAppBar";
import {useNavigate, useParams} from "react-router-dom";
import {
    Place,
    useAddPlaceUser,
    useDeletePlaceUser,
    usePlace,
    usePlaceProjects,
    usePlaceUsers
} from "../modules/place";
import ProjectCard from "../components/ProjectCard";
import PenIcon from '@mui/icons-material/Edit';
import {Avatar, Box, Button, Container, Typography, Theme} from "@mui/material";
import Image from "../components/Image";
import SaveIcon from "@mui/icons-material/Save";
import {useUnit} from "../tools/hooks";
import QAvatar from "../components/QAvatar";


const useStyles = makeStyles((theme: Theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: `${theme.spacing(4)}px ${theme.spacing(4)}px 0 0`,
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
    root: {
        flexGrow: 1,
    },
    root2: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

export default function PlacePage() {
    const classes = useStyles();
    const id = Number(useParams().id);
    const { data: place = {} as Place } = usePlace(id)
    const { data: projects = [] } = usePlaceProjects(id)
    const { data: users = []  } = usePlaceUsers(id)

    const navigate = useNavigate();

    const user = useUnit();

    const active = users.map((user) => user.id).includes(user.id)
    const addPlaceUser = useAddPlaceUser(id)
    const deletePlaceUser = useDeletePlaceUser(id)
    const onClick = () => {
        if (active) {
            deletePlaceUser.mutate({ placeId: id })
        } else {
            addPlaceUser.mutate({ placeId: id })
        }
    }

    return (
        <div className={classes.root}>
            <ForwardAppBar title={place.title} icon={<PenIcon style={{ color: 'white' }}/>} onClick={() => navigate(`/place/${place.id}/edit` )}/>
            <div className={classes.container}>
                <Box sx={{ margin: '0 18px', paddingTop: 3}}>
                    <Image alt={place.title} src={place.image} borderRadius={'24px 24px 0 0'} />
                </Box>
                <Container disableGutters sx={{ padding: '24px 18px',
                    '& > * + *': {
                        marginTop: 2,
                    }
                }}>
                    <Typography variant="h5">
                        {place.title}
                    </Typography>
                    <Typography>
                        {place.description}
                    </Typography>
                    <Box className={classes.block}>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={onClick}
                        >
                            {active ? 'Покинуть пространство' : 'Участвовать в пространстве'}
                        </Button>
                    </Box>
                </Container>
            </div>
            <div className={classes.block}>
                <Typography variant="h5">
                    Проекты
                </Typography>
                {projects.map((project) => (
                    <ProjectCard key={project.id} {...project} onClick={() => navigate(`/project/${project.id}`)} />
                ))}
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<SaveIcon />}
                    onClick={() => navigate(`/project`)}
                >
                    Создать проект
                </Button>
            </div>
            <div className={classes.block}>
                <Typography variant="h5">
                    Участники
                </Typography>
                {users.map((user) => (
                    <Box sx={{padding: 1, display: "flex"}}>
                        <QAvatar {...user} />
                        <Box sx={{flexGrow:1, paddingLeft: 2}}>
                            <Typography variant="subtitle1">
                                {user.title}
                            </Typography>
                            <Typography>
                                Вдохновитель
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </div>
        </div>
    );
}