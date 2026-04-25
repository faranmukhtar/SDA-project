const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM Product_Category");
  return rows[0];
}

async function getCategory(index) {
  const { rows } = await pool.query(
    "SELECT * FROM product_category WHERE category_id = $1",
    [index],
  );
  return rows[0];
}

async function insertCategory({ category_name }) {
  const { rows } = await pool.query(
    "INSERT INTO Product_Category(category_name) VALUES ($1)",
    [category_name],
  );
  return rows[0];
}

async function updateCategory(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `
    UPDATE Product_Category
    SET ${setClause}
    WHERE category_id = $${keys.length + 1}
  `;
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function deleteCategory(id) {
  const query = `
  DELETE FROM Product_Category
  WHERE category_id = $1
  `;
  const { rowCount } = await pool.query(query, [id]);
  return rowCount > 0;
}

module.exports = {
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
};
