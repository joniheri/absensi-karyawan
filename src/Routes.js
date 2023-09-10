const express = require("express");
const router = express.Router();

// AuthMiddleware
const {
  middleware,
  middlewareLevel,
} = require("../src/middlewares/AuthMiddleware");
// End AuthMiddleware

// AppMiddleware
const { upload } = require("../src/middlewares/AppMiddleware");
// End AppMiddleware

// UserController
const {
  getUsers,
  addUser,
  editProfile,
  changePassword,
  editPhotoProfile,
} = require("../src/controllers/UserController");
router.get("/users", middleware, middlewareLevel(["admin"]), getUsers);
router.post("/add-user", middleware, middlewareLevel(["admin"]), addUser);
router.patch("/edit-profile", middleware, editProfile);
router.patch("/change-password", middleware, changePassword);
router.patch(
  "/edit-photo-profile",
  middleware,
  upload.single("file"),
  editPhotoProfile
);
// End UserController

// AuthController
const { login, checkToken } = require("../src/controllers/AuthController");
router.post("/login", login);
router.get("/check-token", middleware, checkToken);
// End AuthController

// Attendance
const {
  getAttendanceByUser,
  takeAttendanceIn,
  takeAttendanceOut,
  getAttendanceConfig,
} = require("../src/controllers/AttendanceController");
router.post("/attendance-byuser", middleware, getAttendanceByUser);
router.get("/attendanceconfig", middleware, getAttendanceConfig);
router.get("/take-attendance-in", middleware, takeAttendanceIn);
router.get("/take-attendance-out", middleware, takeAttendanceOut);
// End Attendance

module.exports = router;
