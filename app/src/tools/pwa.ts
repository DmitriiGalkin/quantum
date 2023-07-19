import {useCallback, useEffect} from "react";

interface ShareProps {
    title?: string
    text?: string
    url?: string
}
export const getOnShare = ({ title, text, url }: ShareProps) => () => {
    try {
        navigator.share({
            title,
            text,
            url: `https://selfproject.ru` + url
        }).then();
    }
    catch(e) {
        console.log('Ошибка функции "Поделиться"', e);
    }
}

/**
 * Определяем в каком режиме работает приложение
 */
export const getPWADisplayMode = () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (document.referrer.startsWith('android-app://')) {
        return 'twa';
    // @ts-ignore
    } else if (window.navigator.standalone || isStandalone) {
        return 'standalone';
    }
    return 'browser';
}

/**
 * Хук срабатывающий при возможности добавить сайт как приложение
 */
export const usePWA = () => {
    const handleUserKeyPress = useCallback((event: { preventDefault: () => void; }) => {
        // Запрет показа информационной мини-панели на мобильных устройствах.
        event.preventDefault();
        // Убираем событие, чтобы его можно было активировать позже.
        // @ts-ignore
        window.deferredPrompt = event;
    }, []);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handleUserKeyPress);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    // @ts-ignore
    return { onInstall: () => window.deferredPrompt.prompt(), mode: getPWADisplayMode() }
}