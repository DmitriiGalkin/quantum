import React, {useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import QStepper from "../components/QStepper";
import ForwardAppBar from "../components/ForwardAppBar";
import {TabPanel} from "../components/tabs";
import QContainer from "../components/QContainer";
import {useParams} from "react-router-dom";
import {Box, Typography, CardActionArea, CardContent, Grid, CardMedia, TextField, Theme} from "@mui/material";
import {usePlaces} from "../modules/place";
import {makeStyles} from "@mui/styles";

const DEFAULT_PROJECT: Project = {
    id: 12,
    image: '/group_dd.jpg',
    title: 'новый проект',
    description: 'описание нового проекта',
    placeId: null,
}
const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: 300,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
}));
export default function CreateProjectStepperDialog({ isEdit }: {isEdit?: boolean}) {
    const classes = useStyles();
    const { id } = useParams();
    const { data: places = [] } = usePlaces()
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || DEFAULT_PROJECT)
    const [activeStep, setActiveStep] = React.useState(0);
    const addProject = useAddProject()
    const updateProject = useUpdateProject()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 2) {
            isEdit ? updateProject.mutate(project) : addProject.mutate(project)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>
            <ForwardAppBar title={isEdit ? 'Редактирование проекта' : "Создание проекта"}/>
            <QContainer>
                <TabPanel value={activeStep} index={0}>
                    <div>
                        <Grid container spacing={2} alignItems="stretch">
                            {places.map((place) =>
                                <Grid item lg={4} xs={12} key={place.id} onClick={() => {
                                    setProject({ ...project, placeId: place.id })
                                }}>
                                    <Box sx={{
                                        flexGrow: 1,
                                        backgroundColor: (theme) => project.placeId === place.id ? 'rgba(255,204,0,0.1)' : theme.palette.background.paper,
                                    }}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={place.image}
                                                title={place.title}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {place.title}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {place.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </div>                </TabPanel>
                <TabPanel value={activeStep} index={1}>
                    <div>
                        <TextField
                            name='title'
                            label="Название"
                            variant="standard"
                            fullWidth
                            value={project.title}
                            onChange={(e) => setProject({ ...project, title: e.target.value})}
                        />
                        <TextField
                            name='description'
                            label="Описание"
                            variant="standard"
                            fullWidth
                            value={project.description}
                            onChange={(e) => setProject({ ...project, description: e.target.value})}
                        />
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={2}>
                    <div className={classes.root}>
                        Проверили все ли верно?
                        {project.title}
                        {project.description}
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={3}>
                    <Typography>
                        Проект создан
                    </Typography>
                </TabPanel>
            </QContainer>
            <QStepper steps={4} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </div>
    );
}