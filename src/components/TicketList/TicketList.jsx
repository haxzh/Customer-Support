import React from "react";
import {
  Inbox,
  RefreshCw,
  SearchX,
  Plus,
  ShieldAlert,
} from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";
import { TicketRow } from "../TicketRow/TicketRow";
import { TableSkeleton } from "../Common/Skeleton";

export const TicketList = () => {
  const {
    loading,
    error,
    getFilteredTickets,
    fetchTickets,
    resetFilters,
    setCreateModalOpen,
    filters,
    simulateApiError,
    toggleSimulateError,
  } = useTicketStore();

  const tickets = getFilteredTickets();

  // 1. Loading State
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <TableSkeleton />
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-rose-200 p-8 sm:p-12 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-4 ring-8 ring-rose-50">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          Unable to Load Tickets
        </h3>
        <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
          {error}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={fetchTickets}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-xs cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Connection</span>
          </button>

          {simulateApiError && (
            <button
              onClick={() => {
                toggleSimulateError();
                fetchTickets();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
            >
              <span>Disable Error Simulation</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. Empty State (No tickets match active search / filter)
  if (tickets.length === 0) {
    const hasActiveFilters =
      filters.status !== "ALL" ||
      filters.priority !== "ALL" ||
      filters.search !== "";

    return (
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-16 text-center shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-4">
          {hasActiveFilters ? (
            <SearchX className="w-7 h-7" />
          ) : (
            <Inbox className="w-7 h-7" />
          )}
        </div>
        <h3 className="text-lg font-bold text-slate-900 mb-1">
          {hasActiveFilters ? "No matching tickets found" : "No tickets yet"}
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          {hasActiveFilters
            ? "Try adjusting your search query, status, or priority filters to find what you're looking for."
            : "Your queue is clean! When new customer issues arrive, they will appear right here."}
        </p>

        <div className="flex items-center justify-center gap-3">
          {hasActiveFilters ? (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
            >
              <span>Clear All Filters</span>
            </button>
          ) : (
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition shadow-xs cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create First Ticket</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  // 4. Populated Tickets List
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
      {/* Desktop Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th scope="col" className="py-3.5 pl-6 pr-4">
                Customer & Ticket
              </th>
              <th scope="col" className="py-3.5 px-4">
                Issue & Subject
              </th>
              <th scope="col" className="py-3.5 px-4">
                Priority
              </th>
              <th scope="col" className="py-3.5 px-4">
                Status
              </th>
              <th scope="col" className="py-3.5 px-4">
                Created
              </th>
              <th scope="col" className="py-3.5 pr-6 pl-2 text-right">
                Messages
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {tickets.map((ticket) => (
              <TicketRow key={ticket.id} ticket={ticket} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards Stack */}
      <div className="sm:hidden divide-y divide-slate-100 p-3 flex flex-col gap-3">
        {tickets.map((ticket) => (
          <TicketRow key={ticket.id} ticket={ticket} />
        ))}
      </div>
    </div>
  );
};
