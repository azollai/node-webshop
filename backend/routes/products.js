const express = require("express");
const router = express.Router();
const { getAll, create } = require("../controllers/products");
const basketItemRouter = require("./basket-items");

router.use("/:productId/basket-items", basketItemRouter);

router.route("/").get(getAll).post(create);

module.exports = router;
