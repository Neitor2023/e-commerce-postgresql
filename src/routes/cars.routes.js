const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
const { addCar, findAllCars } = require("../controllers/cars.controllers");

const router = Router();

router.post("/car/:userId", authenticate, addCar);
router.get("/car/All/:userId", findAllCars);

module.exports = router;
