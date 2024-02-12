import {convertToMeetsGroupTime, convertToMeetsGroupTime2, getDayOfWeekTitle} from "./date";
import {Meet, Project, Visit} from "./dto";
import {LocalDate} from "@js-joda/core";

// @ts-ignore
export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
    // @ts-ignore
    const map = new Map<K, Array<V>>();
    // @ts-ignore
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}
// @ts-ignore
export const getMeetsGroup = (meets?: Meet[]) => [...Array.from(groupBy(meets || [], (meet) => convertToMeetsGroupTime(meet.datetime)))];

export const getMeetsGroup2 = (meets?: Meet[]) => [...Array.from(groupBy(meets || [], (meet) => convertToMeetsGroupTime(meet.datetime)))].map(([a,b])=> ({ id: a, meets: b}));

export const getCalendarMeetsGroup = (days: Day[], meets: Meet[]) => {
    const groups = getMeetsGroup2(meets)
    return days.map(day => ({ id: day.id, meets: groups.find(group => group.id === day.id)?.meets || [] }))
}

interface VisitGroup {
    title: string
    visits?: Visit[]
}
export const getVisitGroups = (visits?: Visit[]): VisitGroup[] => [...Array.from(groupBy(visits || [], (visit) => convertToMeetsGroupTime(visit.meet?.datetime)))].map(([a,b])=> ({ title: convertToMeetsGroupTime2(a), visits: b}));

/**
 * Подготовка данных для отображения встреч списком и на карте
 */
export const getOm = (meets: Meet[], date: string, userId?: number) => {
    const days = getWeek(date, meets, userId)
    const meetsGroup = getCalendarMeetsGroup(days, meets)

    return {
        days,
        meetsGroup,
        filteredMeets: meetsGroup.find(({ id }) => id === date)?.meets || [],
        index: days.find(({ id }) => id === date)?.index || 0
    }
}

export const DAYS_COUNT = 7

export interface Day {
    index: number
    id: string
    dayOfWeekValue: string
    day: number
    active: boolean
    activeMeetsLength: number
    meets?: Meet[]
}
/**
 * Подготавливаем неделю
 */
export const getWeek = (selectedDate?: string, meets?: Meet[], userId?: number): Day[] => Array.from(Array(DAYS_COUNT).keys()).map((day, index) => {
    const meetsGroup = getMeetsGroup2(meets)

    const localDate = LocalDate.now()
    const targetDay = localDate.plusDays(day)
    const re = targetDay.toString()
    const meets3 = (meetsGroup ? meetsGroup.find(({id}) => id === re)?.meets : []) as Meet[]

    return {
        index,
        id: re,
        dayOfWeekValue: getDayOfWeekTitle(targetDay.dayOfWeek().value() - 1),
        day: targetDay.dayOfMonth(),
        active: selectedDate === re,
        activeMeetsLength: meets3?.filter((meet) => meet.visits?.some((visit) => visit.userId === userId)).length || 0,
        meets: meets3 || [],
    }
})


/**
 * Формируем строку отображающую возрастное ограничение
 */
export const getAgeTitle = (ageFrom?: number, ageTo?: number) => {
    return (ageFrom || ageTo) ? ((ageFrom ? ` ${ageFrom}` : '') + (ageTo ? ` - ${ageTo}` : '') + ' лет') : 'любой'
}

/**
 * Формируем строку отображающую возрастное ограничение КОРОТКОЕ
 */
export const getAgeTitle2 = (ageFrom?: number, ageTo?: number) => {
    return (ageFrom || ageTo) ? ('(' + (ageFrom ? `${ageFrom}` : '0') + (ageTo ? ` - ${ageTo}` : '') + ' лет)') : ''

}

/**
 * Формируем строку отображающую возрастное ограничение СВЕРХКОРОТКОЕ
 */
export const getAgeLabel = (project: Project) => {
    return `${project.ageFrom || 0}+`

}

export const DASHBOARD_TICK_TIME = 10000
