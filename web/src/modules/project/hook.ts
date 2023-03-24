import {Project} from "./types";
import {useMutation, useQuery, useQueryClient, UseQueryResult} from "@tanstack/react-query";
import {User} from "../user";
import service, {UseMutate} from "../../tools/service";
import {Meet} from "../meet";
import {useUnit} from "../../tools/hooks";

export const useProjects = (): UseQueryResult<Project[]> => {
    return useQuery(['projects'], () => service.get(`/project`),)
}
export const useProject = (id?: number): UseQueryResult<Project> => {
    return useQuery(['project', id], () => service.get(`/project/${id}`), {
        enabled: Boolean(id),
    })
}
export const useProjectMeets = (id: number): UseQueryResult<Meet[]> => {
    return useQuery(['projectMeets', id], () => service.get(`/project/${id}/meet`),)
}
export const useProjectUsers = (id: number): UseQueryResult<User[]> => {
    return useQuery(['projectUsers', id], () => service.get(`/project/${id}/user`),)
}

export const useAddProject = (): UseMutate<Project> => useMutation((project) => service.post("/project", project))
export const useUpdateProject = (): UseMutate<Project> => useMutation((project) => service.put(`/project/${project.id}`, project))

interface ProjectUser {
    projectId: number
    userId?: number
}

export const useAddProjectUser = (projectId?: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()
    const user = useUnit();

    return useMutation(({ projectId }) => service.post("/project/" + projectId + '/user/' + user.id), {
        onSuccess() {
            queryClient.invalidateQueries(['projectUsers', projectId])
        },
    })
}
export const useDeleteProjectUser = (projectId?: number): UseMutate<ProjectUser> => {
    const queryClient = useQueryClient()
    const user = useUnit();

    return useMutation(({ projectId }) => service.delete("/project/" + projectId + '/user/' + user.id), {
        onSuccess() {
            queryClient.invalidateQueries(['projectUsers', projectId])
        },
    })
}