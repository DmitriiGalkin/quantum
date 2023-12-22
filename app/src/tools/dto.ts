/**
 * Пользователь (Родитель)
 */
export interface Passport {
    id: number // Идентификатор
    title: string // Имя родителя
    email?: string // Почта
    accessToken?: string // Токен

    users: User[] // Дети
}

/**
 * Участник (Ребенок)
 */
export interface User {
    id: number // Идентификатор
    title: string // Имя ребенка
    age: number // Возраст ребенка
    image?: string // Фотография ребенка
    passportId?: number // Идентификатор паспорта родителя
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
    passportId: number // Администратор
    ageFrom?: number // Минимальный возраст
    ageTo?: number // Максимальный возраст
    placeId?: number  // По какому проекту
    deleted?: string  // Дата удаления

    /**
     * Дополнительные поля
     */
    participationUsers: ParticipationUser[] // Участия участников
    editable?: boolean // Право на редактирование/удаление
    passport?: Passport // Организатор (Родитель)
    place?: Place // Место проведения
    meets?: Meet[] // Встречи
}

/**
 * Встреча
 */
export interface Meet {
    id: number // Идентификатор
    passportId: number // Создатель
    projectId: number // По какому проекту
    datetime: string // Время проведения
    duration: string // Длительность
    price?: number  // Стоимость
    deleted?: string  // Дата удаления

    /**
     * Дополнительные поля
     */
    visits?: Visit[] // Участия участников
    user?: User // Организатор встречи
    project?: Project // Проект
    editable?: boolean // Право на редактирование/удаление
}

/**
 * Посещение
 */
export interface Visit {
    id: number // Идентификатор
    userId: number // Идентификатор участника
    meetId: number // Идентификатор встречи
    created?: string // Время вступления во встречу
    started?: string // Время начала участия во встрече
    stopped?: string // Время завершения участия во встрече
    paided?: string // Время оплаты участия во встрече

    /**
     * Дополнительные поля
     */
    meet?: Meet // Встреча
    user?: User
    project?: Project // Встреча
    place?: Place
}

/**
 * Участие
 */
export interface Participation {
    id: number // Идентификатор
    userId: number // Идентификатор участника
    projectId: number // Идентификатор проекта
}

/**
 * Участие участника
 */
export interface ParticipationUser extends User, Participation {}

