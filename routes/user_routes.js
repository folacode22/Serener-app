const express = require("express");
const router = express.Router();
const {
  userLogIn,
  allUser,
  userSignUp,
  findUserByEmail,
  switchAdmin,
} = require("../controller/user_controller");
const { AdminAuth } = require("../middleware/auth");

router.post("/signup", userSignUp);

router.post("/login", userLogIn);

//admin view all register users
router.get("/alluser", AdminAuth, allUser);

//admin can search user by email
router.get("/user/:email", AdminAuth, findUserByEmail);

//
router.put("/admin/:id", switchAdmin);

module.exports = router;
