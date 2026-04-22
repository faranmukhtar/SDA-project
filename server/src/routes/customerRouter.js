const { Router } = require("express");
const customerRouter = Router();
const customerController = require("../controllers/customerController");

customerRouter.get("/:index", customerController.getCustomerIndex);

customerRouter.post("/", customerController.postCustomer);

customerRouter.put("/:index", customerController.putCustomer);

customerRouter.delete("/:index", customerController.deleteCustomer);

module.exports = {
  customerRouter,
};
