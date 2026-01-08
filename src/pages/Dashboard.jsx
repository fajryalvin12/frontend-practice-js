import { useNavigate } from "react-router-dom"
import { clearSession } from "../services/authServices.js"

const Dashboard = () => {
    const navigate = useNavigate()

    function clickLogout () {
        clearSession()
        navigate("/")
    }
    function clickProfile() {
        navigate("/profile")
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col gap-4">
                    <h1>Welcome to Dashboard Page!</h1>
                    <div className="flex gap-2">
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickLogout}>
                        Logout
                        </button>
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickProfile}>
                        Profile
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;