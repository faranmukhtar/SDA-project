const express = require("express");
const { indexRouter } = require("./routes/indexRouter");
const { productRouter } = require("./routes/productRouter");
const { adminRouter } = require("./routes/adminRouter");
const { orderRouter } = require("./routes/orderRouter");
const { customerRouter } = require("./routes/customerRouter");
const { retailerRouter } = require("./routes/retailerRouter");

const app = express();
const PORT = 3000;

app.use("/", indexRouter);
app.use("/product", productRouter);
app.use("/admin", adminRouter);
app.use("/order", orderRouter);
app.use("/customer", customerRouter);
app.use("/retailer", retailerRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Listening on Port ${PORT}! Navigate to http://localhost:${PORT} to run tests.`);
});