// const 'ce32ffcd-d432-4c13-9035-407aa9f344a0'
interface Prop {
  latitude: string
  longitude: string
}
/**
 * Высчитываем центр
 */
export function getCenter<T extends Prop>(meet: T[]): string[] {
  const xs = meet.map((m) => Number(m.latitude))
  const ys = meet.map((m) => Number(m.longitude))

  const maxX = getMaxOfArray(xs)
  const minX = getMinOfArray(xs)
  const maxY = getMaxOfArray(ys)
  const minY = getMinOfArray(ys)

  const averageX = String((maxX + minX) / 2)
  const averageY = String((maxY + minY) / 2)

  return [averageX, averageY]
}

const getMaxOfArray = (numberArray: number[]) => Math.max.apply(null, numberArray)
const getMinOfArray = (numberArray: number[]) => Math.min.apply(null, numberArray)
