"use client"
// analysis/pages.jsx (Next.js pages directory example)
import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, ArrowLeft, Download } from "lucide-react";

export default function AnalysisPage() {
  const [reportUrl, setReportUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Retrieve the report URL and analysis data from localStorage
    try {
      const storedData = JSON.parse(localStorage.getItem("analysisData"));
      if (storedData?.analysis?.report_url) {
        setReportUrl(storedData.analysis.report_url);
        setAnalysisData(storedData);
      }
    } catch (error) {
      console.error("Error parsing analysis data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

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
          ) : reportUrl ? (
            <div className="space-y-6">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-3 text-purple-400">Report Details</h2>
                
                {analysisData?.analysis?.timestamp && (
                  <p className="text-gray-300 mb-2">
                    <span className="font-medium">Generated:</span> {new Date(analysisData.analysis.timestamp).toLocaleString()}
                  </p>
                )}
                
                {analysisData?.filename && (
                  <p className="text-gray-300 mb-4">
                    <span className="font-medium">File:</span> {analysisData.filename}
                  </p>
                )}

                <a 
                  href={reportUrl}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-5 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Report
                </a>
              </div>
              
              {analysisData?.analysis?.summary && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  <h2 className="text-xl font-semibold mb-3 text-purple-400">Summary</h2>
                  <p className="text-gray-300">{analysisData.analysis.summary}</p>
                </div>
              )}
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