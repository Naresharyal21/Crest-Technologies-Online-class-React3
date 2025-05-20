import React, { useState, useEffect } from "react";
import ProgressBar from "./ProgressBar";
import { CiSearch } from "react-icons/ci";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

const TaskList = ({ tasks, onEditTask, onDeleteTask }) => {
  const [search, setSearch] = useState("");
  const [filteredTasks, setFilteredTasks] = useState(tasks);

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      task.taskName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredTasks(filtered);
  }, [search, tasks]);

  if (tasks.length === 0) return <p className="no-tasks">No task found</p>;

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="task-list-container">
      <h2 className="task-list-title">Task List</h2>

      <div className="flex py-15 searchicon">
        <div className="inner">
          <CiSearch />
        </div>
        <input
          className="input mr-10"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
      </div>

      <div
        className="task-cards"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {filteredTasks.map((task, index) => (
          <div
            key={index}
            className="task-card"
            style={{
              width: "300px",
              padding: "15px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <div
              className="task-header"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <h3>{task.taskName}</h3>
              <div className="task-actions">
                <button className="btn-icon" onClick={() => onEditTask(task)}>
                  <MdOutlineEdit />
                </button>
                <button
                  className="btn-icon"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
            <p>{task.description}</p>
            <p>
              <strong>Total Steps:</strong> {task.totalStep}
            </p>
            <p>
              <strong>Completed Steps:</strong> {task.currentstep}
            </p>
            <div style={{ marginTop: "10px" }}>
              <ProgressBar
                completedStep={Number(task.currentstep)}
                totalStep={Number(task.totalStep)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
