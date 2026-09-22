import React, { useState } from "react";
import { X, Plus, AlertCircle, Loader2 } from "lucide-react";
import { useTicketStore } from "../../store/ticketStore";

export const CreateTicketModal = () => {
  const { isCreateModalOpen, setCreateModalOpen, createTicket } = useTicketStore();

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    company: "",
    plan: "Enterprise",
    subject: "",
    category: "Payment Gateway & UPI",
    priority: "Medium",
    description: "",
    tagsInput: "UPI, India Desk, Priority",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isCreateModalOpen) return null;

  const categories = [
    "Payment Gateway & UPI",
    "Billing & GST Compliance",
    "KYC & Identity Verification",
    "Real-time WebSockets & API",
    "Telecom & DLT SMS",
    "Domain & SSL Security",
    "Infrastructure & Capacity",
    "General Support",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.customerEmail.trim() || !formData.subject.trim() || !formData.description.trim()) {
      setErrorMsg("Please fill out all required fields marked with *");
      return;
    }

    setErrorMsg("");
    setIsSubmitting(true);

    const tags = formData.tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newTicket = await createTicket({
      customerName: formData.customerName.trim(),
      customerEmail: formData.customerEmail.trim(),
      company: formData.company.trim() || "Direct Enterprise Customer",
      plan: formData.plan,
      subject: formData.subject.trim(),
      category: formData.category,
      priority: formData.priority,
      description: formData.description.trim(),
      tags,
    });

    setIsSubmitting(false);

    if (newTicket) {
      setFormData({
        customerName: "",
        customerEmail: "",
        company: "",
        plan: "Enterprise",
        subject: "",
        category: "Payment Gateway & UPI",
        priority: "Medium",
        description: "",
        tagsInput: "UPI, India Desk, Priority",
      });
    }
  };

  const handleFillSample = () => {
    setFormData({
      customerName: "Kunal Shah",
      customerEmail: "kunal.shah@cred.club",
      company: "CRED (Dreamplug Technologies)",
      plan: "Enterprise",
      subject: "BBPS NPCI fast settlement batch reconciliation delay for credit card payments",
      category: "Payment Gateway & UPI",
      priority: "High",
      description: "Our evening batch of ₹18.5 Crores credit card settlements via BBPS is pending final ACK from NPCI switch. Need immediate verification of our outgoing API payload queue.",
      tagsInput: "BBPS, Settlement, CRED, High Volume",
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setCreateModalOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-fade-in"
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-xl animate-fade-in border border-slate-200">
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/75">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                Log New Support Ticket
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Create a new customer ticket into the queue.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFillSample}
                className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
              >
                Fill Sample
              </button>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700 font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Customer Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  placeholder="e.g. Kunal Shah / Priya Patel"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Email <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) =>
                    setFormData({ ...formData, customerEmail: e.target.value })
                  }
                  placeholder="kunal@cred.club / user@company.in"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Company & Plan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="e.g. CRED / Razorpay / Swiggy"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Customer Plan Tier
                </label>
                <select
                  value={formData.plan}
                  onChange={(e) =>
                    setFormData({ ...formData, plan: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Enterprise">Enterprise Tier</option>
                  <option value="Pro">Pro Business</option>
                  <option value="Starter">Starter Plan</option>
                </select>
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Issue Subject <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                placeholder="Brief summary of the support ticket"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Category & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Priority Level
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer"
                >
                  <option value="High">🔥 High Priority (SLA 15m)</option>
                  <option value="Medium">⚠️ Medium Priority (SLA 2h)</option>
                  <option value="Low">⬇️ Low Priority (SLA 24h)</option>
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Detailed Issue Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Full context, logs, reproduction steps, or customer quote..."
                className="w-full p-3 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Tags input */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tagsInput}
                onChange={(e) =>
                  setFormData({ ...formData, tagsInput: e.target.value })
                }
                placeholder="e.g. UPI, GST, Urgent, Razorpay"
                className="w-full px-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {/* Form Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 transition shadow-xs cursor-pointer"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                <span>Submit Ticket</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
