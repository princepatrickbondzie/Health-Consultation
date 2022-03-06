const Category = require("../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
};

const getCategory = async (req, res) => {
  const category = await Category.findById(req.params.id);
  res.status(200).json({ category });
};

const createCategory = async (req, res) => {
  const category = await Category.create({ name: req.body.name });
  res.status(201).json({ status: "success", data: category });
};

const updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json({ category });
};

const deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Category deleted.." });
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
