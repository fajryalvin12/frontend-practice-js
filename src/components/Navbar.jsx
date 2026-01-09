import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/authContext.jsx"

const Navbar = () => {
    const navigate = useNavigate()
    const auth = useAuth()
    const username = auth?.user?.username
    
    function clickLogout () {
        auth.logout()
        navigate("/")
    }

    return (
        <>
            <div className="flex justify-between items-center h-12 pt-2 px-4">
                <p>Navbar</p>
                <p>Hi, {username}!</p>
                <button className="flex bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickLogout}>
                    Logout
                </button>
            </div>
        </>
    )
}

export default Navbar