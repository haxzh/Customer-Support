import React, { useEffect } from "react";
import { Navbar } from "../components/Navbar/Navbar";
import { StatsCards } from "../components/StatsCards/StatsCards";
import { SearchBar } from "../components/SearchBar/SearchBar";
import { Filters } from "../components/Filters/Filters";
import { TicketList } from "../components/TicketList/TicketList";
import { TicketDetails } from "../components/TicketDetails/TicketDetails";
import { CreateTicketModal } from "../components/Modals/CreateTicketModal";
import { useTicketStore } from "../store/ticketStore";
import { Zap, Clock } from "lucide-react";

export const Dashboard = () => {
  const { fetchTickets } = useTicketStore();

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Welcome & Live Queue Status Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-950/15 relative overflow-hidden">
          {/* Background decorative glow */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 -mb-10 w-56 h-56 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Live Desk • Bengaluru HQ
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-slate-300 text-xs font-medium border border-white/10">
                <Clock className="w-3 h-3 text-indigo-300" /> IST (UTC+5:30)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Customer Support Command Desk
            </h1>
            <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-xl">
              Real-time monitoring for enterprise incidents, UPI payment gateway webhooks, GST e-invoicing, and customer conversation threads.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center gap-3">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-3.5 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-300 font-semibold">
                  Avg First Response
                </div>
                <div className="text-xl font-extrabold text-white">
                  12 mins
                </div>
                <div className="text-[10px] text-emerald-400 font-medium">
                  SLA Target 99.4% Met
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Simple Statistics */}
        <section aria-label="Support Statistics">
          <StatsCards />
        </section>

        {/* Tickets Section with Search, Filters & List */}
        <section className="space-y-4" aria-label="Ticket Management">
          {/* Search & Filter Controls Header */}
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Support Tickets Queue
                </h2>
                <p className="text-xs text-slate-500">
                  Click any ticket to open the full conversation history, inspect payload logs, and post replies.
                </p>
              </div>

              {/* Search Bar */}
              <div className="w-full sm:w-80 md:w-96">
                <SearchBar />
              </div>
            </div>

            {/* Status & Priority Filter Pills */}
            <Filters />
          </div>

          {/* Ticket Table / Card List */}
          <TicketList />
        </section>
      </main>

      {/* Footer */}
      {/* <footer className="mt-auto py-6 border-t border-slate-200 bg-white text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>OmniSupport Pro India Desk</span>
            <span>•</span>
            <span className="text-slate-400">React 19 + Zustand + Tailwind CSS</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Tip: Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">/</kbd> to search</span>
            <span>•</span>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 font-mono text-[10px]">Esc</kbd> to close drawer</span>
          </div>
        </div>
      </footer> */}

      {/* Slide-over Ticket Details Panel */}
      <TicketDetails />

      {/* Create Ticket Modal */}
      <CreateTicketModal />
    </div>
  );
};
