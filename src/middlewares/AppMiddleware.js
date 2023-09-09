const multer = require("multer");
const path = require("path");

// Konfigurasi penyimpanan file multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Menyimpan file di dalam folder 'uploads/'
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

// Konfigurasi penyimpanan file multer
const storage2 = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Menyimpan file di dalam folder 'uploads/'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Gunakan nama file asli
  },
});

exports.upload = multer({ storage: storage2 });
