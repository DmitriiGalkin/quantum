import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../tools/hooks";

export const ProtectedLayout = () => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return (
        <Outlet />
    )
};