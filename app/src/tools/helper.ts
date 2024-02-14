import { convertToDate, convertToMeetsGroupTime, convertToMeetsGroupTime2, getAddDayDatetime } from './date'
import { Meet, Project, Visit } from './dto'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const map = new Map<K, Array<V>>()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  list.forEach((item) => {
    const key = keyGetter(item)
    const collection = map.get(key)
    if (!collection) {
      map.set(key, [item])
    } else {
      collection.push(item)
    }
  })
  return map
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getMeetsGroup = (meets?: Meet[]): { id: string; meets: Meet[] }[] => [
  ...Array.from(groupBy(meets || [], (meet) => convertToMeetsGroupTime(meet.datetime))),
]

export const getMeetsGroup2 = (meets?: Meet[]): { id: string; meets: Meet[] }[] =>
  [...Array.from(groupBy(meets || [], (meet) => convertToMeetsGroupTime(meet.datetime)))].map(([a, b]) => ({
    id: a,
    meets: b,
  }))

export const getCalendarMeetsGroup = (days: Day[], meets: Meet[]): { id: string; meets: Meet[] }[] => {
  const groups = getMeetsGroup2(meets)
  return days.map((day) => ({
    id: day.id,
    meets: groups.find((group) => convertToDate(group.id) === day.datetime)?.meets || [],
  }))
}

interface VisitGroup {
  title: string
  visits?: Visit[]
}
export const getVisitGroups = (visits?: Visit[]): VisitGroup[] =>
  [...Array.from(groupBy(visits || [], (visit) => convertToMeetsGroupTime(visit.meet?.datetime)))].map(([a, b]) => ({
    title: convertToMeetsGroupTime2(a),
    visits: b,
  }))

/**
 * Подготовка данных для отображения встреч списком и на карте
 */
interface GetOm {
  days: Day[]
  meetsGroup: {
    id: string
    meets: Meet[]
  }[]
  filteredMeets: Meet[]
  index: number
}
export const getOm = (meets: Meet[], date: string, userId?: number): GetOm => {
  const days = getWeek(meets, userId)
  const meetsGroup = getCalendarMeetsGroup(days, meets)

  return {
    days,
    meetsGroup,
    filteredMeets: meetsGroup.find(({ id }) => convertToDate(id) === date)?.meets || [],
    index: days.find(({ id }) => id === date)?.index || 0,
  }
}

export const DAYS_COUNT = 7

export interface Day {
  index: number
  id: string
  datetime: string
  active?: boolean
  activeMeetsLength: number
  meets?: Meet[]
}
/**
 * Подготавливаем неделю
 */
export const getWeek = (meets?: Meet[], userId?: number): Day[] =>
  Array.from(new Array(DAYS_COUNT).keys()).map((count, index) => {
    const meetsGroup = getMeetsGroup2(meets)
    const datetime = getAddDayDatetime(count)
    const meets3 = (meetsGroup ? meetsGroup.find(({ id }) => convertToDate(id) === datetime)?.meets : []) as Meet[]
    return {
      index,
      id: getAddDayDatetime(count),
      datetime,
      activeMeetsLength: meets3?.filter((meet) => meet.visits?.some((visit) => visit.userId === userId)).length || 0,
      meets: meets3 || [],
    }
  })

/**
 * Формируем строку отображающую возрастное ограничение
 */
export const getAgeTitle = (ageFrom?: number, ageTo?: number): string => {
  return ageFrom || ageTo ? (ageFrom ? ` ${ageFrom}` : '') + (ageTo ? ` - ${ageTo}` : '') + ' лет' : 'любой'
}

/**
 * Формируем строку отображающую возрастное ограничение КОРОТКОЕ
 */
export const getAgeTitle2 = (ageFrom?: number, ageTo?: number): string => {
  return ageFrom || ageTo ? '(' + (ageFrom ? `${ageFrom}` : '0') + (ageTo ? ` - ${ageTo}` : '') + ' лет)' : ''
}

/**
 * Формируем строку отображающую возрастное ограничение СВЕРХКОРОТКОЕ
 */
export const getAgeLabel = (project: Project): string => {
  return `${project.ageFrom || 0}+`
}
