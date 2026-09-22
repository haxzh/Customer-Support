import React from "react";

export const TableSkeleton = () => {
  return (
    <div className="w-full divide-y divide-slate-200/80 animate-pulse">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="p-4 sm:px-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-slate-200 shrink-0" />
            <div className="space-y-2 flex-1 max-w-md">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3.5 bg-slate-200 rounded w-4/5" />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <div className="h-6 w-16 bg-slate-200 rounded-md" />
            <div className="h-6 w-24 bg-slate-200 rounded-full" />
            <div className="h-4 w-20 bg-slate-200 rounded" />
          </div>
          <div className="h-8 w-24 bg-slate-200 rounded-lg shrink-0" />
        </div>
      ))}
    </div>
  );
};

export const StatsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-200 shrink-0" />
          <div className="space-y-2 flex-1">
            <div className="h-3 bg-slate-200 rounded w-1/2" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
};
