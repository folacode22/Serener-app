const express = require("express");
const { addItem, allItem } = require("../controller/item_controller");

const { Auth, AdminAuth } = require("../middleware/auth");

const router = express.Router();

//admin post a new item
router.post("/create", AdminAuth, addItem);

//user can view all item
router.get("/all", Auth, allItem);

module.exports = router;
