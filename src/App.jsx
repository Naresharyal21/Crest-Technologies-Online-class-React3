import React from "react";
import ProgressBar from "./components/ProgressBar";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
// import TaskList from "./components/TaskList";
const App = () => {
  return (
    <>
    <TaskForm /><br />
      <ProgressBar /><br />
      <TaskItem /><br />
      {/* <TaskList /> */}


    </>
  )
}
export default App;