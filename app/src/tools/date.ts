import { DateTimeFormatter, LocalDate, LocalDateTime } from '@js-joda/core'

// Форматирование даты, используемое для отправки на бек
export const serverDateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")

export const formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss")
export const formatter2 = DateTimeFormatter.ofPattern('yyyy-MM-dd')

const MONTH_SHORT_TITLES = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК']
const MONTH_LONG_TITLES = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря',
]

export const getMonthShortTitle = (index: number): string => MONTH_SHORT_TITLES[index - 1]
export const getMonthLongTitle = (index: number): string => MONTH_LONG_TITLES[index - 1]

export const getDayOfWeekTitle = (dayValue: number): string => ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'][dayValue]
export const getDayOfWeekTitleLong = (dayValue: number): string =>
  ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'][dayValue]

const DAYS_OF_WEEK = new Map([
  ['Su', 'Вс'],
  ['Mo', 'Пн'],
  ['Tu', 'Вт'],
  ['We', 'Ср'],
  ['Th', 'Чт'],
  ['Fr', 'Пт'],
  ['Sa', 'Сб'],
])
export const getDayOfWeek = (day: string): string => DAYS_OF_WEEK.get(day) as string
const PATTERN = 'yyyy-MM-dd HH:mm:ss'
const PATTERN2 = 'yyyy-MM-dd'

/**
 * Server datetime to 'HH:mm'
 */
export const convertToMeetTime = (datetime?: string): string => {
  if (!datetime) return ''
  const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern(PATTERN))
  return localDateTime.format(DateTimeFormatter.ofPattern('HH:mm'))
}

const getDayTitle = (localDateTime: LocalDateTime) => localDateTime.format(DateTimeFormatter.ofPattern('dd'))
const getShortMonthTitle = (localDateTime: LocalDateTime) =>
  getMonthShortTitle(Number(localDateTime.format(DateTimeFormatter.ofPattern('MM'))))
/**
 * Server datetime в разные объекты
 */
export const convertToObject = (datetime?: string): { time?: string; shortMonth?: string; day?: string } => {
  if (!datetime) return {}
  const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern(PATTERN))
  return {
    time: localDateTime.format(DateTimeFormatter.ofPattern('HH:mm')),
    shortMonth: getShortMonthTitle(localDateTime),
    day: getDayTitle(localDateTime),
  }
}

/**
 * Server datetime to 'MM-dd'
 */
export const convertToMeetDate = (datetime?: string): string => {
  if (!datetime) return ''
  const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern(PATTERN))
  return (
    localDateTime.format(DateTimeFormatter.ofPattern('dd')) +
    ' ' +
    getMonthShortTitle(Number(localDateTime.format(DateTimeFormatter.ofPattern('MM'))))
  )
}

/**
 * Server datetime to 'MM-dd'
 */
export const convertToMeetDateLong = (datetime?: string): string => {
  if (!datetime) return ''
  const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern(PATTERN))
  return (
    localDateTime.format(DateTimeFormatter.ofPattern('dd')) +
    ' ' +
    getMonthLongTitle(Number(localDateTime.format(DateTimeFormatter.ofPattern('MM'))))
  )
}

/**
 * Server datetime to 'yyyy-MM-dd'
 */
export const convertToMeetsGroupTime = (datetime?: string): string => {
  if (!datetime) return ''
  const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern(PATTERN))
  return localDateTime.format(formatter2)
}

/**
 * Началось ли уже это время
 */
export const getIsStart = (datetime?: string): boolean => {
  if (!datetime) return false
  const localDateTime = LocalDateTime.parse(datetime, DateTimeFormatter.ofPattern(PATTERN))
  return localDateTime.isBefore(LocalDateTime.now())
}

const getDayTitle2 = (localDate: LocalDate) => localDate.format(DateTimeFormatter.ofPattern('dd'))
const getShortMonthTitle2 = (localDate: LocalDate) =>
  getMonthLongTitle(Number(localDate.format(DateTimeFormatter.ofPattern('MM'))))
/**
 * Server datetime to 'yyyy-MM-dd'
 */
export const convertToMeetsGroupTime2 = (datetime?: string): string => {
  if (!datetime) return ''
  const localDate = LocalDate.parse(datetime, DateTimeFormatter.ofPattern(PATTERN2))
  return `${getDayTitle2(localDate)} ${getShortMonthTitle2(localDate)}`
}
