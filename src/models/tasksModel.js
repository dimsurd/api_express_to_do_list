const dbPool = require("../configs/database");

const getAllTasks = () => {
  const sqlQUery = "SELECT * from tasks";
  return dbPool.execute(sqlQUery);
};

const getTaskByUser = async (id) => {
  const [dataTask] = await dbPool.execute(
    `SELECT * from tasks WHERE id_users=${id}`
  );

  if (dataTask.length === 0) {
    throw new Error("Task not found");
  }

  return dataTask;
};

const createTask = (body) => {
  const sqlQUery = `INSERT INTO tasks (id_users,name,description) VALUE(${body.id_users},'${body.name}','${body.description}')`;
  return dbPool.execute(sqlQUery);
};

const updateTask = async (id, body) => {
  const [existingTask] = await dbPool.execute(
    `SELECT * FROM tasks WHERE id=${id}`
  );

  if (existingTask.length === 0) {
    throw new Error("Task not found");
  }
  try {
    const sqlQUery = `UPDATE tasks SET name='${body.name}',description='${body.description}' WHERE id = ${id}`;
    return dbPool.execute(sqlQUery);
  } catch (err) {
    throw new Error("Task not found");
  }
};

const deleteTask = (id) => {
  const sqlQUery = `DELETE FROM tasks WHERE id = ${id}`;
  return dbPool.execute(sqlQUery);
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskByUser,
};
