require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5002;
const printLog = require("./middlewares/logs");
const usersRoute = require("./routes/users");

app.listen(PORT, () => {
  console.log(`Server starting at ${PORT}`);
});
app.use(express.json());
app.use(printLog);

app.use("/users", usersRoute);
