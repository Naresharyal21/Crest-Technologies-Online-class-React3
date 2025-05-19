import React, { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
    const [taskName, settaskname] = useState('');
    const [description, setdescription] = useState('');
    const [totalstep, settotalstep] = useState('');
    const [error, seterror] = useState({});

    const validate = () => {
        const error = {};
        if (taskName.trim() === '') {
            error['taskName'] = "Task Name is Required";
        }
        if (description.trim() === '') {
            error['description'] = "Description is Required";
        }
        if (totalstep.trim() === '') {
            error['totalstep'] = "Total Steps is Required";
        } else if (isNaN(totalstep) || Number(totalstep) <= 0) {
            error['totalstep'] = "Total Steps must be a positive number";
        }

        seterror(error);
        return Object.keys(error).length === 0;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        const mytasks = JSON.parse(localStorage.getItem('myTasks')) || [];
        mytasks.push({
            id: Date.now(),
            taskName,
            description,
            totalstep,
            currentstep: '3',
        });
        localStorage.setItem('myTasks', JSON.stringify(mytasks));
        settaskname('');
        setdescription('');
        settotalstep('');

        if (onTaskAdded) onTaskAdded();
    };

    return (
        <>
            <form onSubmit={handlesubmit}>
                <input
                    type="text"
                    name="TaskName"
                    value={taskName}
                    onChange={(e) => {
                        settaskname(e.target.value);
                        if (error.taskName) seterror({ ...error, taskName: '' });
                    }}
                    placeholder="Enter Task Name"
                />
                <p>{error.taskName}</p>

                <input
                    type="text"
                    name="Description"
                    value={description}
                    onChange={(e) => {
                        setdescription(e.target.value);
                        if (error.description) seterror({ ...error, description: '' });
                    }}
                    placeholder="Enter Description On Task"
                />
                <p>{error.description}</p>

                <input
                    type="number"
                    name="totalsteps"
                    value={totalstep}
                    onChange={(e) => {
                        settotalstep(e.target.value);
                        if (error.totalstep) seterror({ ...error, totalstep: '' });
                    }}
                    placeholder="Enter Total Steps"
                />
                <p>{error.totalstep}</p>

                <button type="submit">Add My Task</button>
            </form>
        </>
    );
};

export default TaskForm;
