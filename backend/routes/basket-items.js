const express = require("express");
const router = express.Router({ mergeParams: true });
const { getAll, add, subtract, remove } = require("../controllers/basket-items");

router.route("/").get(getAll).post(add);
router.route("/:basketItemId").delete(remove);
router.route("/:basketItemId/add").post(add);
router.route("/:basketItemId/subtract").post(subtract);

module.exports = router;
