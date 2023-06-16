const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  updateUsername,
  deleteUser,
  forgotPassword,
  loginUser,
  getUserById,
} = require("../controllers/usersController");

router.get("/", getAllUsers);
router.get("/:id", getUserById);

router.post("/", createUser);
router.post("/login", loginUser);

router.put("/:id", updateUsername);
router.put("/forgot_password/:id", forgotPassword);

router.delete("/:id", deleteUser);

module.exports = router;
