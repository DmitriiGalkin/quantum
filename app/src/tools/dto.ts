export interface Meet {
    id: number
    title: string
    datetime: string
    description?: string
    image?: string
    latitude: string
    longitude: string
    editable?: boolean // Право на редактирование/удаление
    price?: number // Стоимость
    ageFrom?: number // Минимальный возраст
    ageTo?: number // Максимальный возраст
    userMeet?: UserMeet // Участие пользователя
    userMeets?: UserMeet[] // Все участники встречи
    user?: User // Организатор встречи
    place?: Place
    project?: Project
}

export interface UserMeet extends User {
    userId: number // Идентификатор участника
    meetId: number // Идентификатор встречи
    created?: string // Время вступления во встречу
    started?: string // Время начала участия во встрече
    stopped?: string // Время завершения участия во встрече
    paided?: string // Время оплаты участия во встрече
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

export interface Timing {
    id: number
    dayOfWeek: number
    time: string
}

export interface Project {
    id: number
    title: string
    description: string
    image?: string
    timing?: Timing[]
    editable?: boolean // Право на редактирование/удаление
    userId?: number // Организатор
    latitude?: string
    longitude?: string
    ageFrom?: number // Минимальный возраст
    ageTo?: number // Максимальный возраст
    user?: User // Организатор проекта
    place?: Place // Место проведения
}
