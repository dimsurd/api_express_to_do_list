const tasksModel = require("../models/tasksModel");

const getAllTasks = async (req, res) => {
  try {
    const [dataTask] = await tasksModel.getAllTasks();
    res.status(200).json({
      message: "Get all task success",
      data: dataTask,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get all task failed",
      error: err,
    });
  }
};

const getTaskByUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tasksModel.getTaskByUser(id);

    res.status(200).json({
      message: "Get data success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get data failed",
      error: err.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    await tasksModel.createTask(req.body);
    res.status(200).json({
      message: "Create success",
      data: req.body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Create failed",
      error: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const dataTask = await tasksModel.updateTask(id, req.body);

    res.status(200).json({
      message: "Update success",
      data: req.body,
    });
  } catch (err) {
    res.status(500).json({
      message: "Update failed",
      error: err.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    await tasksModel.deleteTask(id);
    res.status(200).json({
      message: "Delete success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Delete failed",
      error: err.message,
    });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskByUser,
};
