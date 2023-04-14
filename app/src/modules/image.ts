import {useMutation} from "@tanstack/react-query";
import service, {UseMutate} from "../tools/service";

export const useUploadImage = (): UseMutate<FormData, string> => {
    return useMutation((formData) => service.post(`/image`, formData, { headers: { "Content-Type": "multipart/form-data" }}))
}
