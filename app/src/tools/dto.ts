export interface Meet {
    id: number
    title?: string
    description?: string
    datetime: string
    active?: boolean
    editable?: boolean // Право на редактирование/удаление
    users: User[]
    image?: string
    x?: string
    y?: string
}

export interface NewMeet {
    id?: number
    activeStep?: number
    title?: string
    description?: string
    image?: string
    datetime?: string
    x?: string
    y?: string
}

export interface User {
    id: number
    title: string
    image: string
    points: number
    email?: string
    password?: string
}

export interface Profile {
    user: User
    projectIds?: number[]
    meetIds?: number[]
}