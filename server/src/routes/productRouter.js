const { Router } = require("express");
const productRouter = Router();
const productController = require("../controllers/productController");

productRouter.get("/:index", productController.getProductIndex);

productRouter.get("/", productController.getProduct);

productRouter.post("/", productController.postProduct);

productRouter.put("/:index", productController.putProduct);

productRouter.delete("/:index", productController.deleteProduct);

productRouter.get("/search", productController.getProductSearch);

module.exports = {
  productRouter,
};
