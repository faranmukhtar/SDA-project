const pool = require("./pool");

async function insertRole(role_name) {
  const { rows } = await pool.query(
    "INSERT INTO roles (role_name) VALUES ($1) RETURNING *",
    [role_name],
  );
  return rows[0];
}

async function getRole(role_id) {
  const { rows } = await pool.query("SELECT * FROM roles WHERE role_id = $1", [
    role_id,
  ]);
  return rows[0];
}

async function updateRole(id, fields) {
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
    RETURNING *
  `;
  const rows = await pool.query(query, values);
  return rows[0];
}

// rolename or id
async function deleteRole(role_id) {
  const query = `
  DELETE FROM roles
  WHERE role_id = $1
  `;
  const { rowCount } = await pool.query(query, [role_id]);
  return rowCount > 0;
}

module.exports = {
  insertRole,
  getRole,
  deleteRole,
  updateRole,
};
