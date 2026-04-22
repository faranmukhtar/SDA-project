const pool = require("./pool");

async function getuser(index) {
  const { rows } = await pool.query(
    "SELECT * FROM Users WHERE User_id = $1",
    [index],
  );
  console.log(rows);
}

async function getuserPassword(username) {
  const { rows } = await pool.query(
    "SELECT * FROM Users WHERE username = $1",
    [username],
  );
  console.log(rows);
}

async function insertuser({
  name,
  city,
  address,
  phone_number,
  username,
  password,
  role_id
}) {
  await pool.query(
    "INSERT INTO Users(Name , city , Address , Phone_number , username , Password , role_id ) VALUES ($1, $2, $3, $4, $5, $6 , $7)",
    [name, city, address, phone_number, username, password , role_id],
  );
}

// Here fields is a javascript object with keys being the fields you want to change and values their new values
// This requires heavy string manipulation.
async function updateuser(id, fields) {
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
  `;
  await pool.query(query, values);
}

// username or id
async function deleteuser(username) {
  const query = `
  DELETE FROM Users
  WHERE username = $1
  `;
  await pool.query(query, [username]);
}

module.exports = {
  getuser,
  getuserPassword,
  insertuser,
  updateuser,
  deleteuser,
};
