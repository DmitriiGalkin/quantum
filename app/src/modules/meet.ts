import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {User} from "./user";
import {Project} from "./project";

export interface Meet {
    id: number
    placeId?: number | null,
    title?: string
    description?: string
    datetime: string
    active?: boolean
    projectId: number
    project: Project
    users: User[]
    endDatetime?: string,
}

export interface NewMeet {
    title?: string
    description?: string
    projectId?: number
    placeId?: number
    datetime?: string
    endDatetime?: string
}

export const useMeets = (): UseQueryResult<Meet[]> => {
    return useQuery(['meets'], () => service.get(`/meet`),)
}
export const useMeetUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['meetUsers', id], () => service.get(`/meet/${id}/users`),)
}

export const useAddMeet = (): UseMutate<NewMeet> => useMutation((meet) => service.post("/meet", meet))
