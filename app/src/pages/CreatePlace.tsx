import React, {useState} from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {TabPanel} from "../components/tabs";
import QStepper from "../components/QStepper";
import QContainer from "../components/QContainer";
import {Box, TextField, Typography} from "@mui/material";
import {NewPlace, useAddPlace} from "../modules/place";

const DEFAULT_PLACE: NewPlace = {}
export default function CreatePlacePage() {
    const [place, setPlace] = useState(DEFAULT_PLACE)
    const [activeStep, setActiveStep] = React.useState(0);
    const addPlace = useAddPlace()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 0) {
            addPlace.mutate(place)
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>
            <ForwardAppBar title="Создание пространства"/>
            <QContainer>
                <TabPanel value={activeStep} index={0}>
                    <Box sx={{ mt: 1 }}>
                        <TextField
                            name='title'
                            label="Название"
                            variant="standard"
                            fullWidth
                            value={place.title}
                            onChange={(e) => setPlace({ ...place, title: e.target.value})}
                        />
                        <TextField name='description' label="Описание" variant="standard" fullWidth value={place.description} onChange={(e) => setPlace({ ...place, description: e.target.value})}/>
                    </Box>
                </TabPanel>
                <TabPanel value={activeStep} index={1}>
                    <Typography>
                        Пространство создано
                    </Typography>
                </TabPanel>
            </QContainer>
            <QStepper steps={2} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </div>
    );
}