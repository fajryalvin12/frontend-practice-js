/*
    This file using for summarize the auth logic in a reusable function, instead of typing the code in many pages/files
*/

const SESSION_KEY = 'json'

// get raw string json from localStorage
export const getRawSession = () => {
    try {
        return localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY)
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

    const {user, token, expiresAt} = session

    // check expiry date, validate the expiresAt first
    if (!expiresAt || typeof expiresAt !== "number" || Date.now() >= expiresAt) {
        clearSession()
        return false
    }

    // check the token first 
    if (!token || typeof token !== "string" || token.trim() === "") return false 

    // check the value inside checked object before sending the value to state cred
    if (!user || Array.isArray(user) || typeof user !== "object") return false;

    return true
}

// reusable function for use generated session
export const getSession = () => {
    // call getRawSession()
    const rawSession = getRawSession();
    if (rawSession === "null" || rawSession === null) return null 

    // call safeParseSession() 
    const cleanSession = safeParseSession(rawSession)
    if (cleanSession === "null" || cleanSession === null) {
        clearSession()
        return null
    } 

    // call validateSession() 
    const isValidSession = validateSession(cleanSession)
    if (!isValidSession) return null

    return cleanSession;
}

// reusable function for create new session 
export const setSession = (sessionObj, remember) => {
    let localJson = {}

    const user = sessionObj.data.userData
    const token = sessionObj.data.token
    const expiresAt = sessionObj.data.expiresAt

    // user validation check
    if (Array.isArray(user) || user === null || typeof user !== "object" ) return false 

    // token validation check 
    if (token === "" || typeof token !== "string") return false

    // expiresAt validation check 
    if (typeof expiresAt !== "number" || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) return false

    localJson.user      = user
    localJson.token     = token
    localJson.expiresAt = expiresAt

    if (remember) {
        localStorage.setItem('json', JSON.stringify(localJson))
    } else {
        sessionStorage.setItem('json', JSON.stringify(localJson))
    }

    return true
}

// destroy session, either in local or session storage 
export const clearSession = () => {
    try {
        localStorage.removeItem(SESSION_KEY)
        sessionStorage.removeItem(SESSION_KEY)
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