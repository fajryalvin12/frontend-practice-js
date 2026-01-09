import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({children}) => {
    const location = useLocation()
    const auth = useAuth()
    const isAuth = auth.isAuth

    if (!isAuth) return <Navigate state={location} to="/" replace />

    return children
}

export default ProtectedRoute;