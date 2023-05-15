import React from 'react';

import {CardContent, Typography} from "@mui/material";
import {Project} from "../../modules/project";
import QCard from "../QCard";
import Grid from '@mui/material/Unstable_Grid2';
import Image from "../Image";
import {Community} from "../../modules/community";

interface CommunityCardProps {
    community: Community
    active?: boolean
    selected?: boolean
    onClick?: () => void
}

export default function CommunityCard({ community, selected, onClick }: CommunityCardProps) {
    return (
        <QCard onClick={onClick} active={true} selected={selected}>
            <div style={{ flexGrow: 1 }}>
                <Grid container direction="row">
                    {community.image && (
                        <Grid xs={3}>
                            <Image src={community.image} paddingTop="150%"/>
                        </Grid>
                    )}
                    <Grid xs={9}>
                        <CardContent>
                            <Typography variant="h5">
                                {community.title}
                            </Typography>
                            <Typography style={{ overflow: 'hidden', height: 60 }}>
                                {community.description}
                            </Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        </QCard>
    );
}
