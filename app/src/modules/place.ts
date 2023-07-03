import {useQuery, UseQueryResult} from "@tanstack/react-query";
import service from "../tools/service";
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
