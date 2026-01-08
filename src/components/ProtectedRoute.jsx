import { Navigate } from "react-router";
import { getSession } from "../services/authServices";

const ProtectedRoute = ({children}) => {
    
    const allowedUser = getSession()
    if (allowedUser === null) return <Navigate to="/" replace />

    return children
}

export default ProtectedRoute;