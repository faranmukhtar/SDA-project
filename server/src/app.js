const express = require("express");

// Import User Queries
const {
  getuser,
  getuserPassword,
  insertuser,
  updateuser,
  deleteuser,
} = require("./db/user_queries"); 

// Import Role Queries
const {
  insertrole,
  getrolename,
  updaterole,
  deleterole,
} = require("./db/roles_queries");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  try {
    let results = [];
    await insertrole("Admin");
    results.push("1. Role 'Admin' inserted");
    
    await insertrole("Customer");
    results.push("2. Role 'Customer' inserted");

    const testRoleId = 1;
    await getrolename(testRoleId);
    results.push("3. Role fetched by ID (check terminal console)");

    await updaterole(2, { role_name: "Super Customer" });
    results.push("4. Role updated");

    await insertuser({
      name: "Test User One",
      city: "Karachi",
      address: "123 Main St",
      phone_number: "1111111111",
      username: "user_one",
      password: "passwordOne",
      role_id: 1 // <-- UPDATED to match your user_queries.js
    });
    results.push("5. First user inserted");

    await insertuser({
      name: "Test User Two",
      city: "Lahore",
      address: "456 Iqbal Town",
      phone_number: "2222222222",
      username: "user_two",
      password: "passwordTwo",
      role_id: 2 // <-- UPDATED to match your user_queries.js
    });
    results.push("6. Second user inserted");

    const testUserId = 1;
    await getuser(testUserId);
    results.push("7. User 1 fetched by ID (check terminal console)");

    await getuserPassword("user_two");
    results.push("8. User 2 fetched by username (check terminal console)");

    await updateuser(2, { city: "Peshawar", phone_number: "0987654321" });
    results.push("9. User 2 updated");

    await deleteuser(testUserId);
    results.push("10. User 1 deleted");

    await deleterole(testRoleId);
    results.push("11. Role 1 deleted");

    res.send(results.join(" <br><br> "));
  } catch (err) {
    console.error("Test Route Error:", err);
    res.status(500).send("Error: " + err.message);
  }
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on Port ${PORT}! Navigate to http://localhost:${PORT} to run tests.`);
});