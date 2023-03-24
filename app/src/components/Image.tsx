import React from 'react';
import { makeStyles } from '@mui/styles';
import {Box} from "@mui/material";

const useStyles = makeStyles((theme) => ({
    imageW: {
        position: 'relative',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 12,
    },
    imageContainer: {
        width: '100%',
        paddingTop: '100%',
    }
}));

export default function Image({ src, alt, borderRadius }: { src: string, alt: string, borderRadius?: string }) {
    const classes = useStyles();

    return (
        <Box className={classes.imageW}>
            <Box className={classes.imageContainer}>
                <img alt={alt} src={src}  className={classes.image} style={{ borderRadius }}/>
            </Box>
        </Box>
    );
}