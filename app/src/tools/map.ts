import {Meet} from "./dto";

// const 'ce32ffcd-d432-4c13-9035-407aa9f344a0'

/**
 * Высчитываем центр
 */
export const getCenter = (meet: Meet[]) => {
    const xs = meet.map((m) => Number(m.x))
    const ys = meet.map((m) => Number(m.y))

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
