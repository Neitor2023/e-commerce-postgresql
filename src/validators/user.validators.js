// check --> verificar/ revisar / chequear / validar
const { check } = require("express-validator");
const validateResult = require("../utils/validate");

const createUserValidator = [
  check("username", "Error con el campo username")
    .exists()
    .withMessage("Username es obligatorio")
    .notEmpty()
    .withMessage("Username no debe estar vacio")
    .isString()
    .withMessage("El tipo de dato debe ser string")
    .isLength({ min: 6, max: 30 })
    .withMessage("El username debe tener minimo 6 caracteres y máximo 30"),
  check("email", "Error con el campo email")
    .exists()
    .withMessage("email es obligatorio")
    .notEmpty()
    .withMessage("email no puede estar vacio")
    .isString()
    .withMessage("email debe ser un string")
    .isEmail()
    .withMessage("email no tiene formato de correo")
    .isLength()
    .withMessage("El email debe tener minimo 10 caracteres y máximo 50"),
  check("password", "Error con el password")
    .exists()
    .withMessage("password es obligatorio")
    .notEmpty()
    .withMessage("password no puede estar vacio")
    .isString()
    .withMessage("El password debe ser un string")
    .isLength({ min: 4 })
    .withMessage("El password debe tener minimo 8 caracteres"),
  validateResult,
];

const loginUserValidator = [
  check("email", "Error con el campo email")
    .exists()
    .notEmpty()
    .isEmail()
    .isLength({ min: 10, max: 50 }),
  check("password", "Error con el campo password")
    .exists()
    .notEmpty()
    .isString()
    .isLength({ min: 4 }),
  validateResult,
];

const usernameAvatarValidator = [
  check("username", "Error con el campo username")
    .exists()
    .withMessage("Username es obligatorio")
    .notEmpty()
    .withMessage("Username no debe estar vacio")
    .isString()
    .withMessage("El tipo de dato debe ser string")
    .isLength({ min: 6, max: 30 })
    .withMessage("El username debe tener minimo 6 caracteres y máximo 30"),
  check("avatar", "Error con el campo avatar")
    .exists()
    .notEmpty(),
  validateResult,
];
module.exports = { createUserValidator, loginUserValidator, usernameAvatarValidator };
