import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
import { AuthProvider, useAuth } from "../contexts/authContext.jsx"

const Dashboard = () => {
    const navigate = useNavigate()
    function clickProfile() {
        navigate("/profile")
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <div className="flex flex-col gap-4">
                    <h1>Welcome to Dashboard Page!</h1>
                    <div className="flex gap-2">
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickProfile}>
                        Profile
                        </button>
                    </div>
                </div>
            </div>
            <AuthProvider />
        </>
    )
}

export default Dashboard;