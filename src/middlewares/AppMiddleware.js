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

// Fungsi filter untuk mengizinkan hanya file gambar
const imageFilter = function (req, file, cb) {
  const fileSize = parseInt(req.headers["content-length"]);

  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    req.fileValidationError = "Hanya file GAMBAR yang diizinkan";
    cb(null, false);
    return;
  } else if (fileSize > 2 * 1024 * 1024) {
    req.fileValidationError = "Ukuran file maximal 2mb";
    cb(null, false);
    return;
  } else {
    cb(null, true);
    return;
  }
};

exports.upload = multer({
  storage: storage2,
  fileFilter: imageFilter,
});
