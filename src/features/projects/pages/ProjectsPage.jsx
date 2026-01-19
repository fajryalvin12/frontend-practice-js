import { useNavigate, useParams } from "react-router-dom"
import Navbar from "../../../components/Navbar.jsx"
import { AuthProvider } from "../../../contexts/authContext.jsx"
import { getAll, getById, removeProject } from "../services/projectServices.js"
import { FaPlus, FaTrash, FaPen } from "react-icons/fa"
import { useEffect, useState } from "react"


const ProjectsPage = () => {
    const navigate = useNavigate()
    const [projects, setProjects] = useState([])
    function clickProfile() {
        navigate("/profile")
    }
    function clickDashboard() {
        navigate("/dashboard")
    }
    function clickEdit(id) {
        navigate(`/${id}/editproject`)
    }
    function addProject() {
        navigate("/addproject")
    }
    function clickDelete(id) {
        const del = removeProject(id)
        console.log(del)
        if (del.success) {
            setProjects(getAll())
        }
    }

    useEffect(() => {
        setProjects(getAll())
    }, [])

    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 h-screen w-screen">
                <h1 className="px-4">Welcome to Projects Page!</h1>
                <div className="flex gap-4 p-4">
                    <div className="flex flex-1/6 flex-col gap-2">
                        <button className=" bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickProfile}>
                        Profile
                        </button>
                        <button className=" bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickDashboard}>
                        Dashboard
                        </button>
                    </div>
                    <div className="flex-5/6 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <h1>List of All Projects:</h1>
                            <button className="flex justify-center items-center gap-2 bg-yellow-500 text-white p-1 text-sm rounded-md shadow-md" onClick={addProject}>
                                <FaPlus />
                                <p className="text-xs font-semibold">Add new project</p>
                            </button>
                        </div>
                        <table className="w-full text-center">
                            <thead>
                                <tr className="">
                                    <th className="p-1">No</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>createdAt</th>
                                    <th>updatedAt</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.status}</td>
                                            <td>{item.priority}</td>
                                            <td>{item.createdAt === null ? "-" : item.createdAt}</td>
                                            <td>{item.updatedAt === null ? "-" : item.updatedAt}</td>
                                            <td className="flex justify-center gap-2">
                                                <button onClick={() => clickEdit(item.id)} className="bg-green-500 text-white p-1 text-sm rounded-md shadow-md">
                                                    <FaPen  />
                                                </button>
                                                <button onClick={() => clickDelete(item.id)} className="bg-red-500 text-white p-1 text-sm rounded-md shadow-md">
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProjectsPage;