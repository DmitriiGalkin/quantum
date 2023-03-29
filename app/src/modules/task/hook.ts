import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import service, {UseMutate} from "../../tools/service";
import {UserTask} from "./types";
import {User} from "../user";

export const useTask = (id: number): UseQueryResult<User> => {
    return useQuery(['task', id], () => service.get(`/user-task/${id}`),)
}

export const useOnlyUserTasks = (): UseQueryResult<UserTask[]> => {
    return useQuery(['userTasks'], () => service.get(`/tasks`))
}

export const useEditUserTask = (): UseMutate<any> => useMutation((task) => service.put(`/task/${task.id}`, task))
