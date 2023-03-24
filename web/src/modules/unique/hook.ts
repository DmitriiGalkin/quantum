import {useMutation, useQueryClient} from "@tanstack/react-query";
import service, {UseMutate} from "../../tools/service";
import {User} from "../user";

// export const useEditUnique = (): UseMutate<any> => useMutation((unique) => service.put(`/uniques/${unique.id}`, unique))

export const useEditUnique = (userId: number): UseMutate<User> => {
    const queryClient = useQueryClient()
    return useMutation((unique) => service.put(`/unique/${unique.id}`, unique), {
        onSuccess() {
            queryClient.invalidateQueries(['userUniques', userId])
        },
    })
}