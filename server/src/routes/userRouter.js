const { Router } = require("express");
const userRouter = Router();
const userController = require("../controllers/userController");

userRouter.get("/:index", userController.getUserIndex);

userRouter.post("/", userController.postUser);

userRouter.put("/:index", userController.putUser);

userRouter.delete("/:index", userController.deleteUser);

userRouter.get("/admin", userController.getAdmin);

userRouter.get("/User", userController.getCustomer);

userRouter.get("/retailer", userController.getRetailer);

module.exports = {
  userRouter,
};
