const express = require("express");
const router = express.Router();
const userController = require("./UserController.js");
router.get("/me", auth, userController.getUserDetails);

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.get("/me", userController.getUserDetails);

module.exports = router;
