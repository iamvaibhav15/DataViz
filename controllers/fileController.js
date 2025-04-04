const File = require("../models/file");

async function handleFileUpload(req, res) {
  try {
    if (!req.files) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Save file metadata to MongoDB
    const fileData = new File({
      filename: req.files[0].filename,
      originalName: req.files[0].originalname,
      path: req.files[0].path,
      size: req.files[0].size,
    });

    await fileData.save();

    return res.status(200).json({
      message: "File uploaded successfully",
      file: {
        filename: req.files[0].filename,
        originalName: req.files[0].originalname,
        path: req.files[0].path,
        size: req.files[0].size,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ message: "Error uploading file" });
  }
}

module.exports = {
  handleFileUpload,
};
