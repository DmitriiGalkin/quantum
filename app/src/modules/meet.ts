import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {User} from "./user";
import {Project} from "./project";
import {Place} from "./place";

export interface Meet {
    id: number
    projectId: number
    placeId?: number | null,
    title?: string
    description?: string
    datetime: string
    active?: boolean
    project: Project
    place: Place
    users: User[]
    // description?: string
}

export interface NewMeet {
    id?: number
    activeStep?: number
    title?: string
    projectId?: number
    placeId?: number
    datetime?: string
}

export const useMeets = (): UseQueryResult<Meet[]> => {
    return useQuery(['meets'], () => service.get(`/meet`),)
}
export const useMeet = (id?: number): UseQueryResult<Meet> => {
    return useQuery(['meet', id], () => service.get(`/meet/${id}`), {
        enabled: Boolean(id),
    })
}
export const useMeetUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['meetUsers', id], () => service.get(`/meet/${id}/users`),)
}

export const useAddMeet = (): UseMutate<NewMeet> => useMutation((meet) => service.post("/meet", meet))
export const useEditMeet = (): UseMutate<NewMeet> => useMutation((meet) => service.put(`/meet/${meet.id}`, meet))

