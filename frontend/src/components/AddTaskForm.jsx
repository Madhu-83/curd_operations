import { useState } from 'react';
import axios from 'axios';
import './AddTaskForm.css';

export default function AddTaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/tasks', { title });
      onTaskAdded(res.data);  // Add task to list
      setTitle(''); // Clear input
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task..."
      />
      <button type="submit">Add Task</button>
    </form>
  );
}
