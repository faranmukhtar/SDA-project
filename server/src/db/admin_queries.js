const pool = require("./pool");

async function getAdmin(index) {
  const { rows } = await pool.query(
    "Select * FROM ADMINS WHERE admin_id = $1",
    [index],
  );
  console.log(rows);
}

async function insertAdmin({ admin_id, admin_name, username, password }) {
  await pool.query(
    "INSERT INTO ADMINS( admin_name , username , password) VALUES ($1 , $2 , $3 )",
    [admin_name, username, password],
  );
}

async function getAdminPassword(username) {
  const { rows } = await pool.query(
    "Select * FROM ADMINS Where username = $1",
    [username],
  );
  console.log(rows);
}

async function updateAdmin(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `
  Update ADMINS
  SET ${setClause}
  Where admin_id =  $${keys.length + 1}`;
  await pool.query(query, values);
}

async function deleteAdmin(id) {
  const query = `
  DELETE FROM ADMINS where admin_id = $1`;
  await pool.query(query, [id]);
}

module.exports = {
  getAdmin,
  getAdminPassword,
  updateAdmin,
  insertAdmin,
  deleteAdmin,
};
