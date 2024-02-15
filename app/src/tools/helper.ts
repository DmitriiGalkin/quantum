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

interface MeetGroup {
  datetime: string
  meets?: Meet[]
}
export const getMeetsGroup = (meets?: Meet[]): MeetGroup[] =>
  [...Array.from(groupBy(meets || [], (meet) => convertToDate(meet.datetime)))].map(([a, b]) => ({
    datetime: a,
    meets: b,
  }))

interface VisitGroup {
  title: string
  visits?: Visit[]
}
export const getVisitGroups = (visits?: Visit[]): VisitGroup[] =>
  [...Array.from(groupBy(visits || [], (visit) => convertToMeetsGroupTime(visit.meet?.datetime)))].map(([a, b]) => ({
    title: convertToMeetsGroupTime2(a),
    visits: b,
  }))

export const DAYS_COUNT = 7

export interface Day {
  datetime: string
  active?: boolean
  activeMeetsLength: number
  meets?: Meet[]
}

/**
 * Подготавливаем неделю
 */
export const getWeek = (meets?: Meet[], userId?: number): Day[] => {
  const meetsGroup = getMeetsGroup(meets)

  return Array.from(new Array(DAYS_COUNT).keys()).map((count) => {
    const datetime = getAddDayDatetime(count)
    const meets = meetsGroup.find((meetGroup) => meetGroup.datetime === datetime)?.meets || []
    const activeMeetsLength = meets.filter((meet) => meet.visits?.some((visit) => visit.userId === userId)).length || 0

    return {
      datetime,
      activeMeetsLength,
      meets,
    }
  })
}

/**
 * Формируем строку отображающую возрастное ограничение
 */
export const getAgeTitle = (ageFrom?: number, ageTo?: number): string => {
  return ageFrom || ageTo ? (ageFrom ? ` ${ageFrom}` : '') + (ageTo ? ` - ${ageTo}` : '') + ' лет' : 'любой'
}

/**
 * Формируем строку отображающую возрастное ограничение СВЕРХКОРОТКОЕ
 */
export const getAgeLabel = (project: Project): string => {
  return `${project.ageFrom || 0}+`
}
