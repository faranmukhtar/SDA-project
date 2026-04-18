const pool = require("./pool");

async function getCustomer(index) {
  const { rows } = await pool.query(
    "SELECT * FROM Customers WHERE customer_id = $1",
    [index],
  );
  console.log(rows);
}

async function getCustomerPassword(username) {
  const { rows } = await pool.query(
    "SELECT * FROM Customers WHERE username = $1",
    [username],
  );
  console.log(rows);
}

async function insertCustomer({
  name,
  city,
  address,
  phone_number,
  username,
  password,
}) {
  await pool.query(
    "INSERT INTO customers(customer_name, city, address, phone_number, username, password) VALUES ($1, $2, $3, $4, $5, $6)",
    [name, city, address, phone_number, username, password],
  );
}

// Here fields is a javascript object with keys being the fields you want to change and values their new values
// This requires heavy string manipulation.
async function updateCustomer(id, fields) {
  const keys = Object.keys(fields);
  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  const values = Object.values(fields);
  values.push(id);

  const query = `
    UPDATE Customers
    SET ${setClause}
    where customer_id = $${keys.length + 1}
  `;
  await pool.query(query, values);
}

// username or id
async function deleteCustomer(username) {
  const query = `
  DELETE FROM Customers
  WHERE customer_id = $1
  `;
  await pool.query(query, [username]);
}

module.exports = {
  getCustomer,
  getCustomerPassword,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
