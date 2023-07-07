import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {
    useNavigateAfterLogin
} from "../tools/auth";
import service, {ACCESS_TOKEN, useGoogleLogin} from "../tools/service";
import {googleInfoUserService, useGoogleInfoUser, useGoogleToken} from "../tools/googleAuth";

/**
 * Посадочная страница успешной авторизации в гугле
 */
export default function Google() {
    const redirect = useNavigateAfterLogin()
    const [searchParams] = useSearchParams();
    const code = searchParams.get("code") || ''
    const { data: googleToken } = useGoogleToken(code)
    const googleLogin = useGoogleLogin()
    const googleInfoUser = useGoogleInfoUser()

    // const login = async () => {
    //     // Запрашиваем данные пользователя с Гугл
    //     googleInfoUser.mutateAsync('').then((user: any) => {
    //         // Отправляем все, что накопали на бек, с целью получить нашего пользователя
    //         const data = { ...googleToken, ...user }
    //         googleLogin.mutateAsync(data).then(() => {
    //             localStorage.setItem(ACCESS_TOKEN, googleToken.access_token);
    //
    //             service.interceptors.request.use(
    //                 config => {
    //                     config.headers['Authorization'] = `Bearer ${googleToken.access_token}`;
    //                     return config;
    //                 }, function (error) {
    //                     return Promise.reject(error);
    //                 }
    //             );
    //             service.interceptors.request.use(
    //                 config => {
    //                     // console.log(config,'config')
    //                     return config;
    //                 }, function (error) {
    //                     // Do something with request error
    //                     return Promise.reject(error);
    //                 }
    //             );
    //             redirect()
    //         }).catch(console.log);
    //     }).catch(console.log);
    // }
    //
    // useEffect(() => {
    //     if (googleToken) {
    //         googleInfoUserService.interceptors.request.use(
    //             config => {
    //                 config.headers['Authorization'] = `Bearer ${googleToken.access_token}`;
    //                 return config;
    //             }, function (error) {
    //                 return Promise.reject(error);
    //             }
    //         );
    //
    //         login()
    //     }
    // }, [googleToken])


    return <div>1</div>;
}
