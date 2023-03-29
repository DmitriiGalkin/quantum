import React, {useState} from 'react';
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Theme,
    Typography
} from "@mui/material";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {makeStyles} from "@mui/styles";
import {useAuth} from "../tools/auth";
import {uri} from "../auth";
import GoogleIcon from "../components/GoogleIcon";


const useStyles = makeStyles((theme: Theme) => ({
    content: {
        backgroundColor: theme.palette.background.default,
    },
}));
export default function LoginPage() {
    const classes = useStyles();

    const { login } = useAuth();

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const toLogin = {
            email: data.get("email"),
            password: data.get("password")
        }
        login(toLogin);
    };

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    return (
        <div style={{ height: '100vh', width: '100%', backgroundColor: 'white' }}>
            <Box sx={{pt:6, pb:6}} className={classes.content}>
                <img src="/img.png" alt="мальчик" style={{ width: '100%' }}/>
            </Box>
            <Box sx={{mt:6}}>
                <Container style={{ padding: '18px' }}>
                    <Stack spacing={4}>
                        <Box>
                            <Typography variant="h4">
                                Привет, участник
                            </Typography>
                            <Typography variant="subtitle1">
                                Авторизуйся для продолжения
                            </Typography>
                        </Box>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Телефон или Почта"
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
                                label="Пароль"
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
                                size="large"
                            >
                                Войти
                            </Button>
                        </Box>

                        <Button variant="outlined" startIcon={<GoogleIcon/>} fullWidth href={uri}>
                            Вход через аккаунт Google
                        </Button>
                    </Stack>
                </Container>
            </Box>
        </div>
    )
}
