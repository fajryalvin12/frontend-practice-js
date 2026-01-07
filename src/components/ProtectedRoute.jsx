import { Navigate } from "react-router";

const ProtectedRoute = ({children}) => {
    const userData = localStorage.getItem('json')

    // check json data before parse into object 
    if (userData === null || userData === "" || userData === "undefined") {
        return <Navigate to="/" replace />
    } else {

        // parse json into common object and validate the object first before pass to the hook state cred
        const json = JSON.parse(userData)

        // check object length, empty object indicate the parsing was failed
        if (Object.keys(json).length === 0) {
            return <Navigate to="/" replace />
        }

        const user  = json.user
        const token = json.token

        // check the value inside checked object before sending the value to state cred
        if (user === "" || token === "" || typeof user !== "string" || typeof token !== "string") {
            return <Navigate to="/" replace />
        }
    }

    return children
}

export default ProtectedRoute;