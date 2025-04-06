const axios = require("axios");

async function analyzeCSV(filePath) {
  try {
    // Call the FastAPI endpoint by sending the saved file path.
    const response = await axios.post("http://localhost:8000/analyze-file", {
      file_path: filePath,
    });
    // Expecting { message: "...", report_url: "/reports/..." }
    return response.data;
  } catch (error) {
    console.error("Error in analyzeCSV:", error);
    throw error;
  }
}

module.exports = { analyzeCSV };
