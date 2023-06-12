const { check } = require("express-validator");
const validateResults = require("../utils/validate");

const createProductsValidator = [
  check("name", "Errores en name")
    .exists()
    .withMessage("No se esta enviando name")
    .notEmpty()
    .withMessage("El nombre del producto no puede estar vacio")
    .isString()
    .withMessage("El nombre del producto debe ser un texto")
    .isLength({ min: 7, max: 50 })
    .withMessage(
      "El nombre del producto debe ser min de 7 caracteres y max de 50"
    ),
  check("description", "errores en la descripción")
    .exists()
    .withMessage("No se esta enviando la descripción del producto")
    .notEmpty()
    .withMessage("La descripción no puede esta vacia")
    .isString()
    .withMessage("La descripción debe ser un texto")
    .isLength({ min: 10 })
    .withMessage("La descripción debe tener minimo 10 caracteres"),
  check("price", "Errores en price")
    .exists()
    .withMessage("No se esta enviando price")
    .notEmpty()
    .withMessage("El precio del producto no puede estar vacio")
    .isNumeric()
    .withMessage("El precio del producto debe ser un numero"),
  check("availableQty", "Errores en price")
    .isNumeric()
    .withMessage("El precio del producto debe ser un numero"),
  check("productImage", "Errores en imagen del producto")
    .exists()
    .withMessage("No se esta enviando imagen del producto")
    .notEmpty()
    .withMessage("La imagen del producto no puede estar vacia")
    .isString()
    .withMessage("La imagen del producto debe ser un String"),
  validateResults,
];

const availableQtyValidator = [
  check("availableQty", "Errores en price")
    .isNumeric()
    .withMessage("El precio del producto debe ser un numero"),
  validateResults,
];

const descriptionValidator = [
check("description", "errores en la descripción")
  .exists()
  .withMessage("No se esta enviando la descripción del producto")
  .notEmpty()
  .withMessage("La descripción no puede esta vacia")
  .isString()
  .withMessage("La descripción debe ser un texto")
  .isLength({ min: 10 })
  .withMessage("La descripción debe tener minimo 10 caracteres"),
validateResults,
];

module.exports = {
  createProductsValidator,
  descriptionValidator,
  availableQtyValidator,
};
