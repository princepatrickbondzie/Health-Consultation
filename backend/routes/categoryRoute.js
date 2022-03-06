const router = require("express").Router();
const {
  getCategories,
  getCategory,
  updateCategory,
  createCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");

router.get("/categories", getCategories);
router.get("/category/:id", getCategory);
router.post("/category", createCategory);
router.patch("/category/:id", updateCategory);
router.delete("/category/:id", deleteCategory);

module.exports = router;
