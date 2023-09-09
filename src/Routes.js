const express = require("express");
const router = express.Router();

// AuthMiddleware
const {
  middleware,
  middlewareLevel,
} = require("../src/middlewares/AuthMiddleware");
// End AuthMiddleware

// UserController
const {
  getUsers,
  addUser,
  editProfile,
} = require("../src/controllers/UserController");
router.get("/users", middleware, middlewareLevel(["admin"]), getUsers);
router.post("/add-user", middleware, middlewareLevel(["admin"]), addUser);
router.post("/edit-profile", middleware, editProfile);
// End UserController

// AuthController
const { login, checkToken } = require("../src/controllers/AuthController");
router.post("/login", login);
router.get("/check-token", middleware, checkToken);
// End AuthController

module.exports = router;
