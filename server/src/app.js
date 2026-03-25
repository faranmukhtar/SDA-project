const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }

  console.log("Listening on Port " + 3000 + "!");
});
