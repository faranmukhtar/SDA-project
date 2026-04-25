const categoryQueries = require("../db/category_queries");

const getCategories = async (req, res) => {
  try {
    const rows = await categoryQueries.getAllCategories();
    res.status(200).json({ rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
};

const getCategoryIndex = async (req, res) => {
  try {
    const { index } = req.params;

    if (isNaN(index)) {
      return res.status(400).json({ error: "Index must be a number" });
    }

    const numberIndex = Number(index);

    const result = await categoryQueries.getCategory(numberIndex);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch category" });
  }
};

const postCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name must not be empty" });
  }

  try {
    const result = await categoryQueries.insertCategory({
      category_name: name,
    });
    res.status(201).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to post category" });
  }
};

const deleteCategory = async (req, res) => {
  const { index } = req.params;

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  let numberIndex = Number(index);

  try {
    await categoryQueries.deleteCategory(numberIndex);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete category" });
  }
};

const putCategory = async (req, res) => {
  const { index } = req.params;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name must not be empty" });
  }

  if (isNaN(index)) {
    return res.status(400).json({ error: "Index must be a number" });
  }

  let numberIndex = Number(index);

  try {
    const result = await categoryQueries.updateCategory(numberIndex, {
      category_name: name,
    });
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update category" });
  }
};

module.exports = {
  getCategories,
  getCategoryIndex,
  postCategory,
  deleteCategory,
  putCategory,
};
