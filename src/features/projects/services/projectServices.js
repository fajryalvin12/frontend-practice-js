/*

    this service page contains helper function which is reusable for others page if necessary. For Projects page only

*/
// const projects = [
//     {
//         id: 1,
//         name: "Membuat project pribadi",
//         status: "active",
//         priority: "high",
//         createdAt: null,
//         updatedAt: null
//     },
//     {
//         id: 2,
//         name: "Optimasi profil LinkedIn ke versi terbaru",
//         status: "done",
//         priority: "medium",
//         createdAt: null,
//         updatedAt: null
//     },
//     {
//         id: 3,
//         name: "Berburu info 19 juta lowongan pekerjaan",
//         status: "active",
//         priority: "high",
//         createdAt: null,
//         updatedAt: null
//     }
// ]
const projects = []
const PROJECTS_KEY = "PROJECTS"

// helper function, modularize reason
export const setTimestamp = () => {
    const date = Date.now()
    const now = new Date(date)
    const strNow = now.toISOString().split("T")
    const actualDate = strNow[0] + " " + strNow[1].split(".")[0]

    return actualDate
}

export const isValidName = (name) => {
    let isValid = true

    if (typeof name !== "string" || name === "" || name.trim().length <= 0) return false 

    return isValid
}

export const isValidStatus = (status) => {
    let isValid = true

    if (typeof status !== "string") return false 

    const listStatus = ["planned", "active", "done"]
    const checkStatus = listStatus.includes(status)

    if (!checkStatus) return false 

    return isValid
}

export const isValidPriority = (priority) => {
    let isValid = true
    if (typeof priority !== "string") return false 
    
    const listPriority = ["low", "medium", "high"]
    const checkPriority = listPriority.includes(priority)
    if (!checkPriority) return false 
    
    return isValid
}

// main function for CRUD Process 
export const getAll = () => {
    const rawData = localStorage.getItem("projects")

    if (!rawData) return []

    try {
        const mainJson = JSON.parse(rawData)

        if (!mainJson || !Array.isArray(mainJson)) {
            localStorage.removeItem("projects")
            return []
        }

        return mainJson
    } catch {
        return []
    }
    
}

export const getById = (id) => {
    let selected = {}

    for(let i = 0; i < projects.length; i++) {

        if (projects[i].id !== id) continue;

        if (projects[i].id === id) {
            selected = projects[i]
        }
    }
    
    if (Object.keys(selected).length === 0) return null;

    return selected;
}

export const createProject = (name, status, priority, desc, deadline) => {
    // init object for create new data
    let result = {
        success: false,
        message: "",
        data: {}
    }

    // basic data validation first (name)
    const checkName = isValidName(name)
    const checkStatus = isValidStatus(status)
    const checkPriority = isValidPriority(priority)

    if (!checkName || !checkStatus || !checkPriority) {
        result.success = false
        result.message = "format data belum sesuai, silakan lakukan pengisian data kembali"
        return result
    }

    // create id, regarding to the maxId from projects
    const allData = getAll()
    let maxId = 0
    for (let i = 0; i < allData.length; i++) {
        console.log("hasil loop alldata : ", allData[i].id)

        if (allData[i].id > maxId) {
            maxId = allData[i].id
        }
    }
    let newId = maxId + 1
    result.data.id = newId
    
    // assign the result to object container, then parse the result to string and pass to storage 
    result.success = true
    result.message = "Berhasil menambahkan data tracker baru"
    result.data.name = name
    result.data.status = status
    result.data.priority = priority
    result.data.desc = desc
    result.data.deadline = deadline
    result.data.createdAt = setTimestamp()
    result.data.updatedAt = setTimestamp()

    allData.push(result.data)

    localStorage.setItem("projects", JSON.stringify(allData))

    return result
}