/*

    this service page contains helper function which is reusable for others page if necessary. For Projects page only

*/
const projects = [
    {
        id: 1,
        name: "Membuat project pribadi",
        status: "active",
        priority: "high",
        createdAt: null,
        updatedAt: null
    },
    {
        id: 2,
        name: "Optimasi profil LinkedIn ke versi terbaru",
        status: "done",
        priority: "medium",
        createdAt: null,
        updatedAt: null
    },
    {
        id: 3,
        name: "Berburu info 19 juta lowongan pekerjaan",
        status: "active",
        priority: "high",
        createdAt: null,
        updatedAt: null
    }
]
const PROJECTS_KEY = "PROJECTS"

export const getAll = () => {
    return projects
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