import { Stack } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { usePWA } from '../tools/pwa'
import { COLOR_LOW } from '../tools/theme'
import { Button } from './Button'
import { Icon } from './Icon'

const TIMEOUT_DAYS = 3 // После отказа устанавливать банер мы запоминаем волеизъявление пользователя на 3 дня

interface AppBannerProps {
  title: string
}
export function AppBanner({ title }: AppBannerProps): React.ReactNode {
  const { onInstall } = usePWA()
  const [applicationInstallDate, setApplicationInstallDate] = useLocalStorage(
    'applicationInstallDate',
    new Date().toString(),
  )
  const diffDay = dayjs(applicationInstallDate).diff(dayjs(), 'day')

  const onClose = () => {
    const newApplicationInstallDate = dayjs().add(TIMEOUT_DAYS, 'day').format('YYYY-MM-DD HH:mm:ss')
    setApplicationInstallDate(newApplicationInstallDate)
  }

  if (diffDay > 0) {
    return null
  }

  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 25,
        padding: 20,
        background: `linear-gradient(180deg, ${COLOR_LOW} 0%, #FF8F28 100%)`,
      }}
    >
      <Stack spacing={3}>
        <Stack spacing={3} direction="row" alignItems="center">
          <div>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M31.9876 19.9999C31.9876 26.7698 26.5455 32.2579 19.8323 32.2579C13.1191 32.2579 7.67702 26.7698 7.67702 19.9999C7.67702 13.23 13.1191 7.7419 19.8323 7.7419C26.5455 7.7419 31.9876 13.23 31.9876 19.9999ZM27.325 38.5233C25.0133 39.4752 22.4835 39.9998 19.8323 39.9998C8.87922 39.9998 0 31.0456 0 19.9999C0 8.95427 8.87922 0 19.8323 0C30.7854 0 39.6646 8.95427 39.6646 19.9999C39.6646 23.9097 38.5521 27.5574 36.629 30.6387C35.6522 30.0292 34.5005 29.6774 33.2674 29.6774C29.7342 29.6774 26.8699 32.5659 26.8699 36.129C26.8699 36.975 27.0314 37.783 27.325 38.5233Z"
                fill="white"
              />
              <ellipse cx="33.2672" cy="36.1291" rx="3.83851" ry="3.87095" fill="white" />
            </svg>
          </div>
          <div style={{ color: 'black', fontSize: 15, fontWeight: 500, lineHeight: '23.7px', letterSpacing: '0.15px' }}>
            {title}
          </div>
        </Stack>
        <div>
          <Button onClick={onInstall} color="black">
            Установить
          </Button>
        </div>
        <div
          onClick={onClose}
          style={{
            color: 'black',
            opacity: 0.6,
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 500,
            lineHeight: '23.7px',
            letterSpacing: '0.45px',
          }}
        >
          не сейчас
        </div>
      </Stack>
      <div style={{ position: 'absolute', right: 18, top: 18 }}>
        <Icon onClick={onClose} name="close" />
      </div>
    </div>
  )
}
