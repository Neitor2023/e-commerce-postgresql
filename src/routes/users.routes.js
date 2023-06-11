// Router de express
const { Router } = require("express");
const {
  createUser,
  login,
  validateEmail,
  updateUser,
  getUserAll,
} = require("../controllers/users.controlles");
const {
  createUserValidator,
  loginUserValidator,
  usernameAvatarValidator,
} = require("../validators/user.validators");

const router = Router();

router.post("/users", createUserValidator, createUser);
router.post("/users/login", loginUserValidator, login);
router.post("/users/email-validate", validateEmail);
router.put("/user/:id", usernameAvatarValidator, updateUser);
router.get("/users", getUserAll);

module.exports = router;
