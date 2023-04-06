import {DateTimeFormatter, LocalDateTime} from "@js-joda/core";

// Форматирование даты, используемое для отправки на бек
export const serverDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

export const formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
export const formatter2 = DateTimeFormatter.ofPattern('yyyy-MM-dd');

const MONTH_SHORT_TITLES = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ','АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
export const getMonthShortTitle = (index: number) => MONTH_SHORT_TITLES[index - 1]

const DAYS_OF_WEEK = new Map([
    ['Su', 'Вс'],
    ['Mo', 'Пн'],
    ['Tu', 'Вт'],
    ['We', 'Ср'],
    ['Th', 'Чт'],
    ['Fr', 'Пт'],
    ['Sa', 'Сб']
])
export const getDayOfWeek = (day: string) => DAYS_OF_WEEK.get(day) as string

/**
 * Server datetime to 'HH:mm'
 */
export const convertToMeetTime = (datetime?: string): string => {
    if (!datetime) return '';
    const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")).plusHours(3)
    return localDateTime.format(DateTimeFormatter.ofPattern('HH:mm'))
}

/**
 * Server datetime to 'yyyy-MM-dd'
 */
export const convertToMeetsGroupTime = (datetime?: string): string => {
    if (!datetime) return '';
    const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
    return localDateTime.format(formatter2)
}

export const toServerDatetime = (d?: string): string => {
    if (!d) return '';

    const localDateTime = LocalDateTime.parse(d, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"))
    return localDateTime.format(serverDateTimeFormatter)
}