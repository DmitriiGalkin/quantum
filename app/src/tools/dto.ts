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
 * Место проведения
 */
export interface Place {
    id: number // Идентификатор
    title: string // Название
    image: string // Фотография
    latitude: string // Широта
    longitude: string // Долгота
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
    user?: User // Организатор (Участник)
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
    visits: Visit[] | null // Все участники встречи
    user: User | null // Организатор встречи
    place: Place | null // Место проведения
    project: Project | null // Проект
    editable: boolean | null // Право на редактирование/удаление
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
