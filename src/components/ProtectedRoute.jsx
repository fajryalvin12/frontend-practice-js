import { Navigate, useLocation } from "react-router";
import { getSession } from "../services/authServices";

const ProtectedRoute = ({children}) => {
    const location = useLocation()

    const allowedUser = getSession()
    if (allowedUser === null) return <Navigate state={location} to="/" replace />

    return children
}

export default ProtectedRoute;