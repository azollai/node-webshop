const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAll, create, remove } = require("../controllers/basket-items");

router.route("/").get(getAll).post(create);
router.route("/:basketItemId").delete(remove);

module.exports = router;
