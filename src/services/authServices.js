/*
    This file using for summarize the auth logic in a reusable function, instead of typing the code in many pages/files
*/

const SESSION_KEY = 'json'

// get raw string json from localStorage
export const getRawSession = () => {
    try {
        return localStorage.getItem(SESSION_KEY)
    } catch {
        return null
    }
}

// raw session's validation for ensuring the data type or value was allowed to being parsed
export const safeParseSession = (raw) => {
    if (raw === null || raw === undefined) return null
    
    const string = String(raw).trim()
    if (!string) return null

    const lowered = string.toLowerCase()
    if (lowered === "null" || lowered === "undefined") return null

    try {
        const parsed = JSON.parse(string)

        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null
        return parsed
    } catch {
        return null 
    }
}

// validation logic for the parsed Session, second guard
export const validateSession = (session) => {
    if (!session || typeof session !== "object" || Array.isArray(session)) return false

    // check object length, empty object indicate the parsing was failed
    if (Object.keys(session).length === 0) return false

    const {user, token} = session

    // check the token first 
    if (!token || typeof token !== "string" || token === "") return false 

    // check the value inside checked object before sending the value to state cred
    if (!user || Array.isArray(user)) return false;

    return true
}

// reusable function for use generated session
export const getSession = () => {
    // call getRawSession()
    const rawSession = getRawSession();
    if (rawSession === "null" || rawSession === null) return null 

    // call safeParseSession() 
    const cleanSession = safeParseSession(rawSession)
    if (cleanSession === "null" || cleanSession === null) return null 

    // call validateSession() 
    const isAllowedUser = validateSession(cleanSession)
    if (!isAllowedUser) return null

    return cleanSession;
}

// reusable function for create new session 
export const setSession = (sessionObj) => {
    let localJson = {}

    const user = sessionObj.data.userData
    const token = sessionObj.data.token

    if (user === "" || typeof user !== "object" || token === "" || typeof token !== "string") {
        return false
    }

    localJson.user = user
    localJson.token = token

    localStorage.setItem('json', JSON.stringify(localJson))
    return true
}

// destroy session in localstorage 
export const clearSession = () => {
    try {
        return localStorage.removeItem(SESSION_KEY)
    } catch {
        // blank scope
    }
}

// wrapper / helper function for auth toggle 
export const isAuthenticated = () => {
    const session = getSession()

    if (session === null || session === "null") return false 

    return true 
}

// reusable function for get username only 
export const getUser = () => {
    const session = getSession()

    return session.user
}