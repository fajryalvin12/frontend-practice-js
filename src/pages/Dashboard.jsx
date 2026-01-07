import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const Dashboard = () => {
    // line of state / useState 
    const [cred, setCred] = useState({})
    const navigate = useNavigate()

    function clickLogout () {
        localStorage.removeItem('json')
        navigate("/")
    }

    function validateUserData() {
        const userData = localStorage.getItem('json')

        // check json data before parse into object 
        if (userData === null || userData === "" || userData === "undefined") {
            navigate("/")
            return
        } else {

            // parse json into common object and validate the object first before pass to the hook state cred
            const json = JSON.parse(userData)

            // check object length, empty object indicate the parsing was failed
            if (Object.keys(json).length === 0) {
                navigate("/");
                return;
            }

            const user  = json.user
            const token = json.token

            // check the value inside checked object before sending the value to state cred
            if (user === "" || token === "" || typeof user !== "string" || typeof token !== "string") {
               navigate("/")
               return
            }
            setCred(json)
        }
    }

    useEffect(() => {
        validateUserData()
    }, [])

    console.log("credential yang login : ", cred.token)

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