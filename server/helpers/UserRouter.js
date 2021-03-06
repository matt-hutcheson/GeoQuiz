const express = require("express");
const router = express.Router();
const userController = require("./UserController.js");
const auth = require("./auth.js")
router.get("/me", auth, userController.getUserDetails);
router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/me/update", auth, userController.updateUserDetails);
router.post("/me/update/results", auth, userController.updateUserResults);
router.delete("/me/delete", auth, userController.deleteUser);
router.post("/me/token", userController.refreshToken);
router.post("/me/logout", auth, userController.logoutUser);

module.exports = router;
