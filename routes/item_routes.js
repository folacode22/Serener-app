const express = require("express");
const {
  addItem,
  allItem,
  selectItem,
} = require("../controller/item_controller");

const { Auth, AdminAuth } = require("../middleware/auth");

const router = express.Router();

//admin post a new item
router.post("/create", AdminAuth, addItem);

//user can view all item
router.get("/all", Auth, allItem);

router.put("/purchase", Auth, selectItem);

module.exports = router;
