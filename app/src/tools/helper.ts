import {convertToMeetsGroupTime, getDayOfWeekTitle} from "./date";
import {Meet} from "./dto";
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

export const getFilteredMeetsByDate = (meets: Meet[], date: string, selectedMeet?: Meet): Meet[] => {
    const groups = getMeetsGroup2(meets)
    return groups.find((group) => group.id === date)?.meets || []
}

export const DAYS_COUNT = 7

export interface CalendarDay {
    id: string
    dayOfWeekValue: string
    day: number
    active: boolean
    meetsLength: number
}
/**
 * Подготавливаем неделю
 */
export const getWeek = (selectedDate?: string, meetsGroup?: { id: string, meets: Meet[] }[]): CalendarDay[] => Array.from(Array(DAYS_COUNT).keys()).map((day) => {
    const localDate = LocalDate.now()
    const targetDay = localDate.plusDays(day)
    const re = targetDay.toString()

    return {
        id: re,
        dayOfWeekValue: getDayOfWeekTitle(targetDay.dayOfWeek().value() - 1),
        day: targetDay.dayOfMonth(),
        active: selectedDate === re,
        meetsLength: meetsGroup ? meetsGroup.find(({id}) => id === re)?.meets.length || 0 : 0,
    }
})

export const DASHBOARD_TICK_TIME = 10000
