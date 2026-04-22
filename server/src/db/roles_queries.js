const pool = require("./pool");

async function insertrole(role_name) {
  await pool.query("INSERT INTO roles (role_name) VALUES ($1)", [role_name]);
}

async function getrolename(role_id) {
  const { rows } = await pool.query("SELECT * FROM roles WHERE role_id = $1", [
    role_id,
  ]);
  console.log(rows);
}

async function updaterole(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `
    UPDATE roles
    SET ${setClause}
    where role_id = $${keys.length + 1}
  `;
  await pool.query(query, values);
}

// rolename or id
async function deleterole(role_id) {
  const query = `
  DELETE FROM roles
  WHERE role_id = $1
  `;
  await pool.query(query, [role_id]);
}

module.exports = {
  insertrole,
  getrolename,
  deleterole,
  updaterole,
};
