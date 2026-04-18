const express = require("express");

const {
  insertCustomer,
  updateCustomer,
  getCustomer,
  deleteCustomer,
} = require("./db/customer_queries");

const {
  insertAdmin,
  updateAdmin,
  getAdmin,
  deleteAdmin,
} = require("./db/admin_queries");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    let results = [];

    // 🔹 Update Customer
    await updateCustomer(1, { city: "Lahore" });
    results.push("Customer updated");

    // 🔹 Get Customer
    await getCustomer(1);
    results.push("Customer fetched (check console)");

    // 🔹 Insert Admin
    await insertAdmin({
      admin_name: "Faran",
      username: "faran_test",
      password: "pass",
    });
    results.push("Admin inserted");

    // 🔹 Update Admin
    await updateAdmin(1, { admin_name: "UpdatedAdmin" });
    results.push("Admin updated");

    // 🔹 Get Admin
    await getAdmin(1);
    results.push("Admin fetched (check console)");

    // 🔹 Delete Admin
    await deleteAdmin(1);
    results.push("Admin deleted");

    // 🔹 Delete Customer
    await deleteCustomer(1);
    results.push("Customer deleted");

    res.send(results.join(" | "));
  } catch (err) {
    console.error(err);
    res.send(err.message);
  }
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("Listening on Port " + 3000 + "!");
});
