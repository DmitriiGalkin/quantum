import React, {useRef, useState} from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {TabPanel} from "../components/tabs";
import {useAddUser, User, useUpdateUser} from "../modules/user";
import QStepper from "../components/QStepper";
import QContainer from "../components/QContainer";
import {Box, TextField, Typography} from "@mui/material";
import Avatar, { genConfig } from 'react-nice-avatar'

const DEFAULT_USER = {} as User
export default function RegistrationPage({ isEdit }: {isEdit?: boolean}) {

    const [user, setUser] = useState(DEFAULT_USER)
    const [activeStep, setActiveStep] = React.useState(0);
    const addUser = useAddUser()
    const updateUser = useUpdateUser()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 1) {
            isEdit ? updateUser.mutate(user) : addUser.mutate(user)
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
    const config = genConfig(user.title)
    console.log(user, 'user')
    return (
        <div>
            <ForwardAppBar title="Регистрация"/>
            <img src="/img.png" alt="мальчик" style={{ width: '100%' }}/>
            <QContainer>
                <TabPanel value={activeStep} index={0}>
                    <Box>
                        <TextField
                            name='email'
                            label="Телефон/Почта"
                            variant="standard"
                            fullWidth
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value})}
                        />
                        <TextField
                            name='password'
                            label="Пароль"
                            variant="standard"
                            fullWidth
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={activeStep} index={1}>
                    <Box>
                        <Avatar style={{ width: '12rem', height: '12rem' }} {...config} />
                        <TextField
                            name='title'
                            label="Имя и фамилия"
                            variant="standard"
                            fullWidth
                            value={user.title}
                            onChange={(e) => setUser({ ...user, title: e.target.value, image: JSON.stringify(genConfig(e.target.value)) })}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={activeStep} index={2}>
                    <Typography>
                        Участник создан!
                        - найти пространства
                        - найти проекты
                    </Typography>
                </TabPanel>
            </QContainer>
            <QStepper steps={3} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </div>
    );
}