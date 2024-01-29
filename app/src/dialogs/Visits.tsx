import React from 'react';
import {useVisits} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {useAuth} from "../tools/auth";
import {VisitCard} from "../cards/VisitCard";
import {getVisitGroups} from "../tools/helper";
import Typography from "../components/Typography";
import {Block} from "../components/Block";

export interface UserMeetsProps {
    onClose: () => void
}
function Visits({ onClose }: UserMeetsProps) {
    const { user } = useAuth();
    const { data, refetch } = useVisits(user.id);
    const visitGroups = getVisitGroups(data)

    return (
        <>
            <DialogHeader title="Посещения" onClick={onClose}/>
            <DialogContent>
                <Block variant="primary">
                    <Stack spacing={4}>
                        {visitGroups.map(group => (
                            <Stack spacing={2}>
                                <Typography variant="Header2">{group.title}</Typography>
                                <Stack spacing={1}>
                                    {group.visits?.map((visit) => <VisitCard key={visit.id} refetch={refetch} visit={visit}/> )}
                                </Stack>
                            </Stack>
                        ))}
                    </Stack>
                </Block>
            </DialogContent>
        </>
    );
}
export default withDialog(Visits)
