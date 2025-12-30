const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  deleteTask,
  updateTaskStatus,
  updateTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");

router.route("/")
  .get(protect, getTasks)
  .post(protect, createTask);

router.put("/:id", protect, updateTask);
router.patch("/:id/status", protect, updateTaskStatus);
router.delete("/:id", protect, deleteTask);

module.exports = router;
