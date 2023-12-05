/**
 * Пользователь (Родитель)
 */
export interface Passport {
    id: number // Идентификатор
    title: string // Имя родителя
    email?: string // Почта
    accessToken?: string // Токен
}

/**
 * Участник (Ребенок)
 */
export interface User {
    id: number // Идентификатор
    passportId: number // Идентификатор паспорта родителя
    title: string // Имя ребенка
    age: number // Возраст ребенка
    image?: string // Фотография ребенка
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
    description?: string // Описание
    image?: string // Картинка проекта
    userId: number // Инициатор
    latitude?: string // Широта, где потенциально проходит проект
    longitude?: string // Долгота, где потенциально проходит проект
    ageFrom?: number // Минимальный возраст
    ageTo?: number // Максимальный возраст

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
    placeId?: number  // По какому проекту
    datetime: string // Время проведения
    latitude?: string  // Широта, где проходит встреча
    longitude?: string  // Долгота, где проходит встреча
    price?: number  // Стоимость

    /**
     * Дополнительные поля
     */
    visits?: Visit[] // Все участники встречи
    user?: User // Организатор встречи
    place?: Place // Место проведения
    project?: Project // Проект
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
    user?: User // Участник
}
