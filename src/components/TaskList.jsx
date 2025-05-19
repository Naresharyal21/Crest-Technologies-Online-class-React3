import React, { useState, useEffect } from "react";
import ProgressBar from './ProgressBar';
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
const TaskList = () => {
   
    const [task, settask] = useState([]);
    useEffect(() => {

        const savedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
        settask(savedTasks);
    }, []);
    if (task.length === 0) return <p>No task found</p>

const handleDelete=(id)=>{
    const updatedTasks=task.filter((i)=>i.id!==id);
    settask(updatedTasks);
    localStorage.setItem('myTasks', JSON.stringify(updatedTasks));

}



    return (
        <>
            <h2>task List</h2>
            <table cellPadding={0} cellSpacing={0}>
                <thead>

                    <tr  >
                        <th>Task Name</th>
                        <th>Description</th>
                        <th>Total Steps</th>
                        <th>Completed Steps</th>
                        <th>Status</th>
                    </tr>

                </thead>
                <tbody>
                    {task.map((task, index) => (
                        <tr key={index}>
                            <td>{task.taskName}</td>
                            <td>{task.description}</td>
                            <td>{task.totalSteps}</td>
                            <td>{task.currentstep}</td>
                             <td className="border-1 py-10">
                                    <button
                                        className="rf-m mr-10 btn-10"
                                        onClick={() => handleDelete(task.id)}
                                    >
                                        <MdDeleteOutline />
                                    </button>
                                    </td>
                             <td className="border-1 py-10">
                                    <button
                                        className="rf-m mr-10 btn-10"
                                        onClick={() => handleedit(task.id)}
                                    >
                                        <MdOutlineEdit />
                                    </button>
                                    </td>

                            <td style={{ width: '200px' }}> 
                                <ProgressBar
                                    completedStep={Number(task.currentstep)}
                                    totalSteps={Number(task.totalSteps)}
                                />
                            </td>

                        </tr>
                    ))}

                </tbody>

            </table>

        </>
    )
}
export default TaskList;