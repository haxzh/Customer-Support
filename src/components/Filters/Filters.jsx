import React from "react";
import { Filter, ArrowUpDown, X } from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

export const Filters = () => {
  const {
    filters,
    setStatusFilter,
    setPriorityFilter,
    setSortBy,
    resetFilters,
    tickets,
    getFilteredTickets,
  } = useTicketStore();

  const filteredCount = getFilteredTickets().length;
  const isFiltered =
    filters.status !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.search !== "" ||
    filters.sortBy !== "newest";

  const statusOptions = [
    { value: "ALL", label: "All Tickets", count: tickets.length },
    {
      value: "Open",
      label: "Open",
      count: tickets.filter((t) => t.status === "Open").length,
    },
    {
      value: "In Progress",
      label: "In Progress",
      count: tickets.filter((t) => t.status === "In Progress").length,
    },
    {
      value: "Resolved",
      label: "Resolved",
      count: tickets.filter((t) => t.status === "Resolved").length,
    },
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl overflow-x-auto scrollbar-none">
        {statusOptions.map((opt) => {
          const isActive = filters.status === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(opt.value)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-white text-slate-900 shadow-xs font-semibold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              <span>{opt.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "bg-slate-300/60 text-slate-600"
                }`}
              >
                {opt.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Controls: Priority Filter, Sorting, Reset */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Priority Filter */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Priority:</span>
          <select
            value={filters.priority}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer pr-1"
          >
            <option value="ALL">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5 shadow-xs">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Sort:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-xs font-semibold text-slate-800 bg-transparent focus:outline-none cursor-pointer pr-1"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">Priority: High &rarr; Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {isFiltered && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}

        {/* Result summary indicator */}
        <div className="text-xs text-slate-500 ml-auto lg:ml-2 font-medium">
          Showing <span className="font-semibold text-slate-900">{filteredCount}</span> of{" "}
          <span className="text-slate-700">{tickets.length}</span> tickets
        </div>
      </div>
    </div>
  );
};
