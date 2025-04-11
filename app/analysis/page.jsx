"use client"
// analysis/pages.jsx (Next.js pages directory example)
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Download, BarChart } from "lucide-react";
import CSVVisualizer from "../../components/CSVVisualizer";

export default function AnalysisPage() {
  const [reportUrl, setReportUrl] = useState("");
  const [csvUrl, setCsvUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    // Retrieve the report URL and analysis data from localStorage
    try {
      const storedData = JSON.parse(localStorage.getItem("analysisData"));
      if (storedData) {
        if (storedData?.analysis?.report_url) {
          setReportUrl(storedData.analysis.report_url);
        }
        if (storedData?.analysis?.csvUrl) {
          setCsvUrl(storedData.analysis.csvUrl);
        }
        setAnalysisData(storedData);
      }
    } catch (error) {
      console.error("Error parsing analysis data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "summary":
        return (
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-3 text-purple-400">Summary</h2>
            {analysisData?.analysis?.summary ? (
              <p className="text-gray-300">{analysisData.analysis.summary}</p>
            ) : (
              <p className="text-gray-400">No summary available.</p>
            )}
            
            {analysisData?.analysis?.columnStats && (
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-3 text-white">Column Statistics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(analysisData.analysis.columnStats).map(([column, stats]) => (
                    <div key={column} className="bg-gray-700 p-4 rounded-md">
                      <h4 className="font-medium text-purple-300 mb-2">{column}</h4>
                      <div className="text-sm text-gray-300">
                        <p><span className="font-medium">Type:</span> {stats.type}</p>
                        {stats.type === 'numeric' ? (
                          <>
                            <p><span className="font-medium">Min:</span> {stats.min}</p>
                            <p><span className="font-medium">Max:</span> {stats.max}</p>
                            <p><span className="font-medium">Average:</span> {stats.average.toFixed(2)}</p>
                          </>
                        ) : (
                          <>
                            <p><span className="font-medium">Unique Values:</span> {stats.uniqueCount}</p>
                            <p><span className="font-medium">Most Common:</span> {stats.mostCommon}</p>
                          </>
                        )}
                        <p><span className="font-medium">Non-null Count:</span> {stats.nonNullCount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case "visualization":
        return (
          <CSVVisualizer 
            csvUrl={`http://localhost:5000${csvUrl}`} 
            columnStats={analysisData?.analysis?.columnStats} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto p-8">
        <div className="mb-6">
          <Link 
            href="/upload" 
            className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Upload
          </Link>
        </div>

        <div className="bg-gray-900 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold mb-6 text-white flex items-center">
            <FileText className="mr-3 h-8 w-8 text-purple-400" />
            Analysis Report
          </h1>

          {loading ? (
            <div className="py-12 text-center">
              <div className="animate-pulse flex flex-col items-center">
                <div className="h-4 bg-gray-800 rounded-full w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-800 rounded-full w-1/2"></div>
              </div>
            </div>
          ) : analysisData ? (
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-400">Report Details</h2>
                
                {analysisData?.analysis?.timestamp && (
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Generated:</span> {new Date(analysisData.analysis.timestamp).toLocaleString()}
                  </p>
                )}
                
                {analysisData?.file?.originalName && (
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">File:</span> {analysisData.file.originalName}
                  </p>
                )}
                
                {analysisData?.analysis?.rowCount && (
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Rows:</span> {analysisData.analysis.rowCount}
                  </p>
                )}
                
                {analysisData?.analysis?.columnCount && (
                  <p className="text-gray-300 mb-4">
                    <span className="font-medium">Columns:</span> {analysisData.analysis.columnCount}
                  </p>
                )}
                {reportUrl && (
                  <a 
                    href={`http://localhost:5000/public${reportUrl}`}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-5 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Report
                  </a>
                )}
              </div>
              
              {/* Tabs Navigation */}
              <div className="border-b border-gray-700">
                <nav className="flex space-x-4">
                  <button
                    onClick={() => setActiveTab("summary")}
                    className={`py-4 px-6 font-medium text-sm transition-colors ${
                      activeTab === "summary"
                        ? "border-b-2 border-purple-500 text-purple-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    Summary
                  </button>
                  <button
                    onClick={() => setActiveTab("visualization")}
                    className={`py-4 px-6 font-medium text-sm transition-colors flex items-center ${
                      activeTab === "visualization"
                        ? "border-b-2 border-purple-500 text-purple-400"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <BarChart className="mr-2 h-4 w-4" />
                    Visualization
                  </button>
                </nav>
              </div>
              
              {/* Tab Content */}
              <div className="pt-4">
                {renderTabContent()}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center bg-gray-800 rounded-lg border border-gray-700">
              <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-lg text-gray-300">No report available.</p>
              <Link 
                href="/upload" 
                className="mt-4 inline-block px-5 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
              >
                Generate a New Report
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}