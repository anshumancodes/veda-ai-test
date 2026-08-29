"use client";

import { useState, useEffect } from "react";
import type { Question, Answer, AnswerMapping, AnswerRegion } from "@repo/ai";
import type { DocumentPage } from "@repo/types/types";
import { QuestionList } from "./question-list";
import { AnswerPageViewer } from "./answer-page-viewer";

interface AssessmentViewerProps {
  questions: Question[];
  answers: Answer[];
  mappings: AnswerMapping[];
  answerPages: DocumentPage[];
  onBack: () => void;
}

export function AssessmentViewer({
  questions,
  answers,
  mappings,
  answerPages,
  onBack,
}: AssessmentViewerProps) {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [activeRegions, setActiveRegions] = useState<AnswerRegion[]>([]);
  const [mobileTab, setMobileTab] = useState<"questions" | "answer">("questions");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Build a lookup: answerId → Answer
  const answersById = new Map<string, Answer>();
  for (const answer of answers) {
    answersById.set(answer.id, answer);
  }

  // Build a lookup: questionId → AnswerMapping
  const mappingByQuestion = new Map<string, AnswerMapping>();
  for (const m of mappings) {
    if (m.questionId !== null) {
      mappingByQuestion.set(m.questionId, m);
    }
  }

  // Unmatched answers (no questionId in mapping)
  const unmatchedAnswers = mappings
    .filter((m) => m.questionId === null)
    .map((m) => answersById.get(m.answerId))
    .filter((a): a is Answer => Boolean(a));

  function handleSelectQuestion(questionId: string) {
    setActiveQuestionId(questionId);

    const mapping = mappingByQuestion.get(questionId);
    if (!mapping) {
      setActiveRegions([]);
      // On mobile, switch to answer tab so user sees the result
      if (isMobile) setMobileTab("answer");
      return;
    }

    const answer = answersById.get(mapping.answerId);
    if (!answer) {
      setActiveRegions([]);
      if (isMobile) setMobileTab("answer");
      return;
    }

    setActiveRegions(answer.regions);
    // Auto-switch to answer sheet on mobile when a question is selected
    if (isMobile) setMobileTab("answer");
  }

  // Stats
  const answeredCount = questions.filter((q) =>
    mappingByQuestion.has(q.id),
  ).length;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "#f0eeeb",
        overflow: "hidden",
      }}
    >
      {/* Viewer header */}
      <header
        style={{
          background: "rgba(255,255,255,0.88)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #e8e4df",
          height: 56,
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          gap: 10,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        {/* Back button */}
        <button
          type="button"
          id="viewer-back-btn"
          onClick={onBack}
          aria-label="Back to upload"
          style={{
            width: 30,
            height: 30,
            borderRadius: 7,
            border: "1px solid #e2ddd8",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background 0.15s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="#6b6560" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#e2ddd8" }} />

        {/* Title */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Assessment Review
          </p>
          <p style={{ fontSize: 11, color: "#8a8480", marginTop: 1 }}>
            {answeredCount} of {questions.length} questions mapped
          </p>
        </div>

        {/* Stats chips */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0, overflowX: "auto", maxWidth: "50%" }}>
          <StatChip label="Questions" value={questions.length} color="#4a4540" />
          <StatChip label="Answers" value={answers.length} color="#e8521a" />
          {unmatchedAnswers.length > 0 && (
            <StatChip label="Unmatched" value={unmatchedAnswers.length} color="#ca8a04" />
          )}
        </div>
      </header>

      {/* ── Mobile Tab Bar ── */}
      {isMobile && (
        <div
          style={{
            flexShrink: 0,
            padding: "8px 16px",
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid #e8e4df",
            display: "flex",
            gap: 8,
          }}
        >
          <MobileTabButton
            label="Questions"
            count={questions.length}
            isActive={mobileTab === "questions"}
            onClick={() => setMobileTab("questions")}
          />
          <MobileTabButton
            label="Answer Sheet"
            count={answerPages.length}
            isActive={mobileTab === "answer"}
            onClick={() => setMobileTab("answer")}
          />
        </div>
      )}

      {/* Two-pane body */}
      <div
        style={{
          flex: 1,
          display: isMobile ? "block" : "grid",
          gridTemplateColumns: isMobile ? undefined : "300px 1fr",
          overflow: "hidden",
        }}
      >
        {/* LEFT — Question list */}
        <aside
          style={{
            background: "#ffffff",
            borderRight: isMobile ? "none" : "1px solid #e8e4df",
            overflow: "hidden",
            display: isMobile && mobileTab !== "questions" ? "none" : "flex",
            flexDirection: "column",
            height: isMobile ? "100%" : undefined,
          }}
        >
          <QuestionList
            questions={questions}
            mappings={mappings}
            answers={answers}
            activeQuestionId={activeQuestionId}
            onSelect={handleSelectQuestion}
          />

          {/* Unmatched answers section */}
          {unmatchedAnswers.length > 0 && (
            <UnmatchedSection
              answers={unmatchedAnswers}
              onSelect={(answer) => {
                setActiveQuestionId(null);
                setActiveRegions(answer.regions);
                if (isMobile) setMobileTab("answer");
              }}
            />
          )}
        </aside>

        {/* RIGHT — Answer page viewer */}
        <main
          style={{
            overflow: "hidden",
            display: isMobile && mobileTab !== "answer" ? "none" : "flex",
            flexDirection: "column",
            background: "#f7f5f2",
            height: isMobile ? "100%" : undefined,
          }}
        >
          {/* Instruction bar */}
          {activeQuestionId === null && (
            <div
              style={{
                padding: "9px 20px",
                background: "rgba(255,255,255,0.75)",
                borderBottom: "1px solid #e8e4df",
                fontSize: 12,
                color: "#8a8480",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                <path d="M10 12L6 8L10 4" stroke="#c4bfba" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {isMobile ? "Select a question from the Questions tab" : "Select a question to highlight its answer on the sheet"}
            </div>
          )}

          {activeQuestionId !== null && (
            <ActiveQuestionBar
              question={questions.find((q) => q.id === activeQuestionId) ?? null}
              mapping={
                activeQuestionId
                  ? mappingByQuestion.get(activeQuestionId) ?? null
                  : null
              }
              regionCount={activeRegions.length}
            />
          )}

          <div style={{ flex: 1, overflow: "hidden" }}>
            <AnswerPageViewer
              pages={answerPages}
              activeRegions={activeRegions}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function MobileTabButton({
  label,
  count,
  isActive,
  onClick,
}: {
  label: string;
  count: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        height: 36,
        borderRadius: 10,
        border: isActive ? "1.5px solid rgba(232, 82, 26, 0.3)" : "1.5px solid #e8e4df",
        background: isActive ? "#fff8f5" : "#f7f5f2",
        cursor: "pointer",
        transition: "background 0.15s, border-color 0.15s",
        padding: "0 12px",
      }}
    >
      <span
        style={{
          fontSize: 13,
          fontWeight: isActive ? 600 : 500,
          color: isActive ? "#e8521a" : "#6b6560",
          transition: "color 0.15s",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10,
          fontWeight: 600,
          color: isActive ? "#e8521a" : "#a09a94",
          background: isActive ? "rgba(232,82,26,0.1)" : "#ece9e5",
          padding: "1px 6px",
          borderRadius: 99,
          transition: "background 0.15s, color 0.15s",
        }}
      >
        {count}
      </span>
    </button>
  );
}

function StatChip({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        background: "#f7f5f2",
        borderRadius: 8,
        padding: "4px 10px",
        border: "1px solid #e8e4df",
      }}
    >
      <span style={{ fontSize: 13, fontWeight: 700, color }}>{value}</span>
      <span style={{ fontSize: 11, color: "#8a8480" }}>{label}</span>
    </div>
  );
}

function ActiveQuestionBar({
  question,
  mapping,
  regionCount,
}: {
  question: Question | null;
  mapping: AnswerMapping | null;
  regionCount: number;
}) {
  if (!question) return null;

  return (
    <div
      style={{
        padding: "8px 20px",
        background: "#fff8f5",
        borderBottom: "1px solid rgba(232, 82, 26, 0.18)",
        display: "flex",
        alignItems: "center",
        gap: 12,
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#e8521a",
          flexShrink: 0,
        }}
      >
        Q{question.number}
      </span>
      <span
        style={{
          fontSize: 12,
          color: "#4a4540",
          flex: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {question.text}
      </span>
      {mapping ? (
        <span style={{ fontSize: 11, color: "#8a8480", flexShrink: 0 }}>
          {regionCount} region{regionCount !== 1 ? "s" : ""} highlighted
        </span>
      ) : (
        <span
          style={{
            fontSize: 11,
            color: "#a09a94",
            background: "#f4f1ee",
            padding: "2px 8px",
            borderRadius: 99,
            flexShrink: 0,
          }}
        >
          No answer found
        </span>
      )}
    </div>
  );
}

function UnmatchedSection({
  answers,
  onSelect,
}: {
  answers: Answer[];
  onSelect: (answer: Answer) => void;
}) {
  return (
    <div
      style={{
        borderTop: "1px solid #e8e4df",
        flexShrink: 0,
        padding: "10px 8px",
        background: "#fafaf9",
      }}
    >
      <p
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "0.06em",
          color: "#ca8a04",
          textTransform: "uppercase",
          marginBottom: 6,
          paddingLeft: 4,
        }}
      >
        Unmatched Answers ({answers.length})
      </p>
      {answers.map((answer) => (
        <button
          key={answer.id}
          type="button"
          id={`unmatched-answer-${answer.id}`}
          onClick={() => onSelect(answer)}
          style={{
            display: "block",
            width: "100%",
            textAlign: "left",
            padding: "7px 10px",
            borderRadius: 8,
            border: "1px solid #f0e8d0",
            background: "#fffbf0",
            cursor: "pointer",
            marginBottom: 4,
            transition: "background 0.15s",
          }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#6b6560",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              margin: 0,
            }}
          >
            {answer.detectedQuestionNumber
              ? `Detected Q${answer.detectedQuestionNumber}: `
              : ""}
            {answer.text || "(no text)"}
          </p>
          <p style={{ fontSize: 10, color: "#a09a94", margin: "2px 0 0" }}>
            {answer.regions.length} region{answer.regions.length !== 1 ? "s" : ""}
          </p>
        </button>
      ))}
    </div>
  );
}
