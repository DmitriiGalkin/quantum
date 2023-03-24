import React, {useState} from 'react';
import {Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Theme, Link, Typography} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {makeStyles} from "@mui/styles";
import {useAuth} from "../tools/hooks";
import {Link as RouterLink} from "react-router-dom";


const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '32px 32px 0 0',
    },
}));
export default function LoginPage() {
    const classes = useStyles();

    const { login } = useAuth();

    const handleSubmit = (event: { currentTarget: HTMLFormElement | undefined; }) => {
        const data = new FormData(event.currentTarget);
        login({
            email: data.get("email"),
            password: data.get("password")
        });
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <>
            <img src="/img.png" alt="мальчик" style={{ width: '100%' }}/>
            <Box sx={{mt:6}} className={classes.content}>

                <Container style={{ padding: '18px' }}>
                    <Typography variant="h5">
                        Привет, участник
                    </Typography>
                    <Typography variant="subtitle1">
                        Пожалуйста авторизуйся
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Номер мобильного телефона/Почта"
                            name="email"
                            autoComplete="email"
                            variant="standard"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            id="password"
                            variant="standard"
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Войти
                        </Button>
                        <Grid container>
                            <Grid item>
                                <RouterLink to="/registration">
                                    <Link href="#" variant="body2">
                                        {"Нет аккаунта? Быстрая регистрация"}
                                    </Link>
                                </RouterLink>
                            </Grid>
                        </Grid>
                    </Box>
                </Container>
            </Box>
        </>
    )
}