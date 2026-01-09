import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute><DashboardPage /></ProtectedRoute>
    },
    {
        path: "/profile",
        element: <ProtectedRoute><ProfilePage /></ProtectedRoute>
    }
])

export default router