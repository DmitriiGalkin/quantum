import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../../tools/service";
import {NewPlace, Place} from "./types";
import {Project} from "../project";
import {User} from "../user";
import {useUnit} from "../../tools/hooks";

export const usePlaces = (): UseQueryResult<Place[]> => {
    return useQuery(['places'], () => service.get(`/place`),)
}
export const usePlace = (id: number): UseQueryResult<Place> => {
    return useQuery(['place', id], () => service.get(`/place/${id}`),)
}
export const usePlaceProjects = (id: number): UseQueryResult<Project[]> => {
    return useQuery(['placeProjects', id], () => service.get(`/place/${id}/project`),)
}
export const usePlaceUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['placeUser', id], () => service.get(`/place/${id}/user`),)
}

export const useAddPlace = (): UseMutate<NewPlace> => useMutation((place) => service.post("/place", place))

interface PlaceUser {
    placeId: number
    userId?: number
}
export const useAddPlaceUser = (placeId?: number): UseMutate<PlaceUser> => {
    const queryClient = useQueryClient()
    const user = useUnit();
    return useMutation(({ placeId }) => service.post("/place/" + placeId + '/user/' + user.id), {
        onSuccess() {
            queryClient.invalidateQueries(['placeUser', placeId])
        },
    })
}
export const useDeletePlaceUser = (placeId?: number): UseMutate<PlaceUser> => {
    const queryClient = useQueryClient()
    const user = useUnit();
    return useMutation(({ placeId }) => service.delete("/place/" + placeId + '/user/' + user.id), {
        onSuccess() {
            queryClient.invalidateQueries(['placeUser', placeId])
        },
    })
}