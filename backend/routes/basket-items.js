const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAll, create } = require("../controllers/basket-items");

router.route("/").get(getAll).post(create);

module.exports = router;
