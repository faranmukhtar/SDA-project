const { Router } = require("express");
const retailerRouter = Router();
const retailerController = require("../controllers/retailerController");

retailerRouter.get("/:index", retailerController.getRetailerIndex);

retailerRouter.post("/", retailerController.postRetailer);

retailerRouter.put("/:index", retailerController.putRetailer);

retailerRouter.delete("/:index", retailerController.deleteRetailer);

module.exports = {
  retailerRouter,
};
