const { Router } = require("express");
const categoryRouter = Router();
const categoryController = require("../controllers/categoryController");

categoryRouter.get("/", categoryController.getcategory);

module.exports = {
  categoryRouter,
};
