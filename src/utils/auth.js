import Login from "pages/login/Login";
import { Navigate, Outlet } from "react-router-dom";

const RoleUser = ["user", "manager", "dev", "mod", "admin"];

const RoleAdmin = ["dev", "mod", "admin"];

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("currentUser"));
};

export const checkRoleUser = () => {
    const currentUser = getCurrentUser();

    return RoleUser.includes(currentUser?.role);
};

export const checkRoleAdmin = (roles = []) => {
    const currentUser = getCurrentUser();

    if (roles.length) {
        return roles.includes(currentUser?.role);
    }
    return RoleAdmin.includes(currentUser?.role);
};

export const RequireAuth = () => {
    const currentUser = getCurrentUser();

    if (currentUser) {
        return <Navigate to="/dashboard" replace />;
    }
    return <Login />;
};

export const RoleAccess = ({ roles = [] }) => {
    if (roles.length && checkRoleAdmin(roles) === false) {
        return <Navigate to="/unauthorized" replace />;
    }
    return <Outlet />;
};
