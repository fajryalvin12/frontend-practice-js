import { useEffect, useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { getSession, setSession } from "../services/authServices.js"
import { useAuth } from "../contexts/authContext.jsx";

const LoginPage = () => {
    // useState, container lines
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [typePass, setTypePass] = useState("password")
    const [error, setError] = useState("")
    const [isError, setIsError] = useState(true)
    const [txtColour, setTxtColour] = useState("text-green-800 text-sm")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [remember, setRemember] = useState(false)
    
    // Hooks variable declaration
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useAuth()
        
    // handler lines
    function dummyJsonMaker(email, password, username) {
        // init the JSON container and decide the allowed data 
        let dummyJson = {
            status: "",
            data: {
                    token: "",
                    userData: {id: 1, username: ""}
                },
            message: "",
        }
        const validOneData = {
            email: "fajryalvin12@gmail.com",
            password: "12345678"
        }
        
        // validate the input data, comparing with allowed data above
        if (email !== validOneData.email || password !== validOneData.password) {
            dummyJson.status = "error",
            dummyJson.message = "Email atau password salah"
            setError(dummyJson.message)
            return dummyJson
        }

        // assign the success value, token and status to JSON
        dummyJson.status = "success",
        dummyJson.data.userData.username = username,
        dummyJson.data.token = "B7xqXbKse85LQzwULgIbomXUefIRi69z7l1aS4q0CtWU0YRzREMtHAIc7hy7ZUL2"
        dummyJson.message = "Login Berhasil"
        setIsError(false)

        return dummyJson
    }
    function handlerSubmitForm (e) {
        e.preventDefault()

        // basic validation email
        if (email === "") {
            setError("Silakan isi email yang valid terlebih dahulu!")
            setTxtColour("text-red-800 text-sm")
            return 
        } 
        
        // basic validation password 
        if (password === "") {
            setError("Silakan isi password terlebih dahulu")
            setTxtColour("text-red-800 text-sm")
            return
        } else if (password.length < 8) {
            setError("Password minimal berisi 8 karakter")
            setTxtColour("text-red-800 text-sm")
            return
        }
        
        setIsSubmitting(true)
        setTimeout(() => {
            const credential = email.split("@")
            const username = credential[0]
            const json = dummyJsonMaker(email, password, username)
            
            auth.login(json, remember)
            
            setIsSubmitting(false)
            
            const beforePage = location?.state?.pathname
            
            if (!beforePage || beforePage === "") {
                navigate("/dashboard")
            } else {
                navigate(beforePage)
            }

        }, 2000)

    }
    function handlerPass(e) {
        e.preventDefault();
        if (typePass === "password") {
            setTypePass("text")
        } else {
            setTypePass("password")
        }
    }

    useEffect(() => {
        getSession()
    }, [])

    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-blue-100 min-width-lg shadow-md rounded-xl py-16 px-4">
                    <h3 className="p-4 text-center font-bold text-xl">Login Page</h3>

                    <form onSubmit={handlerSubmitForm} action="post" className="p-4 flex flex-col gap-6">

                        {/* input data */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center border border-gray-400 rounded-xl overflow-hidden px-4 py-2 gap">
                                <input 
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    name="email" 
                                    id="email" 
                                    className="flex outline-none bg-transparent" 
                                    type="email"
                                    placeholder="Email"
                                />
                                <button 
                                htmlFor="email" 
                                className="flex justify-center items-center shrink-0">
                                    <FaEnvelope />
                                </button>
                            </div>
                            <div className="flex justify-between items-center border border-gray-400 rounded-xl overflow-hidden px-4 py-2">
                                <input 
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    name="pass" 
                                    id="pass" 
                                    className="flex outline-none bg-transparent" 
                                    type={typePass}
                                    placeholder="Password"/>
                                <button 
                                htmlFor="pass" 
                                className="flex justify-center items-center shrink-0"
                                onClick={handlerPass}>
                                    {typePass !== "password" ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            <p className={txtColour}>   
                                {isError ? error : ""}
                            </p>

                            {/* checkbox and forgot pass hyperlink */}
                            <div className="flex justify-between flex-row items-center gap-4">
                                <div className="flex justify-center items-center gap-1 h-full text-sm">
                                    <input 
                                        type="checkbox" 
                                        name="remember" 
                                        id="remember" 
                                        checked={remember} 
                                        onChange={() => setRemember(remember? false : true)}
                                    />
                                    <label htmlFor="remember">Remember for 30 days</label>
                                </div>
                                <p className="text-sm">Forgot password?</p>
                            </div>
                        </div>

                        {/* submit data */}
                        <button type="submit" className="flex justify-center items-center w-full bg-blue-800 border rounded-xl p-4 text-white font-semibold">
                            {!isSubmitting ? "Login" : "Loading..."}
                        </button>

                    </form>
                </div>
            </div>
        </>
    )
}

export default LoginPage