import { useEffect, useState } from "react"
import {createProject, editProject, getById} from "../services/projectServices"
import { useParams } from "react-router"

const ProjectForm = () => {
    const [name, setName] = useState("")
    const [status, setStatus] = useState("")
    const [priority, setPriority] = useState("")
    const [desc, setDesc] = useState("")
    const [deadline, setDeadline] = useState("")
    const { id } = useParams()
    const selectedData = getById(parseInt(id))
    const isCreateData = !id || !selectedData

    useEffect(() => {
        setName(selectedData?.name)
        setStatus(selectedData?.status)
        setPriority(selectedData?.priority)
        setDesc(selectedData?.desc)
        setDeadline(selectedData?.deadline)
    }, [])

    function handlerSubmitForm(e) {
        e.preventDefault()
        
        if (isCreateData) {
            const createData = createProject(name, status, priority, desc, deadline)
            console.log("data setelah diolah dari backend : ", createData)
        } else {
            const editData = editProject(id, name, status, priority, desc, deadline)
            console.log("data setelah diolah dari backend : ", editData)
        }
    }

    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-center h-screen">
                <form onSubmit={handlerSubmitForm} className="bg-blue-100 px-4 py-16 rounded-xl shadow-lg" action="">
                    <h1 className="font-bold text-center mb-4">{isCreateData ? "New Project" : "Edit Project"}</h1>

                    <div className="flex flex-col gap-4 ">
                        {/* name section */}
                        <div className="flex gap-4 items-center">
                            <label className="flex-1/3" htmlFor="name">Name</label>
                            <input 
                                className="flex-2/3 border rounded-sm outline-none p-1" 
                                type="text" 
                                id="name" 
                                placeholder="Name"
                                onChange={e => setName(e.target.value)}
                                value={name}
                            />
                        </div>
                        {/* status section */}
                        <div className="flex gap-4 items-center">
                            <label className="flex-1/3" htmlFor="status">Status</label>
                            <select value={status} onChange={e => setStatus(e.target.value)} className="flex-2/3 border rounded-sm outline-none p-1" name="" id="status">
                                <option value="planned">Planned</option>
                                <option value="active">Active</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        {/* priority section */}
                        <div className="flex gap-4 items-center">
                            <label className="flex-1/3" htmlFor="priority">Priority</label>
                            <select value={priority} onChange={e => setPriority(e.target.value)} className="flex-2/3 border rounded-sm outline-none p-1" id="priority">
                                <option value="low">low</option>
                                <option value="medium">medium</option>
                                <option value="high">high</option>
                            </select>
                        </div>
                        {/* desc section */}
                        <div className="flex gap-4 items-center">
                            <label className="flex-1/3" htmlFor="name">Description</label>
                            <input value={desc} onChange={e => setDesc(e.target.value)} className="flex-2/3 border rounded-sm outline-none p-1" type="text" id="name" placeholder="Name" />
                        </div>
                        {/* deadline section */}
                        <div className="flex gap-4 items-center">
                            <label className="flex-1/3" htmlFor="name">dueDate</label>
                            <input value={deadline} onChange={e => setDeadline(e.target.value)} className="flex-2/3 border rounded-sm outline-none p-1" type="text" id="name" placeholder="Name" />
                        </div>
                    </div>

                    <button className="flex justify-center items-center w-full bg-blue-800 border rounded-xl p-4 text-white font-semibold mt-4" type="submit">
                        {isCreateData ? "Add Project" : "Change Project"}
                    </button>
                </form>
            </div>
        </>
    )
}

export default ProjectForm