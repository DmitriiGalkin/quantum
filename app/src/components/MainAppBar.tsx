import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MapIcon from '@mui/icons-material/Map';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AssignmentInd from '@mui/icons-material/AssignmentInd';

import {
    AppBar,
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography
} from "@mui/material";

import {useNavigate} from "react-router-dom";
import {useAuth, useUnit} from "../tools/hooks";
import {makeStyles} from "@mui/styles";
import InstallPWA from "./InstallPWA";

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: 250,
    },
}));

export default function MainAppBar() {
    const classes = useStyles();
    const user = useUnit();

    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const { logout } = useAuth();

    const map = () => {
        navigate('/map')
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={() => setOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        СВОЙ ПРОЕКТ
                    </Typography>
                    <InstallPWA/>
                </Toolbar>
            </AppBar>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box
                    role="presentation"
                    onClick={()=> setOpen(false)}
                    className={classes.drawer}
                >
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/user/'+user.id)} >
                                <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Профиль'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={map} >
                                <ListItemIcon>
                                    <MapIcon />
                                </ListItemIcon>
                                <ListItemText primary={'Карта'} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => navigate('/user/1/edit')}>
                                <ListItemIcon>
                                    <AssignmentInd />
                                </ListItemIcon>
                                <ListItemText primary='Настройки' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem key={'logout'} disablePadding>
                            <ListItemButton onClick={logout}>
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary='Выход' />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
}
