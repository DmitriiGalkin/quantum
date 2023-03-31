import React, {useState} from 'react';
import {Project, useAddProject, useProject, useUpdateProject} from "../modules/project";
import QStepper from "../components/QStepper";
import ForwardAppBar from "../components/ForwardAppBar";
import {TabPanel} from "../components/tabs";
import QContainer from "../components/QContainer";
import {useParams} from "react-router-dom";
import {TextField, Theme, Typography} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";

const DEFAULT_PROJECT: Project = {
    id: 12,
    image: '/group_dd.jpg',
    title: 'новый проект',
    description: 'описание нового проекта',
    users: [],
    meets: [],
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

export interface CreateProjectDialogProps {
    isEdit?: boolean;
    onClose: () => void;
}
export default function CreateProjectDialog({ isEdit, onClose }: CreateProjectDialogProps) {
    const classes = useStyles();
    const { id } = useParams();
    const { data: projectOld } = useProject(id ? Number(id) : 0)
    const [project, setProject] = useState(projectOld || DEFAULT_PROJECT)
    const [activeStep, setActiveStep] = React.useState(0);
    const addProject = useAddProject()
    const updateProject = useUpdateProject()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 1) {
            isEdit ? updateProject.mutate(project) : addProject.mutate(project)
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Dialog onClose={onClose} open={true} fullScreen>
            <ForwardAppBar title={isEdit ? 'Редактирование проекта' : "Создание проекта"}/>
            <QContainer>
                <TabPanel value={activeStep} index={0}>
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
                <TabPanel value={activeStep} index={1}>
                    <div className={classes.root}>
                        Проверили все ли верно?
                        {project.title}
                        {project.description}
                    </div>
                </TabPanel>
                <TabPanel value={activeStep} index={2}>
                    <Typography>
                        Проект создан
                    </Typography>
                </TabPanel>
            </QContainer>
            <QStepper steps={3} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </Dialog>
    );
}