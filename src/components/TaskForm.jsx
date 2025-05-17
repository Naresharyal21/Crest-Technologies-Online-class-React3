import React, { useState } from "react";
const TaskForm = () => {
    const [taskName, settaskname] = useState('')
    const [description, setdescription] = useState('')
    const [step, setstep] = useState('')
    const [error, seterror]=useState('');
    const validate = () =>{
        const error ={};
        if(taskName.trim()===''){
            error['taskName']="Task Name is Required"
        }
        if(description.trim()===''){
            error['description']="description is Required"
        }
        if(step.trim()===''){
            error['step']="step is Required"
        }
        seterror(error);
        return Object.keys(error).length === 0;
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        if(!validate()) return;
        const mytasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        mytasks.push({
            id: Date.now(),
            taskName,
            description,
            step,
        });
        localStorage.setItem('myTasks', JSON.stringify(mytasks))
        settaskname('');
        setdescription('');
        setstep('');


    }
    return (
        <>
            <form onClick={handlesubmit}>
                <input type="text" name="TaskName" value={taskName}
                    onChange={(e) => { settaskname(e.target.value); if(error.taskName)seterror({...error,taskName:''}) }} placeholder="Enter Task Name" />
                    <p>{error.taskName}</p>
                <input type="text" name="Description" value={description}
                    onChange={(e) => { setdescription(e.target.value); if(error.description)seterror({...error,description:''})}} placeholder="Enter Description On Task" />
                    <p>{error.description}</p>
                <input type="number" name="steps" value={step}
                    onChange={(e) => { setstep(e.target.value);if (error.setstep)seterror({...error,setstep:''}) }} placeholder="Enter Total Steps" />
                    <p>{error.step}</p>
                <button>Add My Task</button>

            </form>



        </>
    )




}
export default TaskForm;
