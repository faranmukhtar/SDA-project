const pool = require("./pool");

async function getOrdersByCustomer(index) {
  try {
    const query = `SELECT * FROM \`Order\` WHERE CustomerID = ?`;
    const [rows] = await pool.query(query, [index]);
    return rows;
  } catch (error) {
    console.error("Error fetching orders by customer:", error);
    throw error;
  }
}

async function getOrdersByIndex(index) {
  try {
    const query = `
      SELECT o.OrderID, o.CustomerID, o.Order_date, o.Delivery_date,
             od.Product_ID, od.Quantity, od.Price as Detail_Price
      FROM \`Order\` o
      LEFT JOIN Order_details od ON o.OrderID = od.Order_ID
      WHERE o.OrderID = ?
    `;
    const [rows] = await pool.query(query, [index]);
    return rows;
  } catch (error) {
    console.error("Error fetching order by index:", error);
    throw error;
  }
}

async function insertOrder({ customerID, order_date, delivery_date }) {
  await pool.query(
    'INSERT INTO "Order" (CustomerID, Order_date, Delivery_date) VALUES ($1, $2, $3)',
    [customerID, order_date, delivery_date]
  );
}

async function updateOrder(id, fields) {
  const keys = Object.keys(fields);
  
  if (keys.length === 0) return; 

  const setString = keys.map((key, index) => `"${key}" = $${index + 1}`).join(", ");
  const values = Object.values(fields);
  values.push(id); 
  
  const query = `UPDATE "Order" SET ${setString} WHERE OrderID = $${values.length}`;
  
  await pool.query(query, values);
}

async function deleteOrder(id) {
  await pool.query('DELETE FROM "Order" WHERE OrderID = $1', [id]);
}

module.exports = {
  insertOrder,
  getOrdersByCustomer,
  getOrdersByIndex,
  updateOrder,
  deleteOrder,
};
