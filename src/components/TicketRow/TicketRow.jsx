import React from "react";
import { MessageSquare, ChevronRight } from "lucide-react";
import { PriorityBadge } from "../Common/Badge";
import { useTicketStore } from "../../store/ticketStore";

// Relative time formatting helper
const formatRelativeTime = (isoString) => {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return isoString;
  }
};

export const TicketRow = ({ ticket }) => {
  const { selectedTicketId, selectTicket, updateTicketStatus } = useTicketStore();
  const isSelected = selectedTicketId === ticket.id;

  const handleStatusChange = (e) => {
    e.stopPropagation();
    updateTicketStatus(ticket.id, e.target.value);
  };

  return (
    <>
      {/* ============================================================ */}
      {/* DESKTOP TABLE ROW VIEW (hidden on mobile, visible on sm+)   */}
      {/* ============================================================ */}
      <tr
        onClick={() => selectTicket(ticket.id)}
        className={`group hidden sm:table-row transition-colors cursor-pointer border-b border-slate-100 ${
          isSelected
            ? "bg-indigo-50/70 hover:bg-indigo-50"
            : "hover:bg-slate-50/90 bg-white"
        }`}
      >
        {/* Ticket ID & Customer */}
        <td className="py-4 pl-6 pr-4 whitespace-nowrap">
          <div className="flex items-center gap-3">
            <img
              src={ticket.customer.avatar}
              alt={ticket.customer.name}
              className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200 shrink-0 bg-slate-100"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  ticket.customer.name
                )}`;
              }}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors">
                  {ticket.customer.name}
                </span>
                <span className="text-[11px] font-mono font-medium text-slate-400">
                  {ticket.id}
                </span>
              </div>
              <div className="text-xs text-slate-500 truncate max-w-[180px]">
                {ticket.customer.email}
              </div>
            </div>
          </div>
        </td>

        {/* Issue / Subject */}
        <td className="py-4 px-4 max-w-xs md:max-w-md">
          <div className="min-w-0">
            <div className="text-sm font-medium text-slate-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
              {ticket.subject}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {ticket.category}
              </span>
              <span className="text-xs text-slate-400 truncate max-w-[200px]">
                {ticket.description}
              </span>
            </div>
          </div>
        </td>

        {/* Priority Badge */}
        <td className="py-4 px-4 whitespace-nowrap">
          <PriorityBadge priority={ticket.priority} size="sm" />
        </td>

        {/* Status + Quick Changer */}
        <td className="py-4 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
          <div className="inline-flex items-center gap-2">
            <select
              value={ticket.status}
              onChange={handleStatusChange}
              className="text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:border-slate-300 px-2.5 py-1 text-slate-700 shadow-2xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer transition"
            >
              <option value="Open">🟡 Open</option>
              <option value="In Progress">🔵 In Progress</option>
              <option value="Resolved">🟢 Resolved</option>
            </select>
          </div>
        </td>

        {/* Created Date & Thread Count */}
        <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500">
          <div className="flex flex-col">
            <span className="font-medium text-slate-700">
              {formatRelativeTime(ticket.createdAt)}
            </span>
            <span className="text-[11px] text-slate-400">
              {new Date(ticket.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </td>

        {/* Action Arrow */}
        <td className="py-4 pr-6 pl-2 whitespace-nowrap text-right text-slate-400 group-hover:text-indigo-600 transition-colors">
          <div className="flex items-center justify-end gap-2">
            <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-medium">
              <MessageSquare className="w-3.5 h-3.5" />
              {ticket.conversation?.length || 1}
            </span>
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </div>
        </td>
      </tr>

      {/* ============================================================ */}
      {/* MOBILE CARD VIEW (visible on mobile <sm, hidden on sm+)      */}
      {/* ============================================================ */}
      <div
        onClick={() => selectTicket(ticket.id)}
        className={`sm:hidden p-4 rounded-2xl border transition-all cursor-pointer ${
          isSelected
            ? "bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/10"
            : "bg-white border-slate-200 hover:border-slate-300 shadow-2xs"
        }`}
      >
        {/* Top Header: Customer + Priority */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={ticket.customer.avatar}
              alt={ticket.customer.name}
              className="w-9 h-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0 bg-slate-100"
              onError={(e) => {
                e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                  ticket.customer.name
                )}`;
              }}
            />
            <div className="min-w-0">
              <div className="font-semibold text-slate-900 text-sm truncate">
                {ticket.customer.name}
              </div>
              <div className="text-xs text-slate-400 font-mono">{ticket.id}</div>
            </div>
          </div>
          <PriorityBadge priority={ticket.priority} size="sm" />
        </div>

        {/* Subject & Description */}
        <div className="mt-2.5">
          <h4 className="text-sm font-semibold text-slate-900 line-clamp-2">
            {ticket.subject}
          </h4>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {ticket.description}
          </p>
        </div>

        {/* Category & Status Footer */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <select
              value={ticket.status}
              onClick={(e) => e.stopPropagation()}
              onChange={handleStatusChange}
              className="text-xs font-semibold rounded-lg border border-slate-200 bg-white px-2 py-1 text-slate-700 shadow-2xs cursor-pointer"
            >
              <option value="Open">🟡 Open</option>
              <option value="In Progress">🔵 In Progress</option>
              <option value="Resolved">🟢 Resolved</option>
            </select>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5" />
              {ticket.conversation?.length || 1}
            </span>
            <span>{formatRelativeTime(ticket.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  );
};
