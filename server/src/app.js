const express = require("express");
const app = express();
const PORT = 3000;
const queries = require("./db/customer_queries");

app.get("/", (req, res) => {
  res.send("Hello world");

  queries.getCustomer(1);
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("Listening on Port " + 3000 + "!");
});
