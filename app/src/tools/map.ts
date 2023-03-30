import {Place} from "../modules/place";

/**
 * Высчитываем центр
 */
export const getCenter = (place: Place[]) => {
    const xs = place.map((place) => Number(place.x))
    const ys = place.map((place) => Number(place.y))

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
