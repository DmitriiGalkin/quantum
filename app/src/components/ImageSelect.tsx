import React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {makeStyles} from "@mui/styles";

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

interface Prop {
    image?: string
    id: number
    title: string
}
interface SelectProps<T> {
    label: string
    selectedId?: number
    items: T[]
    onChange: (item: T) => void
    onAdd?: () => void
}

export function ImageSelect<T extends Prop>({ label, selectedId, items, onChange, onAdd }: SelectProps<T>) {
    const classes = useStyles();

    return (
        <div>
            <label htmlFor={label}>{label}</label>
            <Grid container spacing={3}>
                {onAdd && (
                    <Grid xs={3}>
                        <div onClick={onAdd}>
                            <div className={classes.blockInner}>
                                <div className={classes.image} style={{ border: `2px dashed #070707` }}>
                                    <div style={{ margin: '12px auto', width: 35 }}>
                                        <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.5001 2.0581L17.5001 32.9418" stroke="#070707" strokeWidth="2.68302" strokeLinecap="round"/>
                                            <path d="M2.05811 17.5001L32.9418 17.5001" stroke="#070707" strokeWidth="2.68302" strokeLinecap="round"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div style={{ paddingTop: 11, textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center' }}>{label}</div>
                        </div>
                    </Grid>
                )}
                {items.map((item) => (
                    <Grid xs={3} key={item?.id}>
                        <div onClick={() => {onChange(item)}}>
                            <div className={classes.blockInner}>
                                <img src={item?.image} className={classes.image} style={{ outline: `3px solid ${selectedId === item?.id ? '#7139FF' : 'transparent' }`}}/>
                            </div>
                            <div style={{ paddingTop: 11, textOverflow: 'ellipsis', overflow: 'hidden', textAlign: 'center' }}>{item.title}</div>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}
