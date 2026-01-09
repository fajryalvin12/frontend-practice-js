import { createContext, useContext, useEffect, useState } from "react";
import { clearSession, getSession, isAuthenticated, setSession } from "../services/authServices";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(isAuthenticated())
    
    useEffect(() => {
        const session = getSession();

        if (session) {
            setUser(session.user)
            setIsAuth(isAuthenticated())
        } else {
            setUser(null)
            setIsAuth(isAuthenticated() === false)
        }
    }, [])

    function login(payload, remember) {
        setSession(payload, remember)

        const session = getSession()

        if (session) {
            setUser(session.user)
            setIsAuth(true)
        } else {
            setUser(null)
            setIsAuth(false)
        }
    }

    function logout () {
        clearSession()
        
        setUser(null)
        setIsAuth(false)
    }

    return (
        <AuthContext.Provider value={{user, isAuth, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context || context === undefined) throw new Error("useAuth must be used within AuthProvider")
    
    return context
}