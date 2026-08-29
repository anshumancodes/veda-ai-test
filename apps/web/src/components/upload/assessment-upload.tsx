"use client";

import { useState } from "react";
import { FileDropzone } from "./file-dropzone";
import Image from "next/image";
import { processDocument } from "@/lib/document";
import type { Question, Answer, AnswerMapping } from "@repo/ai";
import type { DocumentPage } from "@repo/types/types";
import { AssessmentViewer } from "@/components/viewer/assessment-viewer";
import TopNav from "@/components/layout/top-nav";

// idle → processing → viewer
//          ↑____________↓  (back button resets to idle)

type Phase = "idle" | "processing" | "viewer";

interface ExtractionResult {
  questions: Question[];
  answers: Answer[];
  mappings: AnswerMapping[];
  answerPages: DocumentPage[];
}

export function AssessmentUpload() {
  const [phase, setPhase] = useState<Phase>("idle");

  const [questionPaper, setQuestionPaper] = useState<File | null>(null);
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);

  const [result, setResult] = useState<ExtractionResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const canAnalyze = questionPaper !== null && answerSheet !== null;

  async function handleAnalyze() {
    if (!questionPaper || !answerSheet) return;

    setErrorMsg(null);
    setPhase("processing");

    try {
      // Render both documents to page images in the browser
      const [questionPages, answerPages] = await Promise.all([
        processDocument(questionPaper),
        processDocument(answerSheet),
      ]);

      // Send base64-encoded page images to the API
      const response = await fetch("/api/assessment/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionPages: questionPages.map((page) => ({
            page: page.pageNumber,
            mimeType: "image/png",
            data: page.dataUrl.split(",")[1],
          })),
          answerPages: answerPages.map((page) => ({
            page: page.pageNumber,
            mimeType: "image/png",
            data: page.dataUrl.split(",")[1],
          })),
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error ?? "Failed to extract assessment");
      }

      const data = await response.json();

      setResult({
        questions: data.questions,
        answers: data.answers,
        mappings: data.mappings,
        answerPages, // reuse already-rendered images, no second PDF decode
      });

      setPhase("viewer");
    } catch (error) {
      console.error("Assessment processing failed:", error);
      setErrorMsg(
        error instanceof Error ? error.message : "Something went wrong.",
      );
      setPhase("idle");
    }
  }

  function handleBack() {
    setPhase("idle");
    setResult(null);
    setErrorMsg(null);
  }

  // viewer phase
  if (phase === "viewer" && result) {
    return (
      <AssessmentViewer
        questions={result.questions}
        answers={result.answers}
        mappings={result.mappings}
        answerPages={result.answerPages}
        onBack={handleBack}
      />
    );
  }

  // Processing phase — full-screen loading
  if (phase === "processing") {
    return (
      <main className="min-h-screen bg-[linear-gradient(to_bottom,#ffffff_0%,#f8f7f6_35%,#e9e7e5_70%,#dcd9d6_100%)]">
        <TopNav />
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "calc(100vh - 56px)",
            gap: 28,
          }}
        >
          {/* Animated star */}
          <div style={{ position: "relative" }}>
            {/* Outer glow rings */}
            <div
              style={{
                position: "absolute",
                inset: -28,
                borderRadius: "50%",
                border: "1.5px solid rgba(232, 82, 26, 0.12)",
                animation: "ring-pulse 2.5s ease-in-out infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: -14,
                borderRadius: "50%",
                border: "1.5px solid rgba(232, 82, 26, 0.22)",
                animation: "ring-pulse 2.5s ease-in-out 0.4s infinite",
              }}
            />
            {/* Star container */}
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #fff4ef 0%, #ffe8db 100%)",
                border: "1.5px solid rgba(232, 82, 26, 0.2)",
                boxShadow: "0 8px 32px rgba(232, 82, 26, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                animation: "star-breathe 2s ease-in-out infinite",
              }}
            >
              <Image
                src="/orange_star.png"
                alt="Processing"
                width={44}
                height={44}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>

          {/* Text */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: "#1a1a1a",
                letterSpacing: "-0.02em",
                marginBottom: 6,
              }}
            >
              Extracting…
            </p>
            <p style={{ fontSize: 13, color: "#8a8480", lineHeight: 1.5 }}>
              Analyzing questions, answers, and mapping relationships
            </p>
          </div>

          {/* Animated dots */}
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#e8521a",
                  opacity: 0.4,
                  animation: `dot-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </section>

        <style>{`
          @keyframes ring-pulse {
            0%, 100% { transform: scale(1); opacity: 0.6; }
            50%       { transform: scale(1.08); opacity: 0.15; }
          }
          @keyframes star-breathe {
            0%, 100% { transform: scale(1); }
            50%       { transform: scale(1.06); }
          }
          @keyframes dot-bounce {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40%            { transform: translateY(-6px); opacity: 1; }
          }
          @keyframes ping-slow {
            0%   { transform: scale(1);    opacity: 0.8; }
            50%  { transform: scale(1.15); opacity: 0.4; }
            100% { transform: scale(1);    opacity: 0.8; }
          }
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </main>
    );
  }

  //Upload / idle phase
  return (
    <main className="min-h-screen bg-background">
      <TopNav />

      <section className="upload-section mx-auto flex flex-col items-center justify-center px-6 py-12" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div
          className="upload-container"
          style={{
            width: 789,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 20,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1
              className="upload-heading"
              style={{
                display: "inline-flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 8,
                marginBottom: 0,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: 40,
                  lineHeight: "120%",
                  letterSpacing: "-0.04em",
                  verticalAlign: "middle",
                  background: "rgba(43, 43, 43, 1)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  color: "rgba(43, 43, 43, 1)",
                }}
              >
                Upload
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  borderRadius: 8,
                  paddingTop: 4,
                  paddingRight: 8,
                  paddingBottom: 4,
                  paddingLeft: 8,
                  background: "rgba(255, 147, 80, 0.15)",
                  fontFamily: "'Bricolage Grotesque', sans-serif",
                  fontWeight: 700,
                  fontStyle: "normal",
                  fontSize: 40,
                  lineHeight: "120%",
                  letterSpacing: "-0.04em",
                  color: "rgba(43, 43, 43, 1)",
                }}
              >
                Question Paper &amp; Answer Sheets
              </span>
            </h1>
          </div>
          <p
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
              fontSize: 20,
              lineHeight: "140%",
              letterSpacing: "-0.04em",
              textAlign: "center",
              verticalAlign: "middle",
              background: "rgba(48, 48, 48, 1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "rgba(48, 48, 48, 1)",
              margin: 0,
            }}
          >
            Upload both files to get started
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 20,
            }}
          >
            {/* Mascot */}
            <div className="flex justify-center">
              <div
                style={{
                  position: "relative",
                  width: 137,
                  height: 138,
                }}
              >
                {/* Outer glow rings removed */}

                <Image
                  src="/ved.png"
                  alt="Teacher mascot"
                  width={137}
                  height={138}
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>

            {/* Upload cards */}
            <div
              className="dropzone-row"
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                width: 823,
                borderRadius: 24,
                padding: 12,
                gap: 10,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                boxSizing: "border-box",
              }}
            >
              <FileDropzone
                label="Question Paper"
                file={questionPaper}
                onFileChange={setQuestionPaper}
              />
              <FileDropzone
                label="Answer Sheet"
                file={answerSheet}
                onFileChange={setAnswerSheet}
              />
            </div>

            {/* Error message */}
            {errorMsg && (
              <div
                style={{
                  marginBottom: 16,
                  padding: "10px 14px",
                  borderRadius: 10,
                  background: "#fef2f2",
                  border: "1px solid #fecaca",
                  color: "#dc2626",
                  fontSize: 13,
                }}
              >
                {errorMsg}
              </div>
            )}

            {/* Start Mapping button */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                id="start-mapping-btn"
                disabled={!canAnalyze}
                onClick={handleAnalyze}
                className="
      flex h-11 w-[161px] items-center justify-center
      gap-2 rounded-[64px]
      border-2 border-white/[0.15]
      bg-[#303030]
      py-3 pl-6 pr-5
      text-sm font-medium text-white
      shadow-[0px_4px_5px_0px_rgba(0,0,0,0.12)]
      transition-all
      hover:bg-[#3a3a3a]

    "
              >
                <span>Start Mapping</span>

                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13M13 8L9 4M13 8L9 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <p className="text-center text-[12px] text-[#a09a94]">
                Once both files are uploaded, you&apos;ll be able to map answers
                with questions
              </p>
            </div>

            <style>{`
            @keyframes ping-slow {
              0%   { transform: scale(1);    opacity: 0.8; }
              50%  { transform: scale(1.15); opacity: 0.4; }
              100% { transform: scale(1);    opacity: 0.8; }
            }
            @keyframes spin {
              to { transform: rotate(360deg); }
            }

            /* ── Responsive upload layout ───────────────────────── */
            @media (max-width: 767px) {
              .upload-section {
                min-height: calc(100vh - 56px);
                padding-left: 16px !important;
                padding-right: 16px !important;
              }
              .upload-container {
                width: 100% !important;
              }
              .upload-heading span {
                font-size: 28px !important;
              }
              .dropzone-row {
                width: 100% !important;
                height: auto !important;
                flex-direction: column !important;
              }
            }
          `}</style>
          </div>
        </div>
      </section>
    </main>
  );
}
