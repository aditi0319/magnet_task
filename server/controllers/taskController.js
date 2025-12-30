const Task = require("../models/Task");

// GET TASKS
const getTasks = async (req, res) => {
  const tasks = await Task.find({ assignedTo: req.user._id });
  res.json(tasks);
};

// CREATE TASK
const createTask = async (req, res) => {
  const { title, priority, dueDate } = req.body;

  const task = await Task.create({
    title,
    priority,
    dueDate: dueDate || null,
    assignedTo: req.user._id,
  });

  res.status(201).json(task);
};

// DELETE TASK
const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

// TOGGLE STATUS
const updateTaskStatus = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.status = task.status === "Pending" ? "Completed" : "Pending";
  await task.save();
  res.json(task);
};

// EDIT TASK
const updateTask = async (req, res) => {
  const { title, priority, dueDate } = req.body;

  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = title || task.title;
  task.priority = priority || task.priority;
  task.dueDate = dueDate || task.dueDate;

  const updatedTask = await task.save();
  res.json(updatedTask);
};

// EXPORTS (DO NOT TOUCH)
module.exports = {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
};
