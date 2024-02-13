import {useAuth} from "./auth";
import {FAST_IDEA} from "../dialogs/FastIdea";
import {useAddIdea, useAddPlace, useAddProject, useAddUser, useCreateInvite} from "./service";
import {useEffect} from "react";
import {FAST_PROJECT} from "../dialogs/FastProject";
import {Invite} from "./dto";

export const useFast = () => {
    const { isAuth } = useAuth();

    const fastIdeaJSON = localStorage.getItem(FAST_IDEA)
    const addUser = useAddUser()
    const addIdea = useAddIdea()
    useEffect(() => {
        if (isAuth && fastIdeaJSON) {
            const fastIdea = JSON.parse(fastIdeaJSON)
            addUser.mutateAsync(fastIdea.user).then((userId)=>{
                addIdea.mutateAsync({...fastIdea.idea, userId}).then(() => {
                    localStorage.removeItem(FAST_IDEA)
                })
            })
        }
    }, [isAuth, fastIdeaJSON])

    const fastProjectJSON = localStorage.getItem(FAST_PROJECT)
    const addPlace = useAddPlace()
    const addProject = useAddProject()
    const addInvite = useCreateInvite()
    useEffect(() => {
        if (isAuth && fastProjectJSON) {
            const fastProject = JSON.parse(fastProjectJSON)
            addPlace.mutateAsync(fastProject.place).then((placeId)=>{
                addProject.mutateAsync({...fastProject.project, placeId}).then((projectId)=>{
                    fastProject.invites?.forEach((i: Partial<Invite>) => {
                        addInvite.mutate({ ideaId: i.ideaId as number, projectId: projectId as number, userId: i.userId as number })
                    })
                    localStorage.removeItem(FAST_PROJECT)
                })
            })
        }
    }, [isAuth, fastProjectJSON])

}