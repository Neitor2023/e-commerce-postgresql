const { Router } = require("express");
const authenticate = require("../middlewares/auth.middleware");
// const { createAnswerValidator } = require("../validators/answer.validators");
const { addOrders, findAllOrders, buyOrders } = require("../controllers/orders.controllers");

const router = Router();

router.post("/order/:userId", authenticate, addOrders);
router.post("/order/buy/:userId", authenticate, buyOrders);
router.get("/order/All/:userId", findAllOrders);

module.exports = router;
