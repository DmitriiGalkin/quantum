import {useOutlet} from "react-router-dom";
import {AuthProvider} from "../tools/hooks";

export const AuthLayout = () => {
    const outlet = useOutlet();

    return (
        <AuthProvider>{outlet as JSX.Element}</AuthProvider>
    );
};