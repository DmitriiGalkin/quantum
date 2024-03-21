import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'

export const FORMAT = 'YYYY-MM-DD HH:mm:ss'
export const FORMAT2 = 'YYYY-MM-DD'

dayjs.extend(isToday)
dayjs.extend(isTomorrow)

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

export const getDayOfWeekTitle = (dayValue: number): string => ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'][dayValue]
export const getDayOfWeekTitleLong = (dayValue: number): string =>
  ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'][dayValue]

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
 * Server datetime в разные объекты
 */
export const convertToObject = (
  datetime?: string,
): { time?: string; shortMonth?: string; day?: string; dayOfWeekValue?: string } => {
  if (!datetime) return {}
  const localDateTime = dayjs(datetime)
  return {
    time: localDateTime.format('HH:mm'),
    shortMonth: getMonthShortTitle(localDateTime.month()),
    day: String(localDateTime.date()),
    dayOfWeekValue: getDayOfWeekTitle(localDateTime.day()),
  }
}

/**
 * Строчка для пользователя из дататайма
 */
export const getDatetimeTitle = (datetime?: string): string => {
  if (!datetime) return ''

  const localDateTime = dayjs(datetime)
  const isToday2 = localDateTime.isToday()
  const isTomorrow2 = localDateTime.isTomorrow()

  return localDateTime.format(
    (isToday2 ? '[Сегодня]' : (isTomorrow2 ? '[Завтра]' : `D ${getMonthLongTitle(localDateTime.month())}`)) + ', HH:mm',
  )
}

export const getDatetimeTitle2 = (datetime?: string): string => {
  if (!datetime) return ''

  const localDateTime = dayjs(datetime)
  const isToday2 = localDateTime.isToday()
  const isTomorrow2 = localDateTime.isTomorrow()

  return localDateTime.format(
    (isToday2 ? 'сегодня' : (isTomorrow2 ? 'завтра' : `D ${getMonthLongTitle(localDateTime.month())}`)) + ' в HH:mm',
  )
}

/**
 *
 */
export const convertToMeetsGroupTime = (datetime?: string): string => {
  if (!datetime) return ''
  return dayjs(datetime).format()
}

/**
 *
 */
export const convertToDate = (datetime?: string): string => {
  if (!datetime) return ''
  return dayjs(datetime).format(FORMAT2)
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

export const now = (): string => dayjs().format()
export const nowDate = (): string => dayjs().format(FORMAT2)

/**
 * Меняет минуты и дни у даты
 */
export const onChangeReactIosTimePicker = (timeValue: string, datetime?: string): string => {
  const [hour, minute] = timeValue.split(':')
  return dayjs(datetime).startOf('date').add(Number(hour), 'hour').add(Number(minute), 'minute').format(FORMAT)
}

const TIMEOUT_DAYS = 3 // После отказа устанавливать банер мы запоминаем волеизъявление пользователя на 3 дня
export const getNewApplicationInstallDate = (): string => dayjs().add(TIMEOUT_DAYS, 'day').format(FORMAT)

/**
 * Проверяем а не больше ли эта дата текущего дня
 */
export const checkWithNow = (applicationInstallDate: string): boolean => {
  const diffDay = dayjs(applicationInstallDate).diff(dayjs(), 'day')

  return diffDay > 0
}

/**
 * Отрезает от дататайма минуты и часы и присобачивает их к другой дате
 */
export const calendarPickerOnChange = (date: string, value?: string): string => {
  const data = dayjs(value)

  if (!date) return ''
  const hour = data.hour()
  const minute = data.minute()

  return dayjs(date).startOf('day').add(hour, 'hour').add(minute, 'minute').format(FORMAT)
}

/**
 * Сравнивает две даты
 */
export const compareDate = (a?: string, b?: string): boolean => dayjs(a).format(FORMAT2) === dayjs(b).format(FORMAT)

/**
 * получаем дату большую на count дней от текущей
 */
export const getAddDayDatetime = (count: number): string => dayjs().startOf('date').add(count, 'day').format(FORMAT2)
