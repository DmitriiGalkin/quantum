import {Meet} from "./dto";

// const 'ce32ffcd-d432-4c13-9035-407aa9f344a0'
interface Prop {
    latitude: string
    longitude: string
}
/**
 * Высчитываем центр
 */
export function getCenter<T extends Prop>(meet: T[]) {
    const xs = meet.map((m) => Number(m.latitude))
    const ys = meet.map((m) => Number(m.longitude))

    const maxX = getMaxOfArray(xs)
    const minX = getMinOfArray(xs)
    const maxY = getMaxOfArray(ys)
    const minY = getMinOfArray(ys)

    const averageX = (maxX + minX)/2
    const averageY = (maxY + minY)/2

    return [averageX, averageY]
}

const getMaxOfArray = (numArray: number[]) => Math.max.apply(null, numArray)
const getMinOfArray = (numArray: number[]) => Math.min.apply(null, numArray)
