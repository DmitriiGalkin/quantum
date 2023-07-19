export interface Meet {
    id: number
    title: string
    datetime: string
    description?: string
    image?: string
    latitude: string
    longitude: string
    active?: boolean // Участвует ли пользователь во встрече
    editable?: boolean // Право на редактирование/удаление
    users?: User[]
    place?: Place
}

export interface User {
    id: number
    title: string
    image: string
    points: number
    email?: string
    password?: string
}

export interface Place {
    id: number
    title: string
    image: string
    latitude: string
    longitude: string
}