const { Router } = require("express");
const orderRouter = Router();
const orderController = require("../controllers/orderController");

orderRouter.get("/:index", orderController.getOrdersIndex);

// for this use query parameters
orderRouter.get("/", orderController.getOrdersByCustomer);

orderRouter.post("/", orderController.postOrder);

orderRouter.put("/:index", orderController.putOrder);

orderRouter.delete("/:index", orderController.deleteOrder);

module.exports = {
  orderRouter,
};
