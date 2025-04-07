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
          const visualizationData = await prepareVisualizationData(
            results,
            columnStats
          );

          // Generate report
          const reportPath = generateReport(
            filePath,
            results,
            columnStats,
            visualizationData
          );

          resolve({
            rowCount,
            columnCount: headers.length,
            headers,
            columnStats,
            visualizationData,
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

/**
 * Prepares data for different visualization types
 * @param {Array} data - Parsed CSV data
 * @param {Object} columnStats - Column statistics
 * @returns {Object} Processed data for different visualization types
 */
async function prepareVisualizationData(data, columnStats) {
  const d3 = await import("d3");

  let categoricalColumn = null;
  let numericColumn = null;

  for (const column in columnStats) {
    if (columnStats[column].type === "text" && !categoricalColumn) {
      categoricalColumn = column;
    } else if (columnStats[column].type === "numeric" && !numericColumn) {
      numericColumn = column;
    }

    if (categoricalColumn && numericColumn) break;
  }

  const headers = Object.keys(data[0]);
  categoricalColumn = categoricalColumn || headers[0];
  numericColumn = numericColumn || headers[1];

  return {
    barChart: prepareBarChartData(data, categoricalColumn, numericColumn, d3),
    lineChart: prepareLineChartData(data, categoricalColumn, numericColumn, d3),
    scatterPlot: prepareScatterPlotData(data, numericColumn, numericColumn),
    pieChart: preparePieChartData(data, categoricalColumn, numericColumn, d3),
  };
}

function prepareBarChartData(data, xAxis, yAxis, d3) {
  const processedData = data.filter((d) => !isNaN(+d[yAxis]));

  const groupedData = d3.rollup(
    processedData,
    (v) => d3.sum(v, (d) => +d[yAxis]),
    (d) => d[xAxis]
  );

  return Array.from(groupedData, ([key, value]) => ({
    [xAxis]: key,
    [yAxis]: value,
  }));
}

function prepareLineChartData(data, xAxis, yAxis, d3) {
  const processedData = data.filter((d) => !isNaN(+d[yAxis]));

  processedData.sort((a, b) => {
    if (a[xAxis] < b[xAxis]) return -1;
    if (a[xAxis] > b[xAxis]) return 1;
    return 0;
  });

  const groupedData = d3.rollup(
    processedData,
    (v) => d3.mean(v, (d) => +d[yAxis]),
    (d) => d[xAxis]
  );

  return Array.from(groupedData, ([key, value]) => ({
    [xAxis]: key,
    [yAxis]: value,
  }));
}

function prepareScatterPlotData(data, xAxis, yAxis) {
  return data
    .filter((d) => !isNaN(+d[xAxis]) && !isNaN(+d[yAxis]))
    .map((d) => ({
      [xAxis]: +d[xAxis],
      [yAxis]: +d[yAxis],
    }));
}

function preparePieChartData(data, labelField, valueField, d3) {
  const processedData = data.filter((d) => !isNaN(+d[valueField]));

  const groupedData = d3.rollup(
    processedData,
    (v) => d3.sum(v, (d) => +d[valueField]),
    (d) => d[labelField]
  );

  const result = Array.from(groupedData, ([key, value]) => ({
    [labelField]: key,
    [valueField]: value,
  }));

  return result.sort((a, b) => b[valueField] - a[valueField]).slice(0, 10);
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

function generateReport(filePath, data, columnStats, visualizationData) {
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
    visualizationData,
    sampleRows: data.slice(0, 5),
  };

  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

  return `/reports/${reportFilename}`;
}
