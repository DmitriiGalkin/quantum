import React from 'react';
import {useOutlet} from "react-router-dom";
import {AuthProvider} from "../tools/auth";

export default function AuthLayout(): JSX.Element {
    const outlet = useOutlet();

    return (
        <AuthProvider>{outlet as JSX.Element}</AuthProvider>
    );
};