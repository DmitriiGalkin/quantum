export type AgeLimit = 1 | 3 | 6 | 9 | 12 | 16 | 18

export interface Place {
    id: number
    title: string
    image: string
    description: string
    tags: string[]
    ageLimit?: AgeLimit // Возрастное ограничение
}

export interface NewPlace {
    title?: string
    description?: string
}