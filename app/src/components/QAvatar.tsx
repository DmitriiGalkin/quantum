import React from 'react';
import {Theme, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Avatar, {genConfig} from 'react-nice-avatar'
import {User} from "../modules/user";

const useStyles = makeStyles((theme: Theme) => ({
    large: {
        width: `${theme.spacing(5)} !important`,
        height: `${theme.spacing(5)} !important`,
        border: `1px solid ${theme.palette.primary.main}`
    },
}));

export default function QAvatar(user: User) {
    const classes = useStyles();
    const avatar = user.avatar ? user.avatar : genConfig(String(user.id))
    return (
        <div>
            <Tooltip disableFocusListener title={user.title}>
                <div>
                    <Avatar className={classes.large} {...avatar} />
                </div>
            </Tooltip>
        </div>
    )
}
