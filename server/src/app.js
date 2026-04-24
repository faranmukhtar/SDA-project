const express = require("express");
const cors = require("cors");

const { indexRouter } = require("./routes/indexRouter");
const { productRouter } = require("./routes/productRouter");
const { orderRouter } = require("./routes/orderRouter");
const { categoryRouter } = require("./routes/categoryRouter");
const { userRouter } = require("./routes/userRouter");
const { authRouter } = require("./routes/authRouter");

const app = express();
const PORT = 3000;

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));

app.use("/", indexRouter);
app.use("/product", productRouter);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/auth", authRouter);

app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(
    `Listening on Port ${PORT}! Navigate to http://localhost:${PORT} to run tests.`,
  );
});
