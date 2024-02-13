import React from 'react'

import { COLOR } from '../tools/theme'

interface DisplaySwitchProps {
  display: boolean
  toggleDisplay: () => void
}
export function DisplaySwitch({ display, toggleDisplay }: DisplaySwitchProps): JSX.Element {
  return (
    <div onClick={toggleDisplay} style={{ display: 'flex' }}>
      <div
        style={{
          opacity: display ? 0.5 : undefined,
          border: '2px solid white',
          borderRight: 0,
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: display ? COLOR : 'white',
          padding: '6px 7px',
          display: 'flex',
        }}
      >
        <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect
            x="0.75"
            y="0.75"
            width="22.1786"
            height="14.5"
            rx="3.25"
            stroke={display ? 'white' : COLOR}
            strokeWidth="1.5"
          />
          <mask id="path-2-inside-1_542_1158" fill="white">
            <rect x="4" y="3.42859" width="7.28571" height="9.14286" rx="1" />
          </mask>
          <rect
            x="4"
            y="3.42859"
            width="7.28571"
            height="9.14286"
            rx="1"
            stroke={display ? 'white' : COLOR}
            strokeWidth="3"
            mask="url(#path-2-inside-1_542_1158)"
          />
          <path
            d="M19.1121 4.28217L14.2075 4.28217"
            stroke={display ? 'white' : COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M19.1121 11.8528L14.2075 11.8528"
            stroke={display ? 'white' : COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M16.6599 7.08667H14.2076"
            stroke={display ? 'white' : COLOR}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div
        style={{
          opacity: !display ? 0.5 : undefined,
          border: '2px solid white',
          borderLeft: 0,
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
          backgroundColor: display ? 'white' : COLOR,
          padding: '6px 10px',
          display: 'flex',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.923558 15.8067C1.12788 15.8067 1.34038 15.7332 1.60192 15.5861L5.76202 13.3466L10.2817 15.8803C10.576 16.0438 10.8947 16.1255 11.1971 16.1255C11.4832 16.1255 11.7692 16.0519 12.0144 15.913L16.2889 13.4856C16.7793 13.2159 17 12.8236 17 12.276V1.26683C17 0.662019 16.6649 0.326923 16.0764 0.326923C15.8721 0.326923 15.6596 0.392308 15.3899 0.539423L11.0582 2.95048L6.62019 0.228846C6.36683 0.0817308 6.08077 0 5.79471 0C5.50048 0 5.20625 0.0817308 4.95288 0.228846L0.702885 2.64808C0.220673 2.92596 0 3.31827 0 3.86587V14.8587C0 15.4635 0.335096 15.8067 0.923558 15.8067ZM5.23077 12.0471L1.54471 14.074C1.50385 14.0904 1.46298 14.1149 1.42212 14.1149C1.35673 14.1149 1.31587 14.0659 1.31587 13.9841V4.18462C1.31587 3.98846 1.38942 3.84952 1.58558 3.7351L4.93654 1.77356C5.04279 1.71635 5.13269 1.66731 5.23077 1.6101V12.0471ZM6.54663 12.1779V1.78173C6.62837 1.83077 6.72644 1.87981 6.80817 1.92885L10.4534 4.15192V14.3683C10.3389 14.3029 10.2163 14.2457 10.0938 14.1803L6.54663 12.1779ZM11.7692 14.5154V4.07019L15.4553 2.05962C15.4962 2.0351 15.537 2.01875 15.5697 2.01875C15.6433 2.01875 15.6841 2.06779 15.6841 2.14952V11.949C15.6841 12.1534 15.6024 12.2923 15.4144 12.4067L12.137 14.3111C12.0144 14.3846 11.8918 14.4582 11.7692 14.5154Z"
            fill={display ? '#FFA028' : 'white'}
          />
        </svg>
      </div>
    </div>
  )
}
