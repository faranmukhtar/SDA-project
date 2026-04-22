const pool = require("./pool");

async function getAllCategories() {
  const { rows } = await pool.query("SELECT * FROM Product_Category");
  return rows;
}

async function insertCategory({ category_id, category_name }) {
  await pool.query(
    "INSERT INTO Product_Category(category_id, category_name) VALUES ($1, $2)",
    [category_id, category_name],
  );
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
  await pool.query(query, values);
}

async function deleteCategory(id) {
  const query = `
  DELETE FROM Product_Category
  WHERE category_id = $1
  `;
  await pool.query(query, [id]);
}

module.exports = {
  insertCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
};
