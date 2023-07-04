import {useCallback, useEffect, useState} from "react";

interface ShareProps {
    title?: string
    text?: string
    url?: string
}
export const getOnShare = ({ title, text, url }: ShareProps) => async () => {
    try {
        await navigator.share({
            title,
            text,
            url: `https://selfproject.ru` + url
        });
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
export const useBeforeinstallprompt = () => {
    const [userText, setUserText] = useState("");

    const handleUserKeyPress = useCallback((event: { preventDefault: () => void; }) => {
        setUserText('Ура!');
        // Запрет показа информационной мини-панели на мобильных устройствах.
        event.preventDefault();
        console.log('👍', 'beforeinstallprompt', event);
        // Убираем событие, чтобы его можно было активировать позже.
        // @ts-ignore
        window.deferredPrompt = event;
        // Убираем класс «hidden» из контейнера кнопки установки.
        // divInstall.classList.toggle('hidden', false);
    }, []);

    useEffect(() => {
        window.addEventListener("beforeinstallprompt", handleUserKeyPress);
        return () => {
            window.removeEventListener("beforeinstallprompt", handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    return userText
}