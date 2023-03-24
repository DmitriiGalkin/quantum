import React, {useState} from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {TabPanel} from "../components/tabs";
import {useAddUser, User, useUpdateUser, useUser} from "../modules/user";
import QStepper from "../components/QStepper";
import QContainer from "../components/QContainer";
import {Box, TextField, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

const DEFAULT_USER = {} as User
export default function CreateUserPage({ isEdit }: {isEdit?: boolean}) {
    const { id } = useParams();
    const { data: userOld } = useUser(id ? Number(id) : 0)
    const [user, setUser] = useState(userOld || DEFAULT_USER)
    const [activeStep, setActiveStep] = React.useState(0);
    const addUser = useAddUser()
    const updateUser = useUpdateUser()

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        if (activeStep === 0) {
            isEdit ? updateUser.mutate(user) : addUser.mutate(user)
        }
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div>
            <ForwardAppBar title="Регистрация"/>
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
                            onChange={(e) => setUser({ ...user, password: e.target.value})}
                        />
                        <TextField
                            name='title'
                            label="Имя и фамилия"
                            variant="standard"
                            fullWidth
                            value={user.title}
                            onChange={(e) => setUser({ ...user, title: e.target.value})}
                        />
                    </Box>
                </TabPanel>
                <TabPanel value={activeStep} index={1}>
                    <Typography>
                        Участник создан!
                        - найти пространства
                        - найти проекты
                    </Typography>
                </TabPanel>
            </QContainer>
            <QStepper steps={2} activeStep={activeStep} handleBack={handleBack} handleNext={handleNext}/>
        </div>
    );
}