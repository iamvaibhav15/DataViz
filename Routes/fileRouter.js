const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { handleFileUpload } = require("../controllers/fileController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const dir = path.join(__dirname, "../uploads");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const uniqueName = `${day}${month}-${Math.round(Math.random() * 1e9)}`;
    callback(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.any(), handleFileUpload);

module.exports = router;
