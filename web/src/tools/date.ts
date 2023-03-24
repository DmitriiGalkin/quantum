import {DateTimeFormatter, LocalDateTime} from "@js-joda/core";

export const r = []

// Форматирование даты, используемое для отправки на бек
export const serverDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");

export const formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
export const formatter2 = DateTimeFormatter.ofPattern('yyyy-MM-dd');

const MONTH_SHORT_TITLES = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ','АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
export const getMonthShortTitle = (index: number) => MONTH_SHORT_TITLES[index - 1]


const LONG_MONTHS = {
    0: 'Января',
    1: 'Февраля',
    2: 'Марта',
    3: 'Апреля',
    4: 'Мая',
    5: 'Июня',
    6: 'Июля',
    7: 'Августа',
    8: 'Сентября',
    9: 'Октября',
    10: 'Ноября',
    11: 'Декабря',
}
const getLongMonth = (number: number) => Object.values(LONG_MONTHS)[number]
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

export const convertToMeetDatetime = (datetime?: string): string => {
    if (!datetime) return '';

    const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
    return localDateTime.format(DateTimeFormatter.ofPattern('d'))
        + ' '
        + getLongMonth(Number(localDateTime.format(DateTimeFormatter.ofPattern('M'))))
        + ', '
        + localDateTime.format(DateTimeFormatter.ofPattern('HH:mm'))
}

/**
 * Server datetime to 'HH:mm'
 */
export const convertToMeetTime = (datetime?: string): string => {
    if (!datetime) return '';
    const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"))
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

/**
 * Server datetime to 'yyyy-MM-dd'
 */
export const convertToMeetsGroupTime2 = (datetime?: string): string => {
    if (!datetime) return '';
    const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"))
    return localDateTime.format(formatter2)
}

export const toServerDatetime = (d?: string): string => {
    if (!d) return '';

    const localDateTime = LocalDateTime.parse(d, DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss"))
    return localDateTime.format(serverDateTimeFormatter)
}