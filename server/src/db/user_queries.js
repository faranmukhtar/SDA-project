const pool = require("./pool");

async function getUser(index) {
  const { rows } = await pool.query("SELECT * FROM Users WHERE User_id = $1", [
    index,
  ]);
  return rows[0];
}

async function getUsers() {
  const { rows } = await pool.query("SELECT * FROM Users");
  return rows;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM Users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function getUserByRole(role) {
  const { rows } = await pool.query(
    `SELECT Users.* FROM Users
     JOIN roles ON Users.role_id = roles.role_id
     WHERE roles.role_name = $1`,
    [role],
  );
  return rows;
}

async function insertUser({
  name,
  city,
  address,
  phone_number,
  username,
  password,
  role_id,
}) {
  const { rows } = await pool.query(
    `INSERT INTO 
    Users(Name , city , Address , Phone_number , username , Password , role_id ) 
    VALUES ($1, $2, $3, $4, $5, $6 , $7)
    RETURNING *`,
    [name, city, address, phone_number, username, password, role_id],
  );

  return rows[0];
}

// Here fields is a javascript object with keys being the fields you want to change and values their new values
// This requires heavy string manipulation.
async function updateUser(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `
    UPDATE Users
    SET ${setClause}
    where User_id = $${keys.length + 1}
    RETURNING *
  `;
  const { rows } = await pool.query(query, values);
  return rows[0];
}

// username or id
async function deleteUser(index) {
  const query = `
  DELETE FROM Users
  WHERE user_id = $1
  `;
  const { rowCount } = await pool.query(query, [index]);

  return rowCount > 0;
}

module.exports = {
  getUser,
  getUsers,
  getUserByUsername,
  getUserByRole,
  insertUser,
  updateUser,
  deleteUser,
};
