const pool = require("./pool");

//keep in mind that SELECT queries are going to be expensive so instead limit them to a small number
//Also products are dependent upon the page that the user is on which is the offset variable

async function getProducts({ limit, offset }) {
  let query = "SELECT * FROM Products";
  let count = 1;
  let arr = [];
  if (limit) {
    query = query.concat(` LIMIT $${count}`);
    arr.push(limit);
    count++;
  }

  if (offset) {
    query = query.concat(` OFFSET $${count}`);
    arr.push(offset);
  }

  const { rows } = await pool.query(query, arr);
  return rows;
}

async function getProduct(id) {
  const { rows } = await pool.query(
    "SELECT * FROM Products WHERE product_id = $1",
    [id],
  );
  return rows[0];
}

async function insertProduct({
  name,
  price,
  description,
  rating,
  category_id,
  retailer_id,
  image_url,
}) {
  const { rows } = await pool.query(
    "INSERT INTO Products(product_name, price, description, rating, category_id, retailer_id, image_url) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [name, price, description, rating, category_id, retailer_id, image_url],
  );

  return rows[0];
}

//ILIKE is case insensitive
async function searchProduct({ search, category, limit, offset }) {
  let query = "SELECT * FROM Products";
  let inputArr = [];
  let count = 1;
  if (category && search) {
    query = query.concat(
      ` WHERE (product_name ILIKE $${count} OR description ILIKE $${count}) AND category_id = $${count + 1}`,
    );
    inputArr.push(`%${search}%`, category);
    count += 2;
  } else if (category) {
    query = query.concat(` WHERE category_id = $${count}`);
    inputArr.push(category);
    count++;
  } else if (search) {
    query = query.concat(
      ` WHERE product_name ILIKE $${count} OR description ILIKE $${count}`,
    );
    inputArr.push(`%${search}%`);
    count++;
  }

  if (limit) {
    query = query.concat(` LIMIT $${count}`);
    inputArr.push(limit);
    count++;
  }

  if (offset) {
    query = query.concat(` OFFSET $${count}`);
    inputArr.push(offset);
  }

  const { rows } = await pool.query(query, inputArr);
  return rows;
}

async function updateProduct(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `UPDATE Products SET ${setClause} WHERE product_id = $${keys.length + 1} RETURNING *`;
  const { rows } = await pool.query(query, values);
  return rows[0];
}

async function deleteProduct(index) {
  const query = `DELETE FROM Products WHERE product_id = $1`;
  const { rowCount } = await pool.query(query, [index]);
  return rowCount > 0;
}

module.exports = {
  getProducts,
  insertProduct,
  getProduct,
  updateProduct,
  searchProduct,
  deleteProduct,
};
