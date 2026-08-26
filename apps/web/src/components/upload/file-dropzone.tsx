"use client";

import { useRef, useState } from "react";
import { isAcceptedFile, MAX_FILE_SIZE } from "@/lib/file";

interface FileDropzoneProps {
  label: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function FileDropzone({ label, file, onFileChange }: FileDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleFile(selectedFile: File) {
    setError(null);
    if (!isAcceptedFile(selectedFile)) {
      setError("Please upload a PDF, PNG, JPEG, or WebP file.");
      return;
    }
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError("File size must be less than 20 MB.");
      return;
    }
    onFileChange(selectedFile);
  }

  function handleDrop(event: React.DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) handleFile(selectedFile);
  }

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        style={{
          background: isDragging
            ? "#fff4f0"
            : file
            ? "#fffaf8"
            : "#ffffff",
          border: `2px dashed ${
            isDragging ? "#e8521a" : file ? "rgba(232, 82, 26, 0.5)" : "#ddd8d2"
          }`,
          borderRadius: 16,
          padding: "32px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          cursor: "pointer",
          transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
          minHeight: 160,
          boxShadow: file
            ? "0 0 0 3px rgba(232, 82, 26, 0.08), 0 4px 20px rgba(0,0,0,0.05)"
            : isDragging
            ? "0 0 0 3px rgba(232, 82, 26, 0.12)"
            : "0 2px 12px rgba(0,0,0,0.04)",
          outline: "none",
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.png,.jpg,.jpeg,.webp"
          className="hidden"
          onChange={handleInputChange}
        />

        {/* Upload icon */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: file ? "#fff0eb" : "#f4f1ee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background 0.2s",
            border: file ? "1px solid rgba(232, 82, 26, 0.2)" : "1px solid #ece9e5",
          }}
        >
          {file ? (
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 10L8.5 14.5L16 6" stroke="#e8521a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 13V4M10 4L7 7M10 4L13 7" stroke="#8a8480" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 14V16C4 16.6 4.4 17 5 17H15C15.6 17 16 16.6 16 16V14" stroke="#8a8480" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          )}
        </div>

        {/* Label */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 14, fontWeight: 500, color: "#2a2520", lineHeight: 1.4, margin: 0 }}>
            {file ? (
              <span style={{ color: "#1a1a1a", fontWeight: 600 }}>{file.name}</span>
            ) : (
              <>
                Upload{" "}
                <span style={{ color: "#e8521a", fontWeight: 600 }}>{label}</span>
              </>
            )}
          </p>
          <p style={{ fontSize: 12, color: "#a09a94", marginTop: 3 }}>
            {file ? (
              <span style={{ color: "#b4b0ac" }}>Click to replace · PDF / PNG / JPEG</span>
            ) : (
              "Drag & drop or click · PDF, PNG, JPEG · Max 20MB"
            )}
          </p>
        </div>

        {/* File size badge */}
        {file && (
          <span
            style={{
              fontSize: 11,
              color: "#e8521a",
              background: "#fff0eb",
              border: "1px solid rgba(232, 82, 26, 0.18)",
              padding: "2px 10px",
              borderRadius: 99,
              fontWeight: 500,
            }}
          >
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </span>
        )}
      </div>

      {error && (
        <p style={{ fontSize: 12, color: "#dc2626", marginTop: 6, paddingLeft: 4 }}>{error}</p>
      )}
    </div>
  );
}