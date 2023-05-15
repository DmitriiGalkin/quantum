import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";
import {Project} from "./project";

export interface Community {
    id: number
    title: string
    description: string
    image?: string
    active?: boolean, // пользователь является участником сообщества
    projects: Project []
}

export const useCommunitys = (): UseQueryResult<Community[]> => {
    return useQuery(['communitys'], () => service.get(`/communitys`),)
}
export const useCommunity = (id?: number): UseQueryResult<Community> => {
    return useQuery(['community', id], () => service.get(`/community/${id}`), {
        enabled: Boolean(id),
    })
}

// export const useAddPlace = (): UseMutate<NewPlace> => useMutation((place) => service.post("/place", place))
