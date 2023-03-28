import React, {useEffect, useState} from 'react';
import ForwardAppBar from "../components/ForwardAppBar";
import {TabPanel} from "../components/tabs";
import {useAddUser, User, useUpdateUser} from "../modules/user";
import QStepper from "../components/QStepper";
import QContainer from "../components/QContainer";
import {Box, TextField, Typography} from "@mui/material";
import Avatar, {genConfig} from 'react-nice-avatar'
import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {useMutation, useQuery, UseQueryResult} from "@tanstack/react-query";
import {Project, useProject} from "../modules/project";
import {useParams, useSearchParams} from "react-router-dom";
import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REDIRECT_URI, GOOGLE_USER_INFO_URI} from "../auth";
import {UseMutate} from "../tools/service";

export const useData = (parameters: any): UseMutate<any> => {
    // return useQuery(['data'], () => service.post(``, parameters))
    return useMutation(() => service.post(``, parameters))
}

export const createService = (): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: 'https://accounts.google.com/o/oauth2/token',
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)


    return service
}

const service = createService()



const createService3 = (access_token: string): AxiosInstance => {
    const service = axios.create()
    service.interceptors.request.use((config: AxiosRequestConfig) => ({
        baseURL: GOOGLE_USER_INFO_URI,
        headers: { Authorization: `Bearer ${access_token}` },
        ...config,
    }))
    service.interceptors.response.use(( axiosResponse) => axiosResponse.data)
    console.log(service,'service')
    return service
}

export default function CallbackPage() {
    const [access_token, setAccess_token] = useState();

    const [searchParams, setSearchParams] = useSearchParams();
    const code = searchParams.get("code")

    console.log(code, 'code')
    const parameters = {
        'client_id': GOOGLE_CLIENT_ID,
        'client_secret': GOOGLE_CLIENT_SECRET,
        'redirect_uri': GOOGLE_REDIRECT_URI,
        'grant_type': 'authorization_code',
        code,
    };


    const sdata = useData(parameters)

    if (access_token) {
        console.log(access_token, 'access_token')
        const config = {
            headers: { Authorization: `Bearer ${access_token}` }
        };

        const bodyParameters = {
            key: "value"
        };

        axios.get(
            GOOGLE_USER_INFO_URI,
            config
        ).then(console.log).catch(console.log);
    }

    useEffect(() => {
        sdata.mutateAsync(parameters).then((result: any) => {
            setAccess_token(result.access_token)
        })
    }, [code])


    return (
<div>2</div>    );
}


// access_token
//     :
//     "ya29.a0Ael9sCOksGkMKKIRg4WG_uLqOApYUmu8-JalKK3VIVHTqLVq8OqpqAsIbFIUYcH7N5oFaloBq0d1ANS8sZ_oOwcDVj2SM9uJvu1nrOb_Yq8kDnWDyw0x0qY5AeZ1Gb1V1XUMhzao8lWfF00yOoG8N0jsWuL0aCgYKATwSARESFQF4udJhVQ_yunhQe-0ySHB-L_P3QQ0163"
// expires_in
//     :
//     3599
// id_token
//     :
//     "eyJhbGciOiJSUzI1NiIsImtpZCI6IjFhYWU4ZDdjOTIwNThiNWVlYTQ1Njg5NWJmODkwODQ1NzFlMzA2ZjMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODA0OTgwMjIzODM3LTllMzUwcmo4cDhnbGdicWVsNWM1cm1oNmphZm5mMXUyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODA0OTgwMjIzODM3LTllMzUwcmo4cDhnbGdicWVsNWM1cm1oNmphZm5mMXUyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2Nzg2NDM4MTQ2MzU4MzM1NDU2IiwiZW1haWwiOiI0NzU3MDM3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicnpVZ25MS0s5MktLbHptTUhrMmZVZyIsImlhdCI6MTY4MDAzNjQ5MiwiZXhwIjoxNjgwMDQwMDkyfQ.MEsJTkMjXC2w0qNO2VULn_On5Q31gHJBoGk0sf8M-Jr-vaz-Uz9Sg_ex6tT1SZ-DJ_8MCJpmJTn6iVl6qVkOC_MntlXhGkXb_u4aM2aMdXqcC418wh-qHJ4JIysqMa0vZC-wVUJcZkJqaMkpuEgL16x4C_SPWEkE7d_3JFcxpmMTCkmNkArtZtJhF8aMjwBnqozGd38PLVRuHXdZ_uCUy2CsFphe9K80XR5c9xQ8y28ESa5MRq8rfyqY-5-Ci6vFmwgquTSRsCIgKpWs5IVOMrVnWWxsMAPWvihVumex68s3JEnSVr5bZR1FxMwVIwCKuPiRiPf_lxtqFkx_XZo1FQ"
// scope
//     :
//     "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"
// token_type
//     :
//     "Bearer"

// const createService3 = (): AxiosInstance => {
//     const service = axios.create()
//     service.interceptors.request.use((config: AxiosRequestConfig) => ({
//         baseURL: GOOGLE_USER_INFO_URI,
//         headers: { Authorization: `Bearer ${result.access_token}` },
//         ...config,
//     }))
//     service.interceptors.response.use(( axiosResponse) => axiosResponse.data)
//     return service
// }
// const service3 = createService3()
// const { data: data3 } = useQuery(['data3'], () => service3.get(``))
// console.log(data3,'data3')