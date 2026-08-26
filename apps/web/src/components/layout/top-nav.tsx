"use client";

import Image from "next/image";

export function TopNav() {
  return (
    <nav
      className="sticky top-0 z-50 flex h-12 w-full items-center px-4"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #e9e6e3",
        boxShadow: "0 1px 0 rgba(124, 58, 237, 0.9)",
      }}
    >
      {/* Left */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Go back"
          className="flex h-7 w-7 items-center justify-center rounded-md"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M10 3L5 8L10 13"
              stroke="#5f5a56"
              strokeWidth="1.35"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <span
          style={{
            fontSize: 11,
            fontWeight: 400,
            color: "#77716c",
            letterSpacing: "-0.01em",
          }}
        >
          Exams
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Help */}
        <button
          type="button"
          aria-label="Help"
          className="flex h-7 w-7 items-center justify-center"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
          >
            <circle
              cx="8"
              cy="8"
              r="6.5"
              stroke="#4f4a46"
              strokeWidth="1.25"
            />
            <path
              d="M6.3 6.1C6.45 5.25 7.1 4.7 8 4.7C8.95 4.7 9.6 5.4 9.6 6.25C9.6 7.05 9.1 7.5 8.55 7.85C8.1 8.15 7.9 8.45 7.9 8.9"
              stroke="#4f4a46"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <circle
              cx="7.9"
              cy="11"
              r="0.65"
              fill="#4f4a46"
            />
          </svg>
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-7 w-7 items-center justify-center"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M8 2.1C5.8 2.1 4.2 3.85 4.2 6v2.8L3 10.5h10L11.8 8.8V6C11.8 3.85 10.2 2.1 8 2.1Z"
              stroke="#5b5550"
              strokeWidth="1.15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.6 12.3C6.7 12.9 7.2 13.3 8 13.3C8.8 13.3 9.3 12.9 9.4 12.3"
              stroke="#5b5550"
              strokeWidth="1.15"
              strokeLinecap="round"
            />
          </svg>

          <span
            className="absolute right-[5px] top-[3px] h-[5px] w-[5px] rounded-full"
            style={{
              background: "#e8521a",
              border: "1px solid white",
            }}
          />
        </button>

        {/* AI sparkle */}
        <button
          type="button"
          aria-label="AI tools"
          className="flex h-7 w-7 items-center justify-center"
        >
          <Image
            src="/orange_star.png"
            alt="AI"
            width={16}
            height={16}
            style={{ objectFit: "contain" }}
          />
        </button>

        {/* User */}
        <button
          type="button"
          className="ml-0.5 flex items-center gap-1.5"
        >
          <div
            className="flex h-6 w-6 items-center justify-center rounded-full"
            style={{
              background: "#f3f3f3",
              overflow: "hidden",
            }}
          >
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#444",
              }}
            >
              M
            </span>
          </div>

          <span
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: "#302d2a",
              whiteSpace: "nowrap",
            }}
          >
            Madhur Rastogi
          </span>

          <svg
            width="10"
            height="10"
            viewBox="0 0 12 12"
            fill="none"
          >
            <path
              d="M3.5 4.5L6 7L8.5 4.5"
              stroke="#716b66"
              strokeWidth="1.1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </nav>
  );
}