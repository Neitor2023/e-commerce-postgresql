const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const { createProductsValidator, descriptionValidator } = require("../validators/products.validators");
const { createProduct, updateDescriptionProduct, getProductsZero} = require("../controllers/products.controllers");

const router = Router();

router.post("/products", authenticate, createProductsValidator, createProduct);
router.get("/products/zero", getProductsZero);
router.put("/products/:id", authenticate, descriptionValidator, updateDescriptionProduct);
module.exports = router;
