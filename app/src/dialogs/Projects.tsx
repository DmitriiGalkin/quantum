import React, {useState} from 'react';
import {IdeaFilter, ProjectFilter, useIdeas, useProjects} from "../tools/service";
import {DialogHeader, ProjectCard} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import Masonry from "@mui/lab/Masonry";

export interface ProjectsProps {
    onClose: () => void
}
function Projects({ onClose }: ProjectsProps) {
    const [filter, setFilter] = useState<ProjectFilter>({ self: true })
    const { data = [], refetch } = useProjects(filter);

    return (
        <>
            <DialogHeader title="Мои проекты" onClick={onClose}/>
            <DialogContent>
                <div style={{ padding: '8px 2px 8px 8px' }}>
                    <Masonry columns={2} spacing={1}>
                        {data.map((project,index) =>
                            <ProjectCard key={project.id} project={project} refetchParent={refetch} />
                        )}
                    </Masonry>
                </div>
            </DialogContent>
        </>
    );
}
export default withDialog(Projects)
