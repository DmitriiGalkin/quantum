import React from 'react';
import {Avatar as MUIAvatar, Theme} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Avatar, { genConfig } from 'react-nice-avatar'
import {User} from "../modules/user";

const useStyles = makeStyles((theme: Theme) => ({
    large: {
        width: `${theme.spacing(5)} !important`,
        height: `${theme.spacing(5)} !important`,
    },
}));

export default function QAvatar(user: User) {
    const classes = useStyles();
    try {
        if (!user.image) { throw Error }

        const stringConfig = JSON.parse(user.image)
        const config = genConfig(stringConfig)

        return <Avatar className={classes.large} {...config} />
    }
    catch (e) {
        return (
            <MUIAvatar
                alt={user.title}
                src={user.image}
                className={classes.large}
            />
        );
    }
}