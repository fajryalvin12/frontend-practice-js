import { useNavigate } from "react-router-dom"
import { clearSession } from "../services/authServices.js"

const Dashboard = () => {
    const navigate = useNavigate()

    function clickLogout () {
        clearSession()
        navigate("/")
    }

    return (
        <>
            <div className="flex justify-center items-center h-screen">
                <div className="flex flex-col gap-4">
                    <h1>Welcome to Dashboard Page!</h1>
                    <button className="bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </>
    )
}

export default Dashboard;