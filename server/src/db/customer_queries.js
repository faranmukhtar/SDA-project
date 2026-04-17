const pool = require("./pool");

async function getCustomer(index) {
  const { rows } = await pool.query(
    "SELECT * FROM Customers WHERE customer_id = $1",
    [index],
  );
  console.log(rows);
}

async function getCustomerPassword(username) {}

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
async function updateCustomer(id, fields) {}

// username or id
async function deleteCustomer(username) {}

module.exports = {
  getCustomer,
  getCustomerPassword,
  insertCustomer,
  updateCustomer,
  deleteCustomer,
};
