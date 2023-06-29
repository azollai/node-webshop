const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAll, add, remove } = require("../controllers/basket-items");

router.route("/").get(getAll).post(add);
router.route("/:basketItemId").post(add).delete(remove);

module.exports = router;
