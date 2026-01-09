import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar.jsx"
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
            <Navbar />
            <div className="flex flex-col justify-center items-center h-screen w-screen">
                <div className="flex flex-col gap-4">
                    <h1>Welcome to Profile Page!</h1>
                    <div className="flex gap-2">
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