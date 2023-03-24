import {AgeLimit, Place} from "../place/types";
import {Meet} from "../meet/types";
import {User} from "../user";

export interface Project {
    id: number,
    placeId: number | null,
    title: string,
    image: string,
    description: string,
    active?: boolean, // пользователь является участником проекта
    favorite?: boolean, // пользователь добавил проект в избранное
    ageLimit?: AgeLimit // Возрастное ограничение
    meet?: Meet
    place?: Place
    users?: User[]
    images?: string[]
}
