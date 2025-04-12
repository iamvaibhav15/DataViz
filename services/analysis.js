import fs from "fs";
import path from "path";
import csvParser from "csv-parser";

/**
 * @param {string} filePath - Path to the CSV file
 * @returns {Promise<Object>} Analysis results and visualization data
 */

export async function analyzeCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    const headers = [];
    let rowCount = 0;

    // Create readable stream from the CSV file
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("headers", (headerList) => {
        headers.push(...headerList);
      })
      .on("data", (data) => {
        results.push(data);
        rowCount++;
      })
      .on("end", async () => {
        try {
          const columnStats = analyzeColumns(results, headers);
          // Generate visualization data

          // Generate report
          const reportPath = generateReport(
            filePath,
            results,
            columnStats,
          );

          resolve({
            rowCount,
            columnCount: headers.length,
            headers,
            columnStats,
            summary: `CSV file contains ${rowCount} rows and ${headers.length} columns.`,
            timestamp: new Date().toISOString(),
            report_url: reportPath,
          });
        } catch (err) {
          reject(err);
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}



function analyzeColumns(data, headers) {
  const stats = {};

  headers.forEach((header) => {
    const values = data.map((row) => row[header]);
    const type = determineColumnType(values);

    if (type === "numeric") {
      const numericValues = values
        .filter((v) => v !== null && v !== undefined && v !== "")
        .map((v) => parseFloat(v));

      stats[header] = {
        type,
        min: Math.min(...numericValues),
        max: Math.max(...numericValues),
        average:
          numericValues.reduce((sum, val) => sum + val, 0) /
          numericValues.length,
        nonNullCount: numericValues.length,
      };
    } else {
      const uniqueValues = [
        ...new Set(
          values.filter((v) => v !== null && v !== undefined && v !== "")
        ),
      ];

      stats[header] = {
        type,
        uniqueCount: uniqueValues.length,
        mostCommon: findMostCommon(values),
        nonNullCount: values.filter(
          (v) => v !== null && v !== undefined && v !== ""
        ).length,
      };
    }
  });

  return stats;
}

function determineColumnType(values) {
  const sampleValues = values
    .filter((v) => v !== null && v !== undefined && v !== "")
    .slice(0, 100);

  const numericCount = sampleValues.filter(
    (value) => !isNaN(parseFloat(value))
  ).length;

  return numericCount >= sampleValues.length * 0.8 ? "numeric" : "text";
}

function findMostCommon(values) {
  const counts = {};
  let maxValue = null;
  let maxCount = 0;

  values.forEach((value) => {
    if (value === null || value === undefined || value === "") return;

    counts[value] = (counts[value] || 0) + 1;

    if (counts[value] > maxCount) {
      maxCount = counts[value];
      maxValue = value;
    }
  });

  return maxValue;
}

function generateReport(filePath, data, columnStats) {
  const reportDir = path.join(process.cwd(), "public", "reports");

  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const originalFilename = path.basename(filePath, path.extname(filePath));
  const timestamp = Date.now();
  const reportFilename = `${originalFilename}-report-${timestamp}.json`;
  const reportPath = path.join(reportDir, reportFilename);

  const report = {
    filename: path.basename(filePath),
    timestamp: new Date().toISOString(),
    rowCount: data.length,
    columnStats,
    sampleRows: data.slice(0, 5),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  return `/reports/${reportFilename}`;
}
