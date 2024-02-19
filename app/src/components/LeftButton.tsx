import React from 'react'

import { COLOR_LOW } from '../tools/theme'
import { Icon, IconName } from './Icon'

interface LeftButtonProps {
  onClick: () => void
  iconName: IconName
}
export const LeftButton = ({ iconName, onClick }: LeftButtonProps): JSX.Element => {
  return (
    <div style={{ position: 'absolute', top: 16, left: 0 }}>
      <div
        onClick={onClick}
        style={{
          backgroundColor: COLOR_LOW,
          padding: 4,
          borderRadius: '0 8px 8px 0',
          display: 'inline-flex',
        }}
      >
        <Icon color="white" name={iconName} />
      </div>
    </div>
  )
}
