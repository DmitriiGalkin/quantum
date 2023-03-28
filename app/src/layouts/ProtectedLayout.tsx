import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../tools/hooks";

export const ProtectedLayout = () => {
    const { access_token } = useAuth();

    if (!access_token) {
        return <Navigate to="/login" />;
    }

    return (
        <Outlet />
    )
};