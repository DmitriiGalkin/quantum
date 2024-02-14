import dayjs from 'dayjs'

export const FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT2 = 'YYYY-MM-DD'

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

/**
 * Server datetime to 'HH:mm'
 */
export const convertToMeetTime = (datetime?: string): string => {
  if (!datetime) return ''
  return dayjs(datetime).format('HH:mm')
}

/**
 * Server datetime в разные объекты
 */
export const convertToObject = (datetime?: string): { time?: string; shortMonth?: string; day?: string } => {
  if (!datetime) return {}
  const localDateTime = dayjs(datetime)
  return {
    time: localDateTime.format('HH:mm'),
    shortMonth: getMonthShortTitle(localDateTime.month()),
    day: String(localDateTime.day()),
  }
}

/**
 * Server datetime to 'yyyy-MM-dd'
 */
export const convertToMeetsGroupTime = (datetime?: string): string => {
  if (!datetime) return ''
  return dayjs(datetime).format()
}

/**
 * Началось ли уже это время
 */
export const getIsStart = (datetime?: string): boolean => {
  if (!datetime) return false
  return dayjs(datetime).isBefore(dayjs())
}

/**
 * Server datetime to 'yyyy-MM-dd'
 */
export const convertToMeetsGroupTime2 = (datetime?: string): string => {
  if (!datetime) return ''
  const localDate = dayjs(datetime)
  return `${localDate.date()} ${MONTH_LONG_TITLES[localDate.month()]}`
}
