import { useCallback, useEffect, useState } from 'react'

interface ShareProps {
  text?: string
  url?: string
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getOnShare = ({ text, url }: ShareProps) => () => {
  try {
    navigator
      .share({
        text,
        url: `https://selfproject.ru` + url,
      })
      .then(() => {
        console.log('Sharing was successful');
      })
      .catch((error) => {
        console.error('Sharing failed:', error);
      })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Ошибка функции "Поделиться"', error)
  }
}

/**
 * Определяем в каком режиме работает приложение
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getPWADisplayMode = () => {
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  if (document.referrer.startsWith('android-app://')) {
    return 'twa'
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (window.navigator.standalone || isStandalone) {
    return 'standalone'
  }
  return 'browser'
}

/**
 * Хук срабатывающий при возможности добавить сайт как приложение
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePWA = () => {
  const handleUserKeyPress = useCallback((event: { preventDefault: () => void }) => {
    // Запрет показа информационной мини-панели на мобильных устройствах.
    event.preventDefault()
    // Убираем событие, чтобы его можно было активировать позже.
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.deferredPrompt = event
  }, [])

  useEffect(() => {
    window.addEventListener('beforeinstallprompt', handleUserKeyPress)
    return () => {
      window.removeEventListener('beforeinstallprompt', handleUserKeyPress)
    }
  }, [handleUserKeyPress])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return { onInstall: () => window.deferredPrompt.prompt(), mode: getPWADisplayMode() }
}

/**
 * Возвращает позицию посетителя
 */
export const usePosition = (): { latitude?: number; longitude?: number } => {
  const [position, setPosition] = useState<GeolocationPosition | undefined>()

  useEffect(() => {
    if (navigator.geolocation) {
      // eslint-disable-next-line no-console
      navigator.geolocation.getCurrentPosition(setPosition, () => console.log('Что то не так с определением позиции'), {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 0,
      })
    }
  }, [position?.coords.latitude, position?.coords.longitude])

  return {
    latitude: position?.coords.latitude,
    longitude: position?.coords.longitude,
  }
}
