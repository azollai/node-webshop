const express = require("express");
const router = express.Router();
const { createCheckoutSession } = require("../controllers/payments");

router.route("/create-checkout-session").post(createCheckoutSession);

module.exports = router;
