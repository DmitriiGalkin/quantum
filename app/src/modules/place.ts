import {useQuery, UseQueryResult} from "@tanstack/react-query";
import service from "../tools/service";
import {Project} from "./project";
import {Meet} from "./meet";

export interface Place {
    id: number
    title: string
    active?: boolean
    description: string
    image: string
    tags: string[]
    x: string
    y: string
    projects: Project[]
    meets: Meet[]
}

export const usePlaces = (): UseQueryResult<Place[]> => {
    return useQuery(['places'], () => service.get(`/places`),)
}
export const usePlace = (id?: number): UseQueryResult<Place> => {
    return useQuery(['place', id], () => service.get(`/place/${id}`), {
        enabled: Boolean(id),
    })
}
