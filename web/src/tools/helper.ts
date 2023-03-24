import {convertToMeetsGroupTime} from "./date";
import {Meet} from "../modules/meet";

export function groupBy<K, V>(list: Array<V>, keyGetter: (input: V) => K): Map<K, Array<V>> {
    const map = new Map<K, Array<V>>();
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
export const getMeetsGroup = (meets: Meet[]) => [...Array.from(groupBy(meets, (meet) => convertToMeetsGroupTime(meet.datetime)))];

