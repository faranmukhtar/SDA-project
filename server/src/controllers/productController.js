const productQueries = require("../db/product_queries");

const getProductIndex = async (req, res) => {
  const { index } = req.params;

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  const indexNumber = Number(index);
  try {
    const result = await productQueries.getProduct(indexNumber);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
};

const getProduct = async (req, res) => {
  const limit = Number(req.query.limit);
  const offset = Number(req.query.offset);

  if ((limit && isNaN(limit)) || (offset && isNaN(offset))) {
    return res.status(400).json({ error: "Limit and Offset must be a number" });
  }

  const inputObj = {};
  if (limit) inputObj.limit = limit;
  if (offset) inputObj.offset = offset;

  try {
    const result = await productQueries.getProducts(inputObj);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

const postProduct = async (req, res) => {
  const fields = [
    "name",
    "price",
    "description",
    "rating",
    "category_id",
    "retailer_id",
    "image_url",
  ];
  for (let field of fields) {
    if (
      req.body[field] === undefined ||
      req.body[field] === null ||
      req.body[field] === ""
    ) {
      return res.status(400).json({ error: `${field} must not be empty` });
    }
  }

  const {
    name,
    price,
    description,
    rating,
    category_id,
    retailer_id,
    image_url,
  } = req.body;

  if (isNaN(price)) {
    return res.status(400).json({ error: "Price must be a number" });
  }

  if (isNaN(rating)) {
    return res.status(400).json({ error: "Rating must be a number" });
  }

  if (Number(rating) > 5 || Number(rating) < 0) {
    return res.status(400).json({ error: "Rating must be between 0 and 5" });
  }

  if (isNaN(category_id)) {
    return res.status(400).json({ error: "Category_id must be a number" });
  }

  if (isNaN(retailer_id)) {
    return res.status(400).json({ error: "Retailer_id must be a number" });
  }

  try {
    const result = await productQueries.insertProduct({
      name,
      price,
      description,
      rating,
      category_id,
      retailer_id,
      image_url,
    });
    res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert Product" });
  }
};

const putProduct = async (req, res) => {
  const index = Number(req.params.index);
  const fields = [
    "name",
    "price",
    "description",
    "rating",
    "category_id",
    "image_url",
  ];

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  const inputObj = {};
  for (let field of fields) {
    if (req.body[field]) {
      inputObj[field] = req.body[field];
    }
  }

  if (inputObj.price && isNaN(inputObj.price)) {
    return res.status(400).json({ error: "Price must be a number" });
  }

  if (inputObj.rating && isNaN(inputObj.rating)) {
    return res.status(400).json({ error: "Rating must be a number" });
  }

  if (inputObj.rating && (inputObj.rating < 0 || inputObj.rating > 5)) {
    return res.status(400).json({ error: "Rating must be between 0 and 5" });
  }

  if (inputObj.category_id && isNaN(inputObj.category_id)) {
    return res.status(400).json({ error: "Category_id must be a number" });
  }

  try {
    const result = await productQueries.updateProduct(index, inputObj);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json("Failed to update product");
  }
};

const deleteProduct = async (req, res) => {
  const { index } = req.params;

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  try {
    await productQueries.deleteProduct(index);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Product" });
  }
};

const getProductSearch = async (req, res) => {
  const { limit, offset } = req.query;

  const fields = ["limit", "offset", "category", "search"];

  if (isNaN(limit) || isNaN(offset)) {
    return res.status(400).json({ error: "Limit and Offset must be a number" });
  }

  let inputObj = {};
  for (let field of fields) {
    if (req.query[field]) {
      inputObj[field] = req.query[field];
    }
  }

  try {
    const result = await productQueries.searchProduct(inputObj);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch products on search request" });
  }
};

module.exports = {
  getProductIndex,
  getProduct,
  postProduct,
  putProduct,
  deleteProduct,
  getProductSearch,
};
