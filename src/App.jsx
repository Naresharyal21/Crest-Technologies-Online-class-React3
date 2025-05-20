import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

const App = () => {
  const [mode, setMode] = useState("light");
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [showForm, setShowForm] = useState(false); // controls showing Add Form

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = (task) => {
    const updatedTasks = [...tasks, task];
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    setShowForm(false); // back to list after adding
  };

  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
    setTaskToEdit(null); // close edit form
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("myTasks", JSON.stringify(updatedTasks));
  };


  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setShowForm(false); 
  };


  const handleAddClick = () => {
    setShowForm(true);
    setTaskToEdit(null); 
  };

 
  const handleCancel = () => {
    setShowForm(false);
    setTaskToEdit(null);
  };

  return (
    <div className={`app-container ${mode}`}>
      <button onClick={toggleMode}>
        {mode === "light" ? "Dark" : "Light"} Mode
      </button>

      {!showForm && !taskToEdit && (
        <>
          <button  onClick={handleAddClick} style={{ marginLeft:"90%" }}>
            Add Task
          </button>
          <TaskList
            tasks={tasks}
            onEditTask={handleEditClick}
            onDeleteTask={handleDeleteTask}
          />
        </>
      )}

      {showForm && !taskToEdit && (
        <TaskForm onAddTask={addTask} onCancel={handleCancel} />
      )}

      {taskToEdit && (
        <EditTask task={taskToEdit} onUpdateTask={updateTask} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default App;
