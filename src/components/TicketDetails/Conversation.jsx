import React from "react";
import { ShieldCheck } from "lucide-react";

export const Conversation = ({ conversation = [] }) => {
  if (!conversation || conversation.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        No conversation messages yet.
      </div>
    );
  }

  const formatMessageTime = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    } catch {
      return isoString;
    }
  };

  const formatMessageDate = (isoString) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-4">
      {conversation.map((msg, index) => {
        const isAgent = msg.sender === "agent";

        return (
          <div
            key={msg.id || index}
            className={`flex items-start gap-3 ${
              isAgent ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <img
              src={msg.senderAvatar}
              alt={msg.senderName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-white shrink-0 mt-0.5 shadow-2xs"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  msg.senderName || "User"
                )}`;
              }}
            />

            {/* Message Bubble Container */}
            <div
              className={`flex flex-col max-w-[85%] ${
                isAgent ? "items-end" : "items-start"
              }`}
            >
              {/* Sender Name & Badge & Time */}
              <div
                className={`flex items-center gap-1.5 mb-1 text-[11px] ${
                  isAgent ? "flex-row-reverse text-indigo-700" : "text-slate-600"
                }`}
              >
                <span className="font-semibold">{msg.senderName}</span>
                {isAgent && (
                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-indigo-100 text-indigo-800">
                    <ShieldCheck className="w-2.5 h-2.5" /> Support
                  </span>
                )}
                <span className="text-slate-400">
                  {formatMessageDate(msg.timestamp)} • {formatMessageTime(msg.timestamp)}
                </span>
              </div>

              {/* Speech Bubble */}
              <div
                className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAgent
                    ? "bg-indigo-600 text-white rounded-tr-none shadow-sm shadow-indigo-600/10"
                    : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/60"
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
