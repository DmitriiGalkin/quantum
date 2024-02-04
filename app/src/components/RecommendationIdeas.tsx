import React, {ReactNode} from 'react';
import {Box, Stack} from "@mui/material";
import Typography from "./Typography";
import {Block} from "./Block";
import Masonry from "@mui/lab/Masonry";
import {ProjectCard} from "../cards/ProjectCard";
import {Button} from "./Button";
import {useIdeas, useProjects} from "../tools/service";
import {useAuth} from "../tools/auth";
import {Idea} from "../tools/dto";
import {IdeaCard} from "../cards/IdeaCard";
import Ideas from "../dialogs/Ideas";
import {useToggle} from "usehooks-ts";

interface RecommendationIdeasProps {
    ideas: Idea[]
    toggleIdeasC: () => void
}
export function RecommendationIdeas({ ideas, toggleIdeasC }: RecommendationIdeasProps) {
    return (
        <Stack spacing={2}>
            {Boolean(ideas.length) && (
                <>
                    <Typography variant="Header2">Идеи для вдохновения</Typography>
                    <Stack spacing={1}>
                        {ideas?.map((idea) =>
                            <IdeaCard key={idea.id} idea={idea} refetch={() => console.log('1')} />
                        )}
                    </Stack>
                </>
            )}
            <Button onClick={toggleIdeasC} variant="outlined">Банк идеи</Button>
        </Stack>
    )
}
