// "use client";

// import React, { useState, useRef } from "react";
// import axios from "axios";

// export default function FileUploader() {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadStatus, setUploadStatus] = useState("");
//   const fileInputRef = useRef(null);

//   // Allowed file types
//   const allowedTypes = ["text/csv", "application/vnd.ms-excel"];

//   // Handle drag events
//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   // Handle file drop
//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files.length > 0) {
//       validateAndSetFile(e.dataTransfer.files[0]);
//     }
//   };

//   // Handle manual file selection
//   const handleChange = (e) => {
//     if (e.target.files.length > 0) {
//       validateAndSetFile(e.target.files[0]);
//     }
//   };

//   // Validate and set file
//   const validateAndSetFile = (file) => {
//     if (!allowedTypes.includes(file.type)) {
//       setUploadStatus("Invalid file type. Please upload a CSV file.");
//       setSelectedFile(null);
//       return;
//     }
//     setSelectedFile(file);
//     setUploadStatus(`Selected file: ${file.name}`);
//   };

//   // Handle file upload
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setUploadStatus("Please select a CSV file before submitting.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", selectedFile);

//     try {
//       await axios.post("http://localhost:5000/upload", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });

//       setUploadStatus("File uploaded successfully!");
//       setSelectedFile(null); // Clear file state
//       if (fileInputRef.current) fileInputRef.current.value = ""; // Clear file input
//     } catch (error) {
//       setUploadStatus("Error uploading file. Please try again.");
//     }
//   };

//   // Handle key press (Enter to submit)
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleUpload();
//     }
//   };

//   return (
//     <div
//       className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4"
//       onKeyDown={handleKeyPress}
//       tabIndex={0} // Allows keypress detection
//     >
//       <h2 className="text-3xl font-semibold text-center text-gray-800">
//         File Upload
//       </h2>
//       <div
//         onDragEnter={handleDrag}
//         onDragOver={handleDrag}
//         onDragLeave={handleDrag}
//         onDrop={handleDrop}
//         onClick={() => fileInputRef.current.click()}
//         className={`flex flex-col items-center justify-center border-4 border-dashed rounded-lg p-8 transition-all duration-300 cursor-pointer ${
//           dragActive
//             ? "border-blue-400 bg-blue-50"
//             : "border-gray-300 hover:border-blue-300"
//         }`}
//       >
//         <svg
//           className="w-12 h-12 mb-3 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 48 48"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             d="M6 30v10a2 2 0 002 2h32a2 2 0 002-2V30M24 6v24M14 16l10-10 10 10"
//             strokeWidth="2"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//         <p className="text-lg text-gray-600">
//           Drag & drop a CSV file here, or click to select
//         </p>
//         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".csv"
//           onChange={handleChange}
//           className="hidden"
//         />
//       </div>

//       {uploadStatus && (
//         <div className="p-3 bg-green-100 border border-green-300 rounded-md text-green-700 text-center">
//           {uploadStatus}
//         </div>
//       )}

//       {selectedFile && (
//         <div className="p-3 bg-gray-50 rounded-md">
//           <h3 className="text-gray-800 font-medium">File:</h3>
//           <p className="text-gray-600">{selectedFile.name}</p>
//         </div>
//       )}

//       <button
//         onClick={handleUpload}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-all duration-200"
//       >
//         Submit
//       </button>
//     </div>
//   );
// }
