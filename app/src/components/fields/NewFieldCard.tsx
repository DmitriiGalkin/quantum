import React, {useState} from 'react';

import {CardContent, Stack, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";
import {makeStyles} from "@mui/styles";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../TransitionDialog";
import CreateProject from "../../dialogs/CreateProject";

const useStyles = makeStyles(() => ({
    blockInner: {
        width: '100%',
        paddingTop: '100%',
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 25,
    },
}));

interface NewFieldCardProps {
    onClick: (e: any) => void
    label: string
}

export default function NewFieldCard({ onClick, label }: NewFieldCardProps) {
    const classes = useStyles();

    return (
        <div onClick={onClick}>
            <div className={classes.blockInner}>
                <div className={classes.image} style={{ border: `4px dashed #070707` }}>
                    <div style={{ margin: '12px auto', width: 35 }}>
                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5001 2.0581L17.5001 32.9418" stroke="#070707" strokeWidth="2.68302" strokeLinecap="round"/>
                            <path d="M2.05811 17.5001L32.9418 17.5001" stroke="#070707" strokeWidth="2.68302" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div style={{ paddingTop: 11, fontSize: 13, textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center' }}>{label}</div>
        </div>
    );
}
