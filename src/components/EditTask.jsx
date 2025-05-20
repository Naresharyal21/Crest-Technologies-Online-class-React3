import React, { useState, useEffect } from "react";

const EditTask = ({ task, onUpdateTask,onCancel }) => {
  const [taskName, setTaskName] = useState(task.taskName);
  const [description, setDescription] = useState(task.description);
  const [currentStep, setCurrentStep] = useState(task.currentstep);
  const [error, setError] = useState({});

  const validate = () => {
    const error = {};
    if (!taskName.trim()) error.taskName = "Task Name is required";
    if (!description.trim()) error.description = "Description is required";
    if (!currentStep || isNaN(currentStep) || Number(currentStep) <= 0)
      error.currentStep = "Current Step must be a positive number";

    setError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const updatedTask = {
      ...task,
      taskName,
      description,
      currentstep: currentStep,
    };

    onUpdateTask(updatedTask);
  };

  return (
    <form  className="bxhw" onSubmit={handleSubmit}>
      <input className='mr-11 sw'
        type="text"
        name="TaskName"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter Task Name"
      />
      <p>{error.taskName}</p>

      <input className='mr-11 sw'
        type="text"
        name="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter Description"
      />
      <p>{error.description}</p>

      <input className='mr-11 sw'
        type="number"
        name="currentsteps"
        value={currentStep}
        onChange={(e) => setCurrentStep(e.target.value)}
        placeholder="Enter Completed Steps"
      />
      <p>{error.currentStep}</p>

      <button className='mr-11 sw' type="submit">Update Task</button>
      <button className='mr-11 sw' type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default EditTask;
