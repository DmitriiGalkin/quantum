import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {User} from "./user";
import service, {UseMutate} from "../tools/service";
import {Meet} from "./meet";

import {AgeLimit} from "./place";

export interface Project {
    id: number,
    title: string,
    description: string,
    image: string,
    active?: boolean, // пользователь является участником проекта
    favorite?: boolean, // пользователь добавил проект в избранное
    ageLimit?: AgeLimit // Возрастное ограничение
    users: User[]
    meets: Meet[]
}


export const useProjects = (): UseQueryResult<Project[]> => {
    return useQuery(['projects'], () => service.get(`/project`),)
}
export const useProject = (id?: number): UseQueryResult<Project> => {
    return useQuery(['project', id], () => service.get(`/project/${id}`), {
        enabled: Boolean(id),
    })
}

export const useAddProject = (): UseMutate<Project, number> => {
    const queryClient = useQueryClient()
    return useMutation((project) => service.post("/project", project), {
        onSuccess() {
            queryClient.invalidateQueries(['projects'])
        },
    })
}
export const useUpdateProject = (): UseMutate<Project> => useMutation((project) => service.put(`/project/${project.id}`, project))
