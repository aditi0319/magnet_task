import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/tasks.css";

const Tasks = () => {
  // main states
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // edit states
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");

  // fetch tasks
  const fetchTasks = async () => {
    const { data } = await API.get("/tasks");
    setTasks(data);
  };

  // add task
  const addTask = async (e) => {
    e.preventDefault();

    try {
      await API.post("/tasks", {
        title,
        priority,
        dueDate,
      });

      setTitle("");
      setPriority("Medium");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      alert("Failed to add task");
    }
  };

  // delete task
  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  // toggle status
  const toggleStatus = async (id) => {
    await API.patch(`/tasks/${id}/status`);
    fetchTasks();
  };

  // start edit
  const startEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditPriority(task.priority);
  };

  // save edit
  const saveEdit = async (id) => {
    await API.put(`/tasks/${id}`, {
      title: editTitle,
      priority: editPriority,
    });

    setEditingId(null);
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="tasks-container">
      <h2>My Tasks</h2>

      {/* ADD TASK */}
      <form className="task-form" onSubmit={addTask}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          required
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button type="submit">Add</button>
      </form>

      {/* TASK LIST */}
      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          {editingId === task._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <select
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <button onClick={() => saveEdit(task._id)}>💾</button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration:
                    task.status === "Completed" ? "line-through" : "none",
                  color:
                    task.priority === "High"
                      ? "red"
                      : task.priority === "Medium"
                      ? "orange"
                      : "green",
                }}
              >
                {task.title} ({task.priority})
              </span>

              {task.dueDate && (
                <small className="due-date">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </small>
              )}

              <div className="task-actions">
                <button onClick={() => toggleStatus(task._id)}>
                  {task.status === "Pending" ? "✔" : "↩"}
                </button>

                <button onClick={() => startEdit(task)}>✏️</button>

                <button onClick={() => deleteTask(task._id)}>❌</button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tasks;
