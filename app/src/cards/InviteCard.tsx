import React from 'react';
import {Invite} from "../tools/dto";
import {Avatar, Stack} from "@mui/material";
import Typography from "../components/Typography";
import {Parameter} from "../components/Parameter";
import ProjectPage from "../dialogs/ProjectView";
import {useToggle} from "usehooks-ts";

interface InviteCardProps {
    invite: Invite
    refetch: () => void
}

export function InviteCard({ invite, refetch }: InviteCardProps) {
    const [open, toggleOpen] = useToggle()

    return (
        <>
            <Stack direction="row" style={{ borderRadius: 8, backgroundColor: 'white' }} onClick={toggleOpen}>
                {invite.project && (
                    <div>
                        <div style={{borderRadius: '8px 0 0 8px', height: '100%', display: 'flex', width: 60, backgroundImage: `url(${invite.project.image})`, backgroundSize: 'cover', backgroundPosition: 'center'}} />
                    </div>
                )}
                <Stack spacing={2} direction="column" style={{ padding: 9, width: '100%' }}>
                    <Stack spacing={1} style={{flexGrow:1}}>
                        {invite.project && (
                            <Typography variant="Header2">{invite.project.title}</Typography>
                        )}
                        {invite.project?.place && <Parameter name="place2" title={invite.project?.place.title} />}
                    </Stack>
                </Stack>
            </Stack>
            <ProjectPage projectId={invite.project?.id} open={open} onClose={toggleOpen} />
        </>

)
}
