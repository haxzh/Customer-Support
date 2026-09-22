import React from "react";
import { AlertCircle, Clock, CheckCircle2, Flame, ArrowDown } from "lucide-react";

/**
 * Status Badge Component
 */
export const StatusBadge = ({ status, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold",
  };

  const statusConfigs = {
    Open: {
      bg: "bg-amber-50 text-amber-700 border-amber-200/80 ring-1 ring-amber-400/20",
      dot: "bg-amber-500",
      icon: Clock,
      label: "Open",
    },
    "In Progress": {
      bg: "bg-indigo-50 text-indigo-700 border-indigo-200/80 ring-1 ring-indigo-400/20",
      dot: "bg-indigo-600 animate-pulse",
      icon: Clock,
      label: "In Progress",
    },
    Resolved: {
      bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80 ring-1 ring-emerald-400/20",
      dot: "bg-emerald-500",
      icon: CheckCircle2,
      label: "Resolved",
    },
  };

  const config = statusConfigs[status] || statusConfigs["Open"];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border transition-all ${config.bg} ${sizeClasses[size]} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      <span>{config.label}</span>
    </span>
  );
};

/**
 * Priority Badge Component
 */
export const PriorityBadge = ({ priority, size = "md", className = "" }) => {
  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-medium",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-semibold",
  };

  const priorityConfigs = {
    High: {
      bg: "bg-rose-50 text-rose-700 border-rose-200 ring-1 ring-rose-400/20",
      icon: Flame,
      label: "High",
      iconColor: "text-rose-600",
    },
    Medium: {
      bg: "bg-orange-50 text-orange-700 border-orange-200 ring-1 ring-orange-400/20",
      icon: AlertCircle,
      label: "Medium",
      iconColor: "text-orange-500",
    },
    Low: {
      bg: "bg-slate-100 text-slate-700 border-slate-200",
      icon: ArrowDown,
      label: "Low",
      iconColor: "text-slate-500",
    },
  };

  const config = priorityConfigs[priority] || priorityConfigs["Low"];
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md border ${config.bg} ${sizeClasses[size]} ${className}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
      <span>{config.label}</span>
    </span>
  );
};

/**
 * Plan / Customer Tier Badge Component
 */
export const PlanBadge = ({ plan = "Starter" }) => {
  const planStyles = {
    Enterprise: "bg-purple-100 text-purple-800 border-purple-200",
    Pro: "bg-blue-100 text-blue-800 border-blue-200",
    Starter: "bg-slate-100 text-slate-700 border-slate-200",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
        planStyles[plan] || planStyles["Starter"]
      }`}
    >
      {plan}
    </span>
  );
};
