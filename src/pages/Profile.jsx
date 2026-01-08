import { useNavigate } from "react-router-dom"
import { clearSession } from "../services/authServices.js"

const Profile = () => {
    const navigate = useNavigate()

    function clickLogout () {
        clearSession()
        navigate("/")
    }
    function clickDashboard() {
        navigate("/dashboard")
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col gap-4">
                    <h1>Welcome to Profile Page!</h1>
                    <div className="flex gap-2">
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickLogout}>
                        Logout
                        </button>
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickDashboard}>
                        Dashboard
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;