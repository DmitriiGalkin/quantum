import Masonry from '@mui/lab/Masonry'
import { Stack } from '@mui/material'
import React, { useState } from 'react'
import { useToggle } from 'usehooks-ts'

import { DialogHeader, ProjectCard } from '../components'
import { Block } from '../components/Block'
import Checkbox from '../components/Checkbox'
import { DialogContent } from '../components/DialogContent'
import Typography from '../components/Typography'
import { withDialog } from '../components/helper'
import { ProjectFilter, useProjects } from '../tools/service'

export interface ProjectsProps {
  onClose: () => void
}
function Projects({ onClose }: ProjectsProps) {
  const [filter, setFilter] = useState<ProjectFilter>({ deleted: false })
  const { data = [], refetch } = useProjects(filter)
  const [options, toggleOptions] = useToggle()

  return (
    <>
      <DialogHeader title="Банк проектов" onClick={onClose} onClickOption={toggleOptions} />
      <DialogContent>
        {options && (
          <Block variant="primary">
            <Stack direction="row" spacing={1} justifyContent="space-between">
              <Typography variant="Body">Отобразить удаленные проекты</Typography>
              <Checkbox
                checked={filter.deleted}
                onChange={(deleted) => {
                  setFilter({ ...filter, deleted })
                }}
              />
            </Stack>
          </Block>
        )}
        <div style={{ padding: '8px 2px 8px 8px' }}>
          <Masonry columns={2} spacing={1}>
            {data.map((project) => (
              <ProjectCard key={project.id} project={project} refetchParent={refetch} variant="recommendation" />
            ))}
          </Masonry>
        </div>
      </DialogContent>
    </>
  )
}
export default withDialog(Projects)
