// fileController.mjs
import File from "../models/file.js";
import { analyzeCSV } from "../services/analysis.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// To use __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function handleFileUpload(req, res) {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = req.files[0];

    // Save file metadata to MongoDB
    const fileData = new File({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size,
    });
    await fileData.save();

    // Analyze the CSV file
    const result = await analyzeCSV(fileData.path);

    // Save a copy of the CSV to a public directory
    const publicPath = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(publicPath)) {
      fs.mkdirSync(publicPath, { recursive: true });
    }

    const publicFilePath = path.join(publicPath, file.filename);
    fs.copyFileSync(file.path, publicFilePath);

    const fileUrl = `/uploads/${file.filename}`;

    return res.status(200).json({
      message: "File uploaded and analyzed successfully",
      file: {
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
        publicUrl: fileUrl,
      },
      analysis: {
        ...result,
        csvUrl: fileUrl,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
}

