const express = require("express");
const router = express.Router();

// User
const { getUsers, addUser } = require("../src/controllers/UserController");
router.get("/users", getUsers);
router.post("/add-user", addUser);
// End User

module.exports = router;
