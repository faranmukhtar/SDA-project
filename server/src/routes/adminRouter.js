const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");

adminRouter.get("/:index", adminController.getAdminIndex);

adminRouter.post("/", adminController.postAdmin);

adminRouter.put("/:index", adminController.putAdmin);

adminRouter.delete("/:index", adminController.deleteAdmin);

module.exports = {
  adminRouter,
};
