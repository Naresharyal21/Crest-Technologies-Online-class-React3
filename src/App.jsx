import React, { useState,useEffect } from "react";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import TaskList from "./components/TaskList";
const App = () => {
  const[tasks,settasks]=useState([]);
  useEffect(()=>{
    const storedTasks=JSON.parse(localStorage.getItem('myTasks'))||[];
    settasks(storedTasks);
  },[]);
const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    settasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };
   const completedStep = tasks.reduce((sum, t) => sum + Number(t.currentStep), 0);
  const totalSteps = tasks.reduce((sum, t) => sum + Number(t.totalSteps), 0);
  

  return (
    <>
      <TaskForm onAddTask={addTask} />
     
      <TaskList tasks={tasks} />
    </>
  )
}
export default App;