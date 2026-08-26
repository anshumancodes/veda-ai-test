"use client";

import { useEffect, useRef } from "react";
import type { DocumentPage } from "@repo/types/types";
import type { AnswerRegion } from "@repo/ai";

interface AnswerPageViewerProps {
  pages: DocumentPage[];
  activeRegions: AnswerRegion[];
}

export function AnswerPageViewer({
  pages,
  activeRegions,
}: AnswerPageViewerProps) {
  // Build a set of page numbers that have active regions
  const activePageNumbers = new Set(activeRegions.map((r) => r.page));

  // Refs for each page container so we can scroll to them
  const pageRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // Scroll to the first active page whenever activeRegions changes
  useEffect(() => {
    if (activeRegions.length === 0) return;

    // Find the lowest page number in the active regions
    const firstActivePage = Math.min(...activeRegions.map((r) => r.page));
    const el = pageRefs.current.get(firstActivePage);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeRegions]);

  if (pages.length === 0) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#a09a94",
          fontSize: 14,
        }}
      >
        No answer-sheet pages loaded.
      </div>
    );
  }

  return (
    <div
      style={{
        height: "100%",
        overflowY: "auto",
        padding: "16px 20px",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      {pages.map((page) => {
        const pageRegions = activeRegions.filter((r) => r.page === page.pageNumber);
        const isActive = activePageNumbers.has(page.pageNumber);

        return (
          <div
            key={page.pageNumber}
            ref={(el) => {
              if (el) pageRefs.current.set(page.pageNumber, el);
              else pageRefs.current.delete(page.pageNumber);
            }}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              border: isActive
                ? "2px solid rgba(232, 82, 26, 0.5)"
                : "1.5px solid #e8e4df",
              boxShadow: isActive
                ? "0 4px 24px rgba(232, 82, 26, 0.12)"
                : "0 2px 12px rgba(0,0,0,0.06)",
              transition: "border-color 0.2s, box-shadow 0.2s",
              background: "#fff",
              flexShrink: 0,
            }}
          >
            {/* Page label */}
            <div
              style={{
                padding: "8px 12px",
                borderBottom: "1px solid #f0eeeb",
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#fafaf9",
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: "#8a8480",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Page {page.pageNumber}
              </span>
              {isActive && (
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#e8521a",
                    background: "#fff0eb",
                    padding: "2px 7px",
                    borderRadius: 99,
                  }}
                >
                  {pageRegions.length} region{pageRegions.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {/* Image + highlight overlays */}
            <div
              style={{
                position: "relative",
                lineHeight: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.dataUrl}
                alt={`Answer sheet page ${page.pageNumber}`}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                }}
              />

              {/* Highlight overlays — normalized coords → percentage positioning */}
              {pageRegions.map((region, idx) => (
                <div
                  key={idx}
                  style={{
                    position: "absolute",
                    left: `${region.x * 100}%`,
                    top: `${region.y * 100}%`,
                    width: `${region.width * 100}%`,
                    height: `${region.height * 100}%`,
                    background: "rgba(232, 82, 26, 0.12)",
                    border: "2px solid rgba(232, 82, 26, 0.75)",
                    borderRadius: 4,
                    pointerEvents: "none",
                    // Subtle animated pulse on first render
                    animation: "highlight-in 0.3s ease forwards",
                  }}
                />
              ))}
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes highlight-in {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
