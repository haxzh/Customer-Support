import React, { useState } from "react";
import { Send, Sparkles, CheckCheck, Loader2 } from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

export const ReplyBox = ({ ticketId, currentStatus }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReply } = useTicketStore();

  const cannedTemplates = [
    {
      label: "🔍 Logs Checking",
      text: "Namaste, thank you for reaching out. We are analyzing the server gateway logs and tracing transaction payloads. We will share an update shortly.",
    },
    {
      label: "✅ Patch Deployed",
      text: "We have deployed a hotfix patch to resolve this issue in the Mumbai region cluster. Please verify on your end and let us know if everything is working smoothly!",
    },
    {
      label: "📋 Request GST / Logs",
      text: "Could you please share the error payload JSON along with your GSTIN and merchant transaction ID for faster resolution?",
    },
  ];

  const handleSubmit = async (statusChange) => {
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await addReply(ticketId, {
      content: content.trim(),
      statusChange,
    });
    setIsSubmitting(false);

    if (success) {
      setContent("");
    }
  };

  return (
    <div className="bg-white border-t border-slate-200 p-4 space-y-3">
      {/* Quick canned response chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        <span className="text-slate-400 flex items-center gap-1 shrink-0 font-medium mr-1">
          <Sparkles className="w-3 h-3 text-indigo-500" /> Quick Templates:
        </span>
        {cannedTemplates.map((template, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setContent(template.text)}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-600 border border-slate-200/80 transition-colors whitespace-nowrap cursor-pointer"
          >
            {template.label}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a response to the customer (supports Markdown & code blocks)..."
          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-none shadow-2xs"
        />
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400">
          Replying as <span className="font-semibold text-slate-700">Harsh Vardhan (Lead Operations)</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Send and Mark as In Progress */}
          {currentStatus !== "In Progress" && (
            <button
              type="button"
              disabled={!content.trim() || isSubmitting}
              onClick={() => handleSubmit("In Progress")}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
            >
              Reply & In Progress
            </button>
          )}

          {/* Send and Resolve */}
          {currentStatus !== "Resolved" && (
            <button
              type="button"
              disabled={!content.trim() || isSubmitting}
              onClick={() => handleSubmit("Resolved")}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 disabled:opacity-50 disabled:pointer-events-none transition cursor-pointer"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Reply & Resolve</span>
            </button>
          )}

          {/* Regular Send */}
          <button
            type="button"
            disabled={!content.trim() || isSubmitting}
            onClick={() => handleSubmit()}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none transition shadow-xs cursor-pointer"
          >
            {isSubmitting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Send Reply</span>
          </button>
        </div>
      </div>
    </div>
  );
};
