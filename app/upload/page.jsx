// uploader file
"use client";

import { useRouter } from "next/navigation";

import React, { useState, useRef } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

export default function FileUploader() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Allowed file types
  const allowedTypes = ["text/csv", "application/vnd.ms-excel"];

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  // Handle manual file selection
  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  // Validate and set file
  const validateAndSetFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      setUploadStatus("Invalid file type. Please upload a CSV file.");
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
    setUploadStatus(`Selected file: ${file.name}`);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a CSV file before submitting.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setUploadStatus("File uploaded and analyzed successfully!");
      localStorage.setItem("analysisData", JSON.stringify(response.data));
      router.push("/analysis");

      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      setUploadStatus("Error uploading file. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  // Handle key press (Enter to submit)
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && selectedFile && !isUploading) {
      handleUpload();
    }
  };

  // Remove selected file
  const handleRemoveFile = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
    setUploadStatus("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <Navbar />
      <div
        className="max-w-7xl mx-auto p-8 bg-gray-900 rounded-xl shadow-xl space-y-6 mt-8"
        onKeyDown={handleKeyPress}
        tabIndex={0}
      >
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 mr-3 text-purple-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 13V6C20 4.89543 19.1046 4 18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M18 21V15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 18H21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h2 className="text-2xl font-bold text-white">Import Your Data</h2>
        </div>

        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current.click()}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer ${
            dragActive
              ? "border-purple-400 bg-purple-900 bg-opacity-20"
              : "border-gray-600 hover:border-purple-500 hover:bg-gray-800"
          }`}
        >
          <svg
            className="w-16 h-16 mb-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {selectedFile ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center bg-gray-800 py-2 px-4 rounded-lg mb-2">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-200 font-medium">
                  {selectedFile.name}
                </span>
                <button
                  onClick={handleRemoveFile}
                  className="ml-2 text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-400">Click to change file</p>
            </div>
          ) : (
            <>
              <p className="text-lg text-gray-300 mb-2 font-medium">
                Drag & drop your CSV file here
              </p>
              <p className="text-sm text-gray-400">
                or click to browse your files
              </p>
              <div className="mt-4 flex items-center justify-center">
                <div className="bg-gray-800 py-1 px-3 rounded-md flex items-center space-x-1">
                  <span className="text-xs text-gray-400">
                    Supported format:
                  </span>
                  <span className="text-xs font-medium text-purple-400">
                    .CSV
                  </span>
                </div>
              </div>
            </>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {uploadStatus && uploadStatus.includes("Invalid") && (
          <div className="p-3 bg-red-900 bg-opacity-30 border border-red-700 rounded-md text-red-400 text-center">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {uploadStatus}
            </div>
          </div>
        )}

        {uploadStatus && uploadStatus.includes("successfully") && (
          <div className="p-3 bg-green-900 bg-opacity-30 border border-green-700 rounded-md text-green-400 text-center">
            <div className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {uploadStatus}
            </div>
          </div>
        )}

        {analysisResult && (
          <div className="mt-6 p-4 bg-gray-800 rounded-lg text-white">
            <h3 className="text-lg font-semibold mb-2 text-purple-400">
              Analysis Result:
            </h3>
            <pre className="whitespace-pre-wrap text-sm text-gray-300">
              {JSON.stringify(analysisResult, null, 2)}
            </pre>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleUpload}
            disabled={!selectedFile || isUploading}
            className={`w-full py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-center ${
              !selectedFile || isUploading
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            {isUploading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Uploading...
              </>
            ) : (
              <>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                Upload Data
              </>
            )}
          </button>

          <div className="text-center">
            <span className="text-sm text-gray-500">
              Need help with your data?{" "}
              <a href="#" className="text-purple-400 hover:text-purple-300">
                View guide
              </a>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
