import { useNavigate } from "react-router-dom"
import Navbar from "../../../components/Navbar.jsx"
import { AuthProvider } from "../../../contexts/authContext.jsx"
import { getAll, getById } from "../services/projectServices.js"
import { useEffect } from "react"

const ProjectsPage = () => {
    const navigate = useNavigate()
    function clickProfile() {
        navigate("/profile")
    }
    function clickDashboard() {
        navigate("/dashboard")
    }

    const getAllProjects = getAll()
    console.log(getAllProjects)
    return (
        <>
            <Navbar />
            <div className="flex flex-col gap-4 h-screen w-screen">
                <h1 className="px-4">Welcome to Projects Page!</h1>
                <div className="flex gap-4 p-4">
                    <div className="flex flex-1/6 flex-col gap-2">
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickProfile}>
                        Profile
                        </button>
                        <button className="flex-1/2 bg-blue-800 text-white font-semibold rounded-xl p-2" onClick={clickDashboard}>
                        Dashboard
                        </button>
                    </div>
                    <div className="flex-5/6">
                        <h1>List of All Projects:</h1>
                        <table>
                            <thead className="">
                                <tr>
                                    <th>No</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Priority</th>
                                    <th>createdAt</th>
                                    <th>updatedAt</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getAllProjects.map((item, index) => {
                                    return (
                                        <tr key={index + 1}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.status}</td>
                                            <td>{item.priority}</td>
                                            <td>{item.createdAt === null ? "-" : "tanggal"}</td>
                                            <td>{item.updatedAt === null ? "-" : "tanggal"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AuthProvider />
        </>
    )
}

export default ProjectsPage;