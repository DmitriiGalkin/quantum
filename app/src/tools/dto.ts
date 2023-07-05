export interface Meet {
    id: number
    title: string
    datetime: string
    x?: string
    y?: string
    description?: string
    image?: string
    active?: boolean // Участвует ли пользователь во встрече
    editable?: boolean // Право на редактирование/удаление
    users?: User[]
}
//
// export interface NewMeet {
//     id?: number
//     title?: string
//     description?: string
//     image?: string
//     datetime?: string
//     x?: string
//     y?: string
// }

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