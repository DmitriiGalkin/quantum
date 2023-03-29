import {BottomNavigation, BottomNavigationAction, Paper, Theme} from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import RocketIcon from "@mui/icons-material/Rocket";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import React from "react";
import {makeStyles} from "@mui/styles";
import {useLocation, useNavigate} from "react-router-dom";

const MAIN_PAGES = ['', 'projects', 'tasks', 'uniques']
export default function QBottomNavigation() {
    const navigate = useNavigate();
    const location = useLocation();
    const value = MAIN_PAGES.findIndex((pageName) => '/' + pageName === location.pathname) || 0

    const onChange = (index: number) => {
        switch (index) {
            case 0:
            default:
                return navigate('/')
            case 1:
                return navigate('/projects')
            case 2:
                return navigate('/tasks')
            case 3:
                return navigate('/uniques')
        }
    }

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => onChange(newValue)}
            showLabels
        >
            <BottomNavigationAction label="Встречи" icon={<GroupsIcon />} />
            <BottomNavigationAction label="Проекты" icon={<RocketIcon />} />
            <BottomNavigationAction label="Задания" icon={<EmojiEventsIcon />} />
            <BottomNavigationAction label="Ценности" icon={<AutoAwesomeIcon />} />
        </BottomNavigation>
    )
}