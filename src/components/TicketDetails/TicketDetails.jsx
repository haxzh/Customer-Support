import React, { useEffect, useState } from "react";
import {
  X,
  Mail,
  Phone,
  Globe,
  Clock,
  Calendar,
  Trash2,
  Tag,
  MessageSquare,
} from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";
import { PlanBadge } from "../Common/Badge";
import { Conversation } from "./Conversation";
import { ReplyBox } from "./ReplyBox";

export const TicketDetails = () => {
  const {
    getSelectedTicket,
    closeTicketDetails,
    updateTicketStatus,
    updateTicketPriority,
    deleteTicket,
  } = useTicketStore();

  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const ticket = getSelectedTicket();

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeTicketDetails();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeTicketDetails]);

  if (!ticket) return null;

  const handleDelete = async () => {
    await deleteTicket(ticket.id);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop overlay */}
      <div
        onClick={closeTicketDetails}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col animate-slide-in">
          {/* ======================================================== */}
          {/* HEADER                                                  */}
          {/* ======================================================== */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/70 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200/60">
                  {ticket.id}
                </span>
                <span className="text-xs font-medium text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded">
                  {ticket.category}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-2 leading-snug">
                {ticket.subject}
              </h2>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Delete button */}
              {isConfirmingDelete ? (
                <div className="flex items-center gap-1.5 bg-rose-50 border border-rose-200 p-1 rounded-lg">
                  <span className="text-[11px] font-semibold text-rose-700 px-1">
                    Delete?
                  </span>
                  <button
                    onClick={handleDelete}
                    className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-600 text-white hover:bg-rose-700 transition cursor-pointer"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setIsConfirmingDelete(false)}
                    className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-200 text-slate-700 hover:bg-slate-300 transition cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsConfirmingDelete(true)}
                  title="Delete ticket"
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={closeTicketDetails}
                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* QUICK CONTROLS BAR (Status & Priority Adjusters)        */}
          {/* ======================================================== */}
          <div className="px-5 py-3 bg-white border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Status Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Status:</span>
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg">
                {["Open", "In Progress", "Resolved"].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateTicketStatus(ticket.id, st)}
                    className={`px-2.5 py-1 rounded-md font-semibold text-xs transition-all cursor-pointer ${
                      ticket.status === st
                        ? st === "Open"
                          ? "bg-amber-500 text-white shadow-xs"
                          : st === "In Progress"
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-emerald-600 text-white shadow-xs"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-slate-500 font-medium">Priority:</span>
              <select
                value={ticket.priority}
                onChange={(e) =>
                  updateTicketPriority(ticket.id, e.target.value)
                }
                className="font-semibold text-slate-800 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer"
              >
                <option value="High">High Priority 🔥</option>
                <option value="Medium">Medium Priority ⚠️</option>
                <option value="Low">Low Priority ⬇️</option>
              </select>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCROLLABLE CONTENT BODY                                  */}
          {/* ======================================================== */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            {/* Customer Information Card */}
            <div className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img
                    src={ticket.customer.avatar}
                    alt={ticket.customer.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-xs"
                    onError={(e) => {
                      e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                        ticket.customer.name
                      )}`;
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {ticket.customer.name}
                      </h3>
                      <PlanBadge plan={ticket.customer.plan} />
                    </div>
                    <p className="text-xs text-slate-500 font-medium">
                      {ticket.customer.company}
                    </p>
                  </div>
                </div>
              </div>

              {/* Customer contact & meta grid */}
              <div className="mt-3.5 pt-3 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <a
                    href={`mailto:${ticket.customer.email}`}
                    className="text-indigo-600 hover:underline truncate"
                  >
                    {ticket.customer.email}
                  </a>
                </div>

                {ticket.customer.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ticket.customer.phone}</span>
                  </div>
                )}

                {ticket.customer.timezone && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ticket.customer.timezone}</span>
                  </div>
                )}

                {ticket.customer.location && (
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{ticket.customer.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Issue Description Block */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Issue Summary
              </h4>
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/60 text-xs sm:text-sm text-slate-800 leading-relaxed">
                {ticket.description}
              </div>

              {/* Tags */}
              {ticket.tags && ticket.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400" />
                  {ticket.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Timeline & Metadata */}
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-slate-100 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Created Date</div>
                  <div className="font-semibold text-slate-700">
                    {new Date(ticket.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Last Activity</div>
                  <div className="font-semibold text-slate-700">
                    {new Date(ticket.updatedAt || ticket.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation Messages Thread */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Conversation Thread ({ticket.conversation?.length || 0})
                </h4>
              </div>

              <Conversation conversation={ticket.conversation} />
            </div>
          </div>

          {/* ======================================================== */}
          {/* REPLY COMPOSER FOOTER                                    */}
          {/* ======================================================== */}
          <ReplyBox ticketId={ticket.id} currentStatus={ticket.status} />
        </div>
      </div>
    </div>
  );
};
