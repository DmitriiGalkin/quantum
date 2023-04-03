import React from 'react';
import {Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Avatar, {genConfig} from 'react-nice-avatar'
import {User} from "../modules/user";

const useStyles = makeStyles((theme: Theme) => ({
    large: {
        width: `${theme.spacing(5)} !important`,
        height: `${theme.spacing(5)} !important`,
    },
}));

export default function QAvatar(user: User) {
    const classes = useStyles();
    const config = genConfig(String(user.id))
    return <Avatar className={classes.large} {...config} />
}