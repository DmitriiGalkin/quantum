import React, {useState} from 'react';
import {IdeaFilter, ProjectFilter, useIdeas, useProjects} from "../tools/service";
import {Stack} from "@mui/material";
import {DialogHeader, ProjectCard} from "../components";
import {DialogContent} from "../components/DialogContent";
import {withDialog} from "../components/helper";
import {useToggle} from "usehooks-ts";
import {AgeField} from "../components/AgeField";
import {Block} from "../components/Block";
import Masonry from "@mui/lab/Masonry";
import Checkbox from "../components/Checkbox";
import Typography from "../components/Typography";

export interface ProjectsProps {
    onClose: () => void
}
function Projects({ onClose }: ProjectsProps) {
    const [filter, setFilter] = useState<ProjectFilter>({ deleted: false });
    const { data = [], refetch } = useProjects(filter);
    const [options, toggleOptions] = useToggle()

    return (
        <>
            <DialogHeader title="Мои проекты" onClick={onClose} onClickOption={toggleOptions} />
            <DialogContent>
                {options && (
                    <Block variant="primary">
                        <Stack direction="row" spacing={1} justifyContent="space-between">
                            <Typography variant="Body">Отобразить удаленные проекты</Typography>
                            <Checkbox checked={filter.deleted} onChange={(deleted) => {
                                setFilter({...filter, deleted})
                            }}/>
                        </Stack>
                    </Block>
                )}
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
