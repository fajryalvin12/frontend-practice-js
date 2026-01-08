import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/Login";
import DashboardPage from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";

const App = () => {

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

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;