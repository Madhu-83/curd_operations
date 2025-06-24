import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/get").then((res) => {
      setTasks(res.data);
    });
  }, []);

  const saveTask = () => {
    if (!input.trim()) return;

    if (editingId) {
      axios
        .put(`http://localhost:5000/api/update/${editingId}`, { task: input })
        .then(() => {
          setTasks((prev) =>
            prev.map((t) => (t._id === editingId ? { ...t, task: input } : t))
          );
          setEditingId(null);
          setInput("");
        });
    } else {
      axios
        .post("http://localhost:5000/api/save", { task: input })
        .then((res) => {
          setTasks([...tasks, res.data]);
          setInput("");
        });
    }
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/api/delete/${id}`).then(() => {
      setTasks(tasks.filter((t) => t._id !== id));
    });
  };

  const startEdit = (task) => {
    setInput(task.task);
    setEditingId(task._id);
  };

  return (
    <div className="app-container">
      <div className="task-manager">
        <h1>Task Manager</h1>
        <div className="form">
          <input
            type="text"
            placeholder="Enter your task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={saveTask}>
            {editingId ? "✅ Update" : "➕ Add"}
          </button>
        </div>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id}>
              <span>{task.task}</span>
              <div className="btns">
                <button className="edit" onClick={() => startEdit(task)}>
                  📝 Edit
                </button>
                <button className="delete" onClick={() => deleteTask(task._id)}>
                  ❌ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
