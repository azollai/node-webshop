const express = require("express");
const router = express.Router();
const { getProducts, createProducts } = require("../controllers/products");

router.route("/").get(getProducts).post(createProducts);

module.exports = router;
