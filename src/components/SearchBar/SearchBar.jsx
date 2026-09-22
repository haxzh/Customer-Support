import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

export const SearchBar = () => {
  const { filters, setSearch } = useTicketStore();
  const inputRef = useRef(null);

  // Keyboard shortcut: Press '/' to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative flex-1 min-w-[240px]">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
        <Search className="w-4 h-4" />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={filters.search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by customer, subject, #TCK-ID, email..."
        className="w-full pl-10 pr-20 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
      />

      <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
        {filters.search ? (
          <button
            onClick={() => setSearch("")}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-100 transition"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        ) : (
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 border border-slate-200 rounded text-[10px] font-mono text-slate-400 bg-slate-50">
            /
          </kbd>
        )}
      </div>
    </div>
  );
};
