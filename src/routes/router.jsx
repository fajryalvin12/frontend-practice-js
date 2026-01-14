import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/Login";
import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/Profile";
import ProtectedRoute from "../components/ProtectedRoute"
import ProjectsPage from "../features/projects/pages/ProjectsPage";
import ProjectForm from "../features/projects/pages/ProjectForm";

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
    },
    {
        path: "/projects",
        element: <ProtectedRoute><ProjectsPage /></ProtectedRoute>
    },
    {
        path: "/addproject",
        element: <ProtectedRoute><ProjectForm /></ProtectedRoute>
    }
])

export default router