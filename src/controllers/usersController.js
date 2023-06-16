const usersModel = require("../models/usersModel");

const getAllUsers = async (req, res) => {
  try {
    const [dataUser] = await usersModel.getAllUser();

    res.status(200).json({
      message: "Get all user success",
      data: dataUser,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get all user failed",
      error: err,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usersModel.getUserById(id);

    res.status(200).json({
      message: "Get user success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Get user failed",
      error: err.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    await usersModel.createUser(req.body);

    res.status(201).json({
      message: "Create user success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Create user failed",
      error: err.message,
    });
  }
};

const updateUsername = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.updateUser(id, req.body);

    res.status(201).json({
      message: "Update user success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Update user failed",
      error: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { id } = req.params;
    await usersModel.forgotPassword(id, req.body);

    res.status(200).json({
      message: "Forgot password success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Forgot password failed",
      error: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    await usersModel.loginUser(req.body);
    res.status(200).json({
      message: "Login success",
    });
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
      error: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await usersModel.deleteUser(id);
  try {
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
  getAllUsers,
  createUser,
  updateUsername,
  deleteUser,
  forgotPassword,
  loginUser,
  getUserById,
};
