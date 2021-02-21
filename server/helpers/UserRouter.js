const express = require("express");
const router = express.Router();
const userController = require("./UserController.js");
const auth = require("./auth.js")
router.get("/me", auth, userController.getUserDetails);
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/me/update", auth, userController.updateUserDetails);

module.exports = router;
