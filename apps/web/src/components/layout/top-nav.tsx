"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  Clipboard,
  CircleHelp,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const mobileNavItems = [
  { label: "Home" },
  { label: "My Classroom" },
  { label: "Assignments" },
  { label: "Exams", active: true },
  { label: "My Library" },
  { label: "Settings" },
];

interface NavbarProps {
  title?: string;
  userName?: string;
  avatarUrl?: string;
}

export default function TopNav({
  title = "Exams",
  userName = "Madhur Rastogi",
  avatarUrl,
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop nav (≥ 768 px) */}
      <nav
        className="top-nav-desktop"
        style={{
          position: "absolute",
          top: "12px",
          left: "327px",
          right: "16px",
          width: "auto",
          height: "56px",
          borderRadius: "16px",
          paddingLeft: "24px",
          paddingRight: "8px",
          gap: "10px",
          background: "rgba(255, 255, 255, 0.75)",
          opacity: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 90,
        }}
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full
                       text-[#292929] transition hover:bg-black/5"
          >
            <ArrowLeft size={24} strokeWidth={2} />
          </button>

          <div className="flex items-center gap-2.5">
            <Clipboard size={19} strokeWidth={2} className="text-[#9B9B9B]" />
            <span className="text-[15px] font-medium text-[#9B9B9B]">
              {title}
            </span>
          </div>
        </div>

        {/* Right */}
        <div className="ml-auto flex h-full items-center gap-3">
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full
                       text-[#292929] transition hover:bg-black/5"
          >
            <CircleHelp size={25} strokeWidth={2} />
          </button>

          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full
                       text-[#292929] transition hover:bg-black/5"
          >
            <Bell size={23} strokeWidth={2} />
            <span className="absolute right-[5px] top-[3px] h-2 w-2 rounded-full bg-[#FF5B36]" />
          </button>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full
                       text-[#292929] transition hover:bg-black/5"
          >
            <Sparkles size={22} strokeWidth={2} />
          </button>

          <button className="ml-1 flex items-center gap-2.5 rounded-full py-1 pl-1 pr-1.5">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={userName}
                className="h-9 w-9 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#242424] text-sm font-semibold text-white">
                {userName.charAt(0)}
              </div>
            )}
            <span className="text-[15px] font-semibold text-[#292929]">
              {userName}
            </span>
            <ChevronDown size={18} strokeWidth={2} className="ml-1 text-[#292929]" />
          </button>
        </div>
      </nav>

      {/* ── Mobile nav (< 768 px) ─────────────────────────────────────── */}
      <header
        className="top-nav-mobile"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 200,
          width: "100%",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 16,
          paddingRight: 12,
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        {/* Left — back + brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>

          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                background: "#1a1a1a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Image src="/orange_star.png" alt="VedaAI" width={13} height={13} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
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
        </div>

        {/* Right — bell + avatar + hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {/* Bell */}
          <button
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 9999,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#292929",
            }}
          >
            <Bell size={20} strokeWidth={2} />
            <span
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#FF5B36",
              }}
            />
          </button>

          {/* Avatar */}
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={userName}
              style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "#242424",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 600,
                color: "#fff",
                flexShrink: 0,
              }}
            >
              {userName.charAt(0)}
            </div>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              color: "#1a1a1a",
            }}
            aria-label="Open menu"
          >
            <Menu size={22} strokeWidth={2} />
          </button>
        </div>
      </header>

      {/* ── Mobile slide-in menu drawer ──────────────────────────────── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.35)",
              zIndex: 300,
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(2px)",
            }}
          />

          {/* Drawer panel */}
          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "76vw",
              maxWidth: 300,
              background: "#fff",
              zIndex: 400,
              display: "flex",
              flexDirection: "column",
              padding: "16px 0 24px",
              boxShadow: "-8px 0 32px rgba(0,0,0,0.18)",
              animation: "slideInRight 0.22s ease",
            }}
          >
            {/* Drawer header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px 16px",
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
                  <Image src="/orange_star.png" alt="VedaAI" width={14} height={14} style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.03em" }}>
                  VedaAI
                </span>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "none",
                  background: "#f5f3f0",
                  cursor: "pointer",
                  color: "#6b6560",
                }}
                aria-label="Close menu"
              >
                <X size={17} strokeWidth={2} />
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
              {mobileNavItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 12px",
                    borderRadius: 10,
                    border: "none",
                    background: item.active ? "#fff4f0" : "transparent",
                    color: item.active ? "#e8521a" : "#6b6560",
                    fontSize: 14,
                    fontWeight: item.active ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: 2,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.label}
                  {item.active && (
                    <span
                      style={{
                        marginLeft: "auto",
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#e8521a",
                        flexShrink: 0,
                      }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* User info at bottom */}
            <div
              style={{
                borderTop: "1px solid #f0eeeb",
                padding: "14px 16px 0",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {avatarUrl ? (
                <img src={avatarUrl} alt={userName} style={{ width: 36, height: 36, borderRadius: "50%", objectFit: "cover" }} />
              ) : (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: "#242424",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#fff",
                    flexShrink: 0,
                  }}
                >
                  {userName.charAt(0)}
                </div>
              )}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a", letterSpacing: "-0.01em", margin: 0 }}>
                  {userName}
                </p>
                <p style={{ fontSize: 11, color: "#a09a94", margin: 0, marginTop: 1 }}>
                  Delhi Public School
                </p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Responsive visibility + drawer animation ──────────────────── */}
      <style>{`
        .top-nav-desktop { display: flex !important; }
        .top-nav-mobile  { display: none  !important; }

        @media (max-width: 1023px) {
          .top-nav-desktop {
            left: 88px !important;
          }
        }

        @media (max-width: 767px) {
          .top-nav-desktop { display: none  !important; }
          .top-nav-mobile  { display: flex !important; }
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </>
  );
}