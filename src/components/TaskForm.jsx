import React, { useState } from "react";

const TaskForm = ({ onAddTask, onCancel }) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [totalStep, setTotalStep] = useState('');
  const [error, setError] = useState({});

  const validate = () => {
    const error = {};
    if (taskName.trim() === '') {
      error.taskName = "Task Name is Required";
    }
    if (description.trim() === '') {
      error.description = "Description is Required";
    }
    if (totalStep.trim() === '') {
      error.totalStep = "Total Steps is Required";
    } else if (isNaN(totalStep) || Number(totalStep) <= 0) {
      error.totalStep = "Total Steps must be a positive number";
    }
    setError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newTask = {
      id: Date.now(),
      taskName,
      description,
      totalStep: Number(totalStep),
      currentstep: 0,
    };

    onAddTask(newTask);

    // Clear form
    setTaskName('');
    setDescription('');
    setTotalStep('');
  };

  return (
    <form className="bxhw" onSubmit={handleSubmit}>

      <input className='mr-11 sw'
        type="text"
        placeholder="Enter Task Name"
        value={taskName}
        onChange={(e) => {
          setTaskName(e.target.value);
          if (error.taskName) setError({ ...error, taskName: '' });
        }}
      />
      <p>{error.taskName}</p>

      <input className='mr-11 sw'
        type="text"
        placeholder="Enter Description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (error.description) setError({ ...error, description: '' });
        }}
      />
      <p>{error.description}</p>

      <input  className='mr-11 sw'
        type="number"
        placeholder="Enter Total Steps"
        value={totalStep}
        onChange={(e) => {
          setTotalStep(e.target.value);
          if (error.totalStep) setError({ ...error, totalStep: '' });
        }}
      />
      <p>{error.totalStep}</p>

      <button className='mr-11 sw'  type="submit">Add My Task</button>
      <button className='mr-11 sw'  type="button" onClick={onCancel}>Cancel</button>
    </form>
  ); 
};

export default TaskForm;
