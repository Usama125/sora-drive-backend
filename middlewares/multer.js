const multer = require("multer");

const upload = multer({
  limits: {
    fileSize: 50 * 1024 * 1024, // ✅ 50 MB limit
  },
  fileFilter: (req, file, cb) => {
    // ✅ Accept all files
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

module.exports = upload;
