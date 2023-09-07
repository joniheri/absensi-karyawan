const express = require("express");
const router = express.Router();

// AuthMiddleware
const { middleware } = require("../src/middlewares/AuthMiddleware");
// End AuthMiddleware

// UserController
const { getUsers, addUser } = require("../src/controllers/UserController");
router.get("/users", getUsers);
router.post("/add-user", addUser);
// End UserController

// AuthController
const { login, checkToken } = require("../src/controllers/AuthController");
router.post("/login", login);
router.post("/check-token", middleware, checkToken);
// End AuthController

module.exports = router;
