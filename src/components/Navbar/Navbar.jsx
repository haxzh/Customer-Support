import image from "./image.png";
import React from "react";
import {
  Headset,
  Plus,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

export const Navbar = () => {
  const {
    setCreateModalOpen,
    resetDemoData,
    simulateApiError,
    toggleSimulateError,
    fetchTickets,
  } = useTicketStore();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 ring-2 ring-indigo-500/20">
              <Headset className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold tracking-tight text-slate-900">
                  Omni<span className="text-indigo-600">Support</span>
                </span>

              </div>
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Error Simulator Toggle for Testing */}
            <button
              onClick={() => {
                toggleSimulateError();
                fetchTickets();
              }}
              title={
                simulateApiError
                  ? "Simulated Error Active: Click to restore API"
                  : "Click to simulate an API 500 failure & test error handling"
              }
              className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${simulateApiError
                ? "bg-rose-50 text-rose-700 border-rose-300 ring-2 ring-rose-500/20"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                }`}
            >
              <AlertTriangle className={`w-3.5 h-3.5 ${simulateApiError ? "text-rose-600 animate-bounce" : "text-slate-400"}`} />
              <span>{simulateApiError ? "Simulated Error ON" : "Test Error State"}</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              onClick={resetDemoData}
              title="Reset dataset to initial  mock tickets"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 bg-slate-100/80 hover:bg-slate-200/80 border border-slate-200 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Reset Demo</span>
            </button>

            {/* Create New Ticket Button */}
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-sm shadow-indigo-600/30 transition-all duration-150 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New Ticket</span>
            </button>

            {/* Support Agent Profile Avatar */}
            <div className="hidden lg:flex items-center gap-3 pl-3 ml-2 border-l border-slate-200">
              <div className="relative">
                <img
                  src={image}
                  alt="Harsh Shakya"
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-indigo-500/30"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-slate-800 leading-tight">
                  Harsh Shakya
                </div>
                <div className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                  Support Lead
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
