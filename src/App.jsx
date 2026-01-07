
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <LoginPage />
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute><Dashboard /></ProtectedRoute>
        }
    ])

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App;