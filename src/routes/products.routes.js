const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const { createProductsValidator, descriptionValidator, availableQtyValidator } = require("../validators/products.validators");
const { 
  createProduct, 
  updateDescriptionProduct,
  updateAvailableQtyProduct,
  getProductsZero, 
  getProductsOne
} = require("../controllers/products.controllers");

const router = Router();

router.post("/products", authenticate, createProductsValidator, createProduct);
router.get("/products/zero", getProductsZero);
router.get("/products/one", getProductsOne);
router.put("/products/description/:id", authenticate, descriptionValidator, updateDescriptionProduct);
router.put("/products/availableqty/:id", authenticate, availableQtyValidator, updateAvailableQtyProduct);
module.exports = router;
