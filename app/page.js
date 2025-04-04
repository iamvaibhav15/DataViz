// frontend/app/page.js
"use client"; // Also ensure this file is a client component if you're using hooks here

import FileUploader from "./components/FileUploader";

export default function Home() {
  return (
    <main>
      <h1>Welcome</h1>
      <FileUploader />
    </main>
  );
}