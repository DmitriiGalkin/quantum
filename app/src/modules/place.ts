import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
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
    return useQuery(['place', id], () => service.get(`/place/${id}`),)
}

export const useAddPlace = (): UseMutate<NewPlace> => useMutation((place) => service.post("/place", place))

interface PlaceUser {
    placeId: number
    userId?: number
}
export const useAddPlaceUser = (placeId?: number): UseMutate<PlaceUser> => {
    const queryClient = useQueryClient()
    return useMutation(({ placeId }) => service.post("/user/" + placeId + '/place'), {
        onSuccess() {
            queryClient.invalidateQueries(['placeUser', placeId])
        },
    })
}
export const useDeletePlaceUser = (placeId?: number): UseMutate<PlaceUser> => {
    const queryClient = useQueryClient()
    return useMutation(({ placeId }) => service.delete("/user/" + placeId + '/place'), {
        onSuccess() {
            queryClient.invalidateQueries(['placeUser', placeId])
        },
    })
}