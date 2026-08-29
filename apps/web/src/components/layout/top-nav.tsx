import {
  ArrowLeft,
  Bell,
  ChevronDown,
  Clipboard,
  CircleHelp,
  Sparkles,
} from "lucide-react";

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
  return (
    <nav
      style={{
        position: "absolute",
        top: "12px",
        left: "327px",
        width: "1100px",
        height: "56px",
        borderRadius: "16px",
        paddingLeft: "24px",
        paddingRight: "8px",
        gap: "10px",
        background: "rgba(255, 255, 255, 0.75)",
        opacity: 1,
        rotate: "0deg",
      }}
      className="flex justify-between backdrop-blur-md"
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
          <Clipboard
            size={19}
            strokeWidth={2}
            className="text-[#9B9B9B]"
          />

          <span className="text-[15px] font-medium text-[#9B9B9B]">
            {title}
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="ml-auto flex h-full items-center gap-3">
        {/* Help */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full
                     text-[#292929] transition hover:bg-black/5"
        >
          <CircleHelp size={25} strokeWidth={2} />
        </button>

        {/* Notifications */}
        <button
          className="relative flex h-9 w-9 items-center justify-center rounded-full
                     text-[#292929] transition hover:bg-black/5"
        >
          <Bell size={23} strokeWidth={2} />

          {/* Notification dot */}
          <span className="absolute right-[5px] top-[3px] h-2 w-2 rounded-full bg-[#FF5B36]" />
        </button>

        {/* Sparkles */}
        <button
          className="flex h-9 w-9 items-center justify-center rounded-full
                     text-[#292929] transition hover:bg-black/5"
        >
          <Sparkles size={22} strokeWidth={2} />
        </button>

        {/* User */}
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

          <ChevronDown
            size={18}
            strokeWidth={2}
            className="ml-1 text-[#292929]"
          />
        </button>
      </div>
    </nav>
  );
}