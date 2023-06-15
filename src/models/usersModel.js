const dbPool = require("../configs/database");
const bcrypt = require("bcrypt");

const getAllUser = () => {
  const sqlQuery = "SELECT * from users";
  return dbPool.execute(sqlQuery);
};

const createUser = async (body) => {
  const { username, password } = body;

  const [existingUser] = await dbPool.execute(
    `SELECT * from users WHERE username = '${username}' `
  );

  if (existingUser.length > 0) {
    throw new Error("Username already taken");
  }

  try {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        throw new Error("Error occurred during password hashing");
      } else {
        const sqlQuery = `INSERT INTO users (username,password) VALUE('${username}','${hash}')`;
        return dbPool.execute(sqlQuery);
      }
    });
  } catch (err) {
    throw new Error("Oops something went wrong");
  }
};

const updateUser = async (id, body) => {
  const { username } = body;

  const [existingUser] = await dbPool.execute(
    `SELECT * from users WHERE username = '${username}' AND id <> ${id} `
  );

  if (existingUser.length > 0) {
    throw new Error("Username already taken");
  }

  try {
    const sqlQuery = `UPDATE users SET username ='${username}' WHERE id = ${id} `;
    return dbPool.execute(sqlQuery);
  } catch (err) {
    throw new Error("Oops something went wrong");
  }
};

const forgotPassword = async (id, body) => {
  const { password, newPassword } = body;

  const [dataUser] = await dbPool.execute(
    `SELECT * FROM users WHERE id = ${id}`
  );

  if (dataUser.length <= 0) {
    throw new Error("Invalid Password");
  }

  const storedHashedPassword = dataUser[0].password;
  const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 10);
  const sqlQuery = `UPDATE users SET password = '${hashedNewPassword}' WHERE id = ${id}`;
  return dbPool.execute(sqlQuery);
};

const loginUser = async (body) => {
  const { username, password } = body;

  const [dataUser] = await dbPool.execute(
    `SELECT * FROM users WHERE username='${username}'`
  );

  if (dataUser.length <= 0) {
    throw new Error("Wrong username");
  }

  const storedHashedPassword = dataUser[0].password;
  const isPasswordValid = await bcrypt.compare(password, storedHashedPassword);

  if (!isPasswordValid) {
    throw new Error("Invalid Password");
  }

  return { message: "Successful login" };
};

const deleteUser = (id) => {
  const sqlQuery = `DELETE FROM users WHERE id = ${id}`;
  return dbPool.execute(sqlQuery);
};

module.exports = {
  getAllUser,
  createUser,
  updateUser,
  forgotPassword,
  loginUser,
  deleteUser,
};
