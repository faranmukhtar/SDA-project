const userQueries = require("../db/user_queries");
const bcrypt = require("bcryptjs");

const getUsers = async (req, res) => {
  try {
    const result = await userQueries.getUsers();
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserIndex = async (req, res) => {
  const { index } = req.params;

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  try {
    const result = await userQueries.getUser(index);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const putUser = async (req, res) => {
  const { index } = req.params;

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  const fields = ["password", "name", "city", "address"];

  const inputObj = {};
  let hashedPassword;
  if (req.body.password) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  }

  for (let field of fields) {
    if (req.body[field]) {
      inputObj[field] = field === "password" ? hashedPassword : req.body[field];
    }
  }

  try {
    const result = await userQueries.updateUser(index, inputObj);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  const { index } = req.params;

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  try {
    await userQueries.deleteUser(index);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

const getAdmin = async (req, res) => {
  try {
    const result = await userQueries.getUserByRole("admin");
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch admins" });
  }
};

const getCustomer = async (req, res) => {
  try {
    const result = await userQueries.getUserByRole("customer");
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
};

const getRetailer = async (req, res) => {
  try {
    const result = await userQueries.getUserByRole("retailer");
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch retailers" });
  }
};

module.exports = {
  getUserIndex,
  getUsers,
  putUser,
  deleteUser,
  getAdmin,
  getCustomer,
  getRetailer,
};
