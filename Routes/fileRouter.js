import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { handleFileUpload } from "../controllers/fileController.js";

// __dirname workaround in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    callback(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/upload", upload.any(), handleFileUpload);

export default router;
