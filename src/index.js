require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;
const printLog = require("./middlewares/logs");
const usersRoute = require("./routes/users");
const tasksRouter = require("./routes/tasks");

app.listen(PORT, () => {
  console.log(`Server starting at ${PORT}`);
});
app.use(express.json());

app.use("/users", usersRoute);
app.use("/tasks", tasksRouter);

app.use(printLog);
