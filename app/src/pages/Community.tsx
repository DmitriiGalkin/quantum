import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Button, Stack} from "@mui/material";
import ProjectCard from "../components/cards/ProjectCard";
import {useNavigate, useParams} from "react-router-dom";
import Back from "../components/Back";
import QContainer from "../components/QContainer";
import {useCommunity} from "../modules/community";
import {getOnShare} from "../tools/share";
import {useAddCommunityUser, useDeleteCommunityUser} from "../modules/user";
import SaveIcon from "@mui/icons-material/Save";

export default function CommunityPage() {
    const { id: communityId } = useParams();
    const navigate = useNavigate();

    const { data: community } = useCommunity(Number(communityId))

    const addCommunityUser = useAddCommunityUser(community?.id)
    const deleteCommunityUser = useDeleteCommunityUser(community?.id)

    if (!community) return null;

    const onClick = () => {
        if (community.active) {
            deleteCommunityUser.mutate({ communityId: community.id })
        } else {
            addCommunityUser.mutate({ communityId: community.id })
        }
    }

    const menuItems = [
        { title: 'Поделиться', onClick: getOnShare({
                title: community?.title,
                text: community?.description,
                url: `/community/${community?.id}`
            })},
        { title: 'Участники', onClick: () => console.log('1')},
        // { title: 'Редактировать', onClick: () => setEditProject(project)},
        { title: 'Выйти из сообщества', onClick: () => onClick()},
    ]

    return (
        <>
            <Back title={community.title} menuItems={menuItems}/>
            <QContainer>
                <Stack spacing={2}>
                    <Typography>
                        {community.description}
                    </Typography>
                    {!community.active && (
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            startIcon={<SaveIcon />}
                            onClick={onClick}
                        >
                            Участвовать в сообществе
                        </Button>
                    )}
                    <Stack spacing={2}>
                        {community.projects.map((project) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                onClick={() => navigate(`/project/${project.id}`)}
                            />
                        ))}
                    </Stack>
                </Stack>
            </QContainer>
        </>
    );
}
