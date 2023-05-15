import React from 'react';
import QContainer from "../components/QContainer";
import {Box, Stack} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import {TransitionDialog} from "../components/TransitionDialog";
import Back from "../components/Back";
import ProjectCard from "../components/cards/ProjectCard";
import {useCommunitys} from "../modules/community";
import {useNavigate} from "react-router-dom";
import CommunityCard from "../components/cards/CommunityCard";

export interface CommunitysDialogProps {
    openCommunity: boolean
    onClose: () => void
}
export default function CommunitysDialog({ openCommunity, onClose }: CommunitysDialogProps) {
    const { data: communitys = [] } = useCommunitys();
    const navigate = useNavigate();

    return (
        <Dialog onClose={onClose} open={openCommunity} fullScreen TransitionComponent={TransitionDialog}>
            <Back title="Настройки" onClick={onClose}/>
            <QContainer>
                {(Boolean(communitys.length)) ? (
                    <Stack spacing={2}>
                        <Stack spacing={2}>
                            {communitys.map((community) => <CommunityCard key={community.id} community={community} onClick={() => navigate(`/community/${community.id}`)}/>)}
                        </Stack>
                    </Stack>
                ) : (
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        minHeight="80vh"
                    >
                        <span>Список сообществ пуст</span>
                    </Box>
                )}
            </QContainer>
        </Dialog>
    );
}