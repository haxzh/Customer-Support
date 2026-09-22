import React from "react";
import {
  Inbox,
  Clock,
  CheckCircle2,
  AlertOctagon,
} from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";
import { StatsSkeleton } from "../Common/Skeleton";

export const StatsCards = () => {
  const { getStats, loading, filters, setStatusFilter, setPriorityFilter } =
    useTicketStore();

  if (loading) {
    return <StatsSkeleton />;
  }

  const stats = getStats();

  const cards = [
    {
      id: "total",
      label: "Total Tickets",
      value: stats.total,
      subtext: `${stats.highPriority} high priority`,
      icon: Inbox,
      color: "from-blue-500 to-indigo-600",
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      filterValue: "ALL",
      isActive: filters.status === "ALL" && filters.priority === "ALL",
      onClick: () => {
        setStatusFilter("ALL");
        setPriorityFilter("ALL");
      },
    },
    {
      id: "open",
      label: "Open Tickets",
      value: stats.open,
      subtext: "Needs initial response",
      icon: AlertOctagon,
      color: "from-amber-500 to-orange-500",
      textColor: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      filterValue: "Open",
      isActive: filters.status === "Open",
      onClick: () => setStatusFilter("Open"),
    },
    {
      id: "inProgress",
      label: "In Progress",
      value: stats.inProgress,
      subtext: "Actively investigating",
      icon: Clock,
      color: "from-indigo-500 to-violet-600",
      textColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      filterValue: "In Progress",
      isActive: filters.status === "In Progress",
      onClick: () => setStatusFilter("In Progress"),
    },
    {
      id: "resolved",
      label: "Resolved",
      value: stats.resolved,
      subtext: `${stats.resolutionRate}% resolution rate`,
      icon: CheckCircle2,
      color: "from-emerald-500 to-teal-600",
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      filterValue: "Resolved",
      isActive: filters.status === "Resolved",
      onClick: () => setStatusFilter("Resolved"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={card.onClick}
            className={`group text-left relative overflow-hidden bg-white p-5 rounded-2xl border transition-all duration-200 cursor-pointer hover:shadow-md active:scale-[0.99] ${card.isActive
                ? "border-indigo-500 ring-2 ring-indigo-500/10 shadow-sm"
                : "border-slate-200/80 hover:border-slate-300"
              }`}
          >
            {/* Top Accent Bar when active */}
            {card.isActive && (
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${card.color}`}
              />
            )}

            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {card.label}
                </p>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
                    {card.value}
                  </span>
                </div>
              </div>

              <div
                className={`w-11 h-11 rounded-xl ${card.bgColor} ${card.textColor} flex items-center justify-center transition-transform group-hover:scale-110`}
              >
                <Icon className="w-5 h-5" />
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span className="font-medium truncate">{card.subtext}</span>
              <span className="text-[11px] font-semibold text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Filter &rarr;
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
};
