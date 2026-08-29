"use client";

import Image from "next/image";
import { useState } from "react";

const navItems = [
  {
    label: "Home",
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect
          x="1.5"
          y="1.5"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="9.5"
          y="1.5"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="1.5"
          y="9.5"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <rect
          x="9.5"
          y="9.5"
          width="5"
          height="5"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.3"
        />
      </svg>
    ),
  },
  {
    label: "My Classroom",
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect
          x="1"
          y="3"
          width="14"
          height="9"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M6 12v2M10 12v2M4 14h8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Assignments",
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect
          x="3"
          y="1.5"
          width="10"
          height="13"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M6 5h4M6 8h4M6 11h2"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Exams",
    active: true,
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <rect
          x="2"
          y="2"
          width="12"
          height="12"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.3"
        />
        <path
          d="M2 6h12M6 6v8"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "My Library",
    active: false,
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
        <path
          d="M8 5v3.5l2 1.5"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

const BOX_SHADOW =
  "0px 32px 48px 0px rgba(0, 0, 0, 0.2), 0px 16px 48px 0px rgba(0, 0, 0, 0.12)";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <>
        <aside
          id="app-sidebar"
          style={{
            width: 64,
            height: 765,
            background: "rgba(255, 255, 255, 1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            position: "fixed",
            top: 11,
            left: 10,
            borderRadius: 16,
            paddingTop: 12,
            paddingRight: 24,
            paddingBottom: 12,
            paddingLeft: 24,
            boxShadow: BOX_SHADOW,
            overflow: "hidden",
            zIndex: 100,
            transition: "width 0.2s ease, height 0.2s ease",
          }}
        >
          {/* Top: logo icon */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 0,
              width: "100%",
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginBottom: 12,
              }}
            >
              <Image
                src="/veda-ai-logo.png"
                width={28}
                height={15}
                alt="logo"
              />
            </div>

            {/* Nav icons only */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                width: "100%",
              }}
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  title={item.label}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "8px 0",
                    borderRadius: 9,
                    border: "none",
                    background: item.active ? "#fff4f0" : "transparent",
                    color: item.active ? "#e8521a" : "#8a8480",
                    cursor: "pointer",
                    transition: "background 0.15s, color 0.15s",
                  }}
                >
                  {item.icon}
                </button>
              ))}
            </nav>
          </div>

          {/* Bottom: expand button */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              width: "100%",
            }}
          >
            {/* Settings icon */}
            <button
              type="button"
              title="Settings"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 0",
                borderRadius: 9,
                border: "none",
                background: "transparent",
                color: "#8a8480",
                cursor: "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <circle
                  cx="8"
                  cy="8"
                  r="2.5"
                  stroke="currentColor"
                  strokeWidth="1.3"
                />
                <path
                  d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.2 3.2l.7.7M12.1 12.1l.7.7M3.2 12.8l.7-.7M12.1 3.9l.7-.7"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* School icon */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#e8e4df",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 6v1h16V6L10 2Z" fill="#a09a94" />
                <rect
                  x="3"
                  y="7"
                  width="3"
                  height="9"
                  rx="0.5"
                  fill="#a09a94"
                />
                <rect
                  x="8.5"
                  y="7"
                  width="3"
                  height="9"
                  rx="0.5"
                  fill="#a09a94"
                />
                <rect
                  x="14"
                  y="7"
                  width="3"
                  height="9"
                  rx="0.5"
                  fill="#a09a94"
                />
                <rect
                  x="1"
                  y="16"
                  width="18"
                  height="1.5"
                  rx="0.5"
                  fill="#a09a94"
                />
              </svg>
            </div>

            {/* Expand button */}
            <button
              type="button"
              aria-label="Expand sidebar"
              onClick={() => setCollapsed(false)}
              style={{
                width: 26,
                height: 26,
                borderRadius: 6,
                border: "1px solid #e8e4df",
                background: "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#a09a94",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="12"
                  height="12"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
                <path d="M9 1v12" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </button>
          </div>
        </aside>

        <style>{`
          @media (max-width: 600px) {
            #app-sidebar { display: none !important; }
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <aside
        id="app-sidebar"
        style={{
          width: 304,
          height: 763,
          background: "rgba(255, 255, 255, 1)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexShrink: 0,
          position: "fixed",
          top: 12,
          left: 12,
          borderRadius: 16,
          padding: 24,
          boxShadow: BOX_SHADOW,
          overflow: "hidden",
          zIndex: 100,
          transition: "width 0.2s ease, height 0.2s ease",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: "14px 16px 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #f0eeeb",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 28,
                borderRadius: 7,
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
             <Image
                src="/veda-ai-logo.png"
                width={28}
                height={15}
                alt="logo"
              />
            </div>
            <span
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#1a1a1a",
                letterSpacing: "-0.03em",
              }}
            >
              VedaAI
            </span>
          </div>

          {/* Collapse button */}
          <button
            type="button"
            aria-label="Collapse sidebar"
            onClick={() => setCollapsed(true)}
            style={{
              width: 26,
              height: 26,
              borderRadius: 6,
              border: "1px solid #e8e4df",
              background: "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#a09a94",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
              <rect
                x="1"
                y="1"
                width="12"
                height="12"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path d="M5 1v12" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </button>
        </div>

        {/* CTA Button */}
        <div style={{ padding: "12px 12px 8px" }}>
          <button
            type="button"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
              padding: "9px 14px",
              borderRadius: 999,
              border: "none",
              background: "linear-gradient(135deg, #e8521a, #ff7a45)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "-0.01em",
              boxShadow: "0 3px 12px rgba(232, 82, 26, 0.3)",
              transition: "opacity 0.15s",
            }}
          >
            <Image
              src="/orange_star.png"
              alt="AI"
              width={14}
              height={14}
              style={{
                objectFit: "contain",
                filter: "brightness(0) invert(1)",
              }}
            />
            AI Teacher&apos;s Toolkit
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1, padding: "8px 8px", overflowY: "auto" }}>
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 9,
                padding: "8px 10px",
                borderRadius: 9,
                border: "none",
                background: item.active ? "#fff4f0" : "transparent",
                color: item.active ? "#e8521a" : "#6b6560",
                fontSize: 13,
                fontWeight: item.active ? 600 : 400,
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s, color 0.15s",
                marginBottom: 1,
                letterSpacing: "-0.01em",
              }}
            >
              <span
                style={{
                  color: item.active ? "#e8521a" : "#8a8480",
                  flexShrink: 0,
                  display: "flex",
                }}
              >
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom section */}
        <div
          style={{ borderTop: "1px solid #f0eeeb", padding: "8px 8px 12px" }}
        >
          <button
            type="button"
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "8px 10px",
              borderRadius: 9,
              border: "none",
              background: "transparent",
              color: "#6b6560",
              fontSize: 13,
              fontWeight: 400,
              cursor: "pointer",
              textAlign: "left",
              marginBottom: 6,
              letterSpacing: "-0.01em",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 16 16"
              fill="none"
              style={{ color: "#8a8480", flexShrink: 0 }}
            >
              <circle
                cx="8"
                cy="8"
                r="2.5"
                stroke="currentColor"
                strokeWidth="1.3"
              />
              <path
                d="M8 1.5v1M8 13.5v1M1.5 8h1M13.5 8h1M3.2 3.2l.7.7M12.1 12.1l.7.7M3.2 12.8l.7-.7M12.1 3.9l.7-.7"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            Settings
          </button>

          {/* School card */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              padding: "9px 10px",
              borderRadius: 10,
              background: "#f7f5f2",
              border: "1px solid #ede9e4",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "#e8e4df",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L2 6v1h16V6L10 2Z" fill="#a09a94" />
                <rect
                  x="3"
                  y="7"
                  width="3"
                  height="9"
                  rx="0.5"
                  fill="#a09a94"
                />
                <rect
                  x="8.5"
                  y="7"
                  width="3"
                  height="9"
                  rx="0.5"
                  fill="#a09a94"
                />
                <rect
                  x="14"
                  y="7"
                  width="3"
                  height="9"
                  rx="0.5"
                  fill="#a09a94"
                />
                <rect
                  x="1"
                  y="16"
                  width="18"
                  height="1.5"
                  rx="0.5"
                  fill="#a09a94"
                />
              </svg>
            </div>
            <div style={{ minWidth: 0 }}>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#2a2520",
                  letterSpacing: "-0.01em",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Delhi Public School
              </p>
              <p
                style={{
                  fontSize: 11,
                  color: "#a09a94",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginTop: 1,
                }}
              >
                Bokaro Steel City
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 600px) {
          #app-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}
