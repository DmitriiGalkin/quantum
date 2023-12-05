/**
 * Пользователь (Родитель)
 */
export interface Passport {
    id: number // Идентификатор
    title: string // Имя родителя
    email: string | null // Почта
    accessToken: string | null // Токен
}

/**
 * Участник (Ребенок)
 */
export interface User {
    id: number // Идентификатор
    passportId: number // Идентификатор паспорта родителя
    title: string // Имя ребенка
    age: number // Возраст ребенка
    image: string | null // Фотография ребенка
}

/**
 * Место проведения встречи
 */
export interface Place {
    id: number
    title: string
    image: string
    latitude: string
    longitude: string
}

/**
 * Проект
 */
export interface Project {
    id: number // Идентификатор
    title: string // Название
    description: string | null // Описание
    image: string | null // Картинка проекта
    userId: number // Инициатор
    latitude: string // Широта, где потенциально проходит проект
    longitude: string // Долгота, где потенциально проходит проект
    ageFrom: number | null // Минимальный возраст
    ageTo: number | null // Максимальный возраст

    /**
     * Дополнительные поля
     */
    editable?: boolean // Право на редактирование/удаление
    user?: User // Организатор проекта
    place?: Place // Место проведения
}

/**
 * Встреча
 */
export interface Meet {
    id: number // Идентификатор
    userId: number // Создатель
    projectId: number // По какому проекту
    datetime: string // Время проведения
    latitude: string // Широта, где проходит встреча
    longitude: string // Долгота, где проходит встреча
    price: number | null // Стоимость

    /**
     * Дополнительные поля
     */
    // userMeet?: UserMeet // Участие пользователя
    visits?: Visit[] // Все участники встречи
    user?: User // Организатор встречи
    place?: Place
    project?: Project
    editable?: boolean // Право на редактирование/удаление
}

/**
 * Посещение
 */
export interface Visit {
    userId: number // Идентификатор участника
    meetId: number // Идентификатор встречи
    created?: string // Время вступления во встречу
    started?: string // Время начала участия во встрече
    stopped?: string // Время завершения участия во встрече
    paided?: string // Время оплаты участия во встрече

    /**
     * Дополнительные поля
     */
    user: User | null // Участник
}
