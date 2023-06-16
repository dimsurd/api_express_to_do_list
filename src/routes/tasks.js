const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskByUser,
} = require("../controllers/tasksController");

router.get("/", getAllTasks);
router.get("/user/:id", getTaskByUser);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
