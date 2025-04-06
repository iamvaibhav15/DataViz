const File = require("../models/file");
const { analyzeCSV } = require("../services/analyze-wrapper");

async function handleFileUpload(req, res) {
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
    
    // Call the FastAPI service by sending the file path
    const result = await analyzeCSV(fileData.path);

    return res.status(200).json({
      message: "File uploaded and analyzed successfully",
      file: {
        filename: file.filename,
        originalName: file.originalname,
        path: file.path,
        size: file.size,
      },
      analysis: result, // Contains report_url (e.g., { message, report_url })
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
}

module.exports = {
  handleFileUpload,
};
