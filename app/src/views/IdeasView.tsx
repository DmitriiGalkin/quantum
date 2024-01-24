import React, {useState} from 'react';
import {useIdeas} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {IdeaCard} from "../cards/IdeaCard";
import {Idea} from "../tools/dto";

export interface UserMeetsProps {
    onClose: () => void
}
function Visits({ onClose }: UserMeetsProps) {
    const { data, refetch } = useIdeas();

    return (
        <>
            <DialogHeader title="Идеи" onClick={onClose}/>
            <DialogContent>
                <Stack spacing={1}>
                    {data?.map((idea,index) =>
                        <IdeaCard key={idea.id} idea={idea} refetch={refetch} />
                    )}
                </Stack>
            </DialogContent>
        </>
    );
}
export default withDialog(Visits)
