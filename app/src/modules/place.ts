import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {Project} from "./project";

export type AgeLimit = 1 | 3 | 6 | 9 | 12 | 16 | 18

export interface Place {
    id: number
    title: string
    image: string
    active?: boolean
    description: string
    tags: string[]
    ageLimit?: AgeLimit // Возрастное ограничение
    x: string
    y: string
    projects: Project []
}

export interface NewPlace {
    title?: string
    description?: string
}

export const usePlaces = (): UseQueryResult<Place[]> => {
    return useQuery(['places'], () => service.get(`/places`),)
}
export const usePlace = (id: number): UseQueryResult<Place> => {
    return useQuery(['place', id], () => service.get(`/place/${id}`), {
        enabled: Boolean(id),
    })
}

export const useAddPlace = (): UseMutate<NewPlace> => useMutation((place) => service.post("/place", place))
