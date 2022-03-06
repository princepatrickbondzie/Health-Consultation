const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
};

const createCategory = async (req, res) => {};

module.exports = { getCategories, createCategory };
