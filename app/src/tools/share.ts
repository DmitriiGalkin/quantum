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