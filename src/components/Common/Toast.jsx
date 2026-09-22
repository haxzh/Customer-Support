import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

export const ToastContainer = () => {
  const { toasts, removeToast } = useTicketStore();

  if (!toasts || toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
    error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    info: <Info className="w-5 h-5 text-indigo-500 shrink-0" />,
  };

  const borders = {
    success: "border-emerald-200 bg-white shadow-emerald-500/5",
    error: "border-rose-200 bg-white shadow-rose-500/5",
    warning: "border-amber-200 bg-white shadow-amber-500/5",
    info: "border-indigo-200 bg-white shadow-indigo-500/5",
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border shadow-xl transition-all duration-300 animate-fade-in ${
            borders[toast.type] || borders.info
          }`}
        >
          {icons[toast.type] || icons.info}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-slate-900">{toast.title}</h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-slate-400 hover:text-slate-700 transition p-1 -mr-1 -mt-1 rounded-lg hover:bg-slate-100"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
