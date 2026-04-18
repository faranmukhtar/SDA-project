const pool = require("./pool");

async function getRetailer(name) {
  const { rows } = await pool.query(
    "SELECT * FROM Retailers WHERE retailer_name = $1",
    [name],
  );
  console.log(rows);
}

async function insertRetailer({ name, phone, username, password }) {
  await pool.query(
    "INSERT INTO Retailers(retailer_name, phone_number, username, password) VALUES($1, $2, $3, $4)",
    [name, phone, username, password],
  );
}

async function getRetailerPassword(username) {
  const { rows } = await pool.query(
    "SELECT password FROM Retailers WHERE username = $1",
    [username],
  );
  console.log(rows);
}

async function updateRetailer(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `UPDATE Retailers SET ${setClause} WHERE retailer_id = $${keys.length + 1}`;
  await pool.query(query, values);
}

async function deleteRetailer(username) {
  const query = `DELETE FROM Retailers WHERE username = $1`;
  await pool.query(query, [username]);
}

module.exports = {
  insertRetailer,
  updateRetailer,
  deleteRetailer,
  getRetailer,
  getRetailerPassword,
};
