import { create } from "zustand";
import { ticketApi } from "../services/ticketApi";

export const useTicketStore = create((set, get) => ({
  tickets: [],
  loading: true,
  error: null,
  simulateApiError: false,
  selectedTicketId: null,
  isCreateModalOpen: false,
  
  filters: {
    status: "ALL", // 'ALL' | 'Open' | 'In Progress' | 'Resolved'
    priority: "ALL", // 'ALL' | 'Low' | 'Medium' | 'High'
    search: "",
    sortBy: "newest", // 'newest' | 'oldest' | 'priority'
  },

  toasts: [],

  // Toast actions
  addToast: ({ type = "success", title, message }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    set((state) => ({
      toasts: [...state.toasts, { id, type, title, message }],
    }));

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      get().removeToast(id);
    }, 4000);
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  // Modal actions
  setCreateModalOpen: (isOpen) => {
    set({ isCreateModalOpen: isOpen });
  },

  // Select Ticket for Details Drawer
  selectTicket: (ticketId) => {
    set({ selectedTicketId: ticketId });
  },

  closeTicketDetails: () => {
    set({ selectedTicketId: null });
  },

  // Filters and Search actions
  setSearch: (query) => {
    set((state) => ({
      filters: { ...state.filters, search: query },
    }));
  },

  setStatusFilter: (status) => {
    set((state) => ({
      filters: { ...state.filters, status },
    }));
  },

  setPriorityFilter: (priority) => {
    set((state) => ({
      filters: { ...state.filters, priority },
    }));
  },

  setSortBy: (sortBy) => {
    set((state) => ({
      filters: { ...state.filters, sortBy },
    }));
  },

  resetFilters: () => {
    set({
      filters: {
        status: "ALL",
        priority: "ALL",
        search: "",
        sortBy: "newest",
      },
    });
  },

  toggleSimulateError: () => {
    set((state) => ({ simulateApiError: !state.simulateApiError }));
  },

  // API Async Actions
  fetchTickets: async () => {
    set({ loading: true, error: null });
    try {
      const tickets = await ticketApi.fetchTickets({
        shouldFail: get().simulateApiError,
      });
      set({ tickets, loading: false, error: null });
    } catch (err) {
      set({
        loading: false,
        error: err.message || "Failed to load support tickets.",
      });
    }
  },

  updateTicketStatus: async (ticketId, newStatus) => {
    // Optimistic UI update
    const previousTickets = get().tickets;
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      ),
    }));

    try {
      const updated = await ticketApi.updateStatus(ticketId, newStatus);
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? updated : t)),
      }));
      get().addToast({
        type: "success",
        title: "Status Updated",
        message: `Ticket #${ticketId} is now marked as "${newStatus}".`,
      });
    } catch (err) {
      // Rollback
      set({ tickets: previousTickets });
      get().addToast({
        type: "error",
        title: "Update Failed",
        message: err.message || "Could not update ticket status.",
      });
    }
  },

  updateTicketPriority: async (ticketId, newPriority) => {
    const previousTickets = get().tickets;
    set((state) => ({
      tickets: state.tickets.map((t) =>
        t.id === ticketId
          ? { ...t, priority: newPriority, updatedAt: new Date().toISOString() }
          : t
      ),
    }));

    try {
      const updated = await ticketApi.updatePriority(ticketId, newPriority);
      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? updated : t)),
      }));
      get().addToast({
        type: "info",
        title: "Priority Changed",
        message: `Ticket #${ticketId} priority set to "${newPriority}".`,
      });
    } catch (err) {
      set({ tickets: previousTickets });
      get().addToast({
        type: "error",
        title: "Update Failed",
        message: err.message || "Could not update ticket priority.",
      });
    }
  },

  addReply: async (ticketId, { content, statusChange }) => {
    try {
      const updated = await ticketApi.addReply(ticketId, {
        content,
        sender: "agent",
        senderName: "Alex Rivera (Support Lead)",
        statusChange,
      });

      set((state) => ({
        tickets: state.tickets.map((t) => (t.id === ticketId ? updated : t)),
      }));

      get().addToast({
        type: "success",
        title: "Reply Sent",
        message: `Response posted to ticket #${ticketId}.`,
      });
      return true;
    } catch (err) {
      get().addToast({
        type: "error",
        title: "Send Failed",
        message: err.message || "Could not send reply.",
      });
      return false;
    }
  },

  createTicket: async (ticketData) => {
    try {
      const newTicket = await ticketApi.createTicket(ticketData);
      set((state) => ({
        tickets: [newTicket, ...state.tickets],
        isCreateModalOpen: false,
        selectedTicketId: newTicket.id, // Automatically open the newly created ticket
      }));
      get().addToast({
        type: "success",
        title: "Ticket Created",
        message: `New ticket #${newTicket.id} created for ${ticketData.customerName}.`,
      });
      return newTicket;
    } catch (err) {
      get().addToast({
        type: "error",
        title: "Creation Error",
        message: err.message || "Failed to create new ticket.",
      });
      return null;
    }
  },

  deleteTicket: async (ticketId) => {
    try {
      await ticketApi.deleteTicket(ticketId);
      set((state) => ({
        tickets: state.tickets.filter((t) => t.id !== ticketId),
        selectedTicketId:
          state.selectedTicketId === ticketId ? null : state.selectedTicketId,
      }));
      get().addToast({
        type: "info",
        title: "Ticket Deleted",
        message: `Ticket #${ticketId} was successfully deleted.`,
      });
    } catch (err) {
      get().addToast({
        type: "error",
        title: "Delete Error",
        message: err.message || "Could not delete ticket.",
      });
    }
  },

  resetDemoData: async () => {
    set({ loading: true });
    try {
      const tickets = await ticketApi.resetToDemo();
      set({ tickets, loading: false, selectedTicketId: null });
      get().addToast({
        type: "success",
        title: "Demo Data Reset",
        message: "Sample dataset has been restored to default state.",
      });
    } catch (err) {
      set({ loading: false });
      get().addToast({
        type: "error",
        title: "Reset Failed",
        message: err.message,
      });
    }
  },

  // Computed Selectors
  getStats: () => {
    const tickets = get().tickets;
    const total = tickets.length;
    const open = tickets.filter((t) => t.status === "Open").length;
    const inProgress = tickets.filter((t) => t.status === "In Progress").length;
    const resolved = tickets.filter((t) => t.status === "Resolved").length;
    const highPriority = tickets.filter((t) => t.priority === "High").length;
    const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 0;

    return {
      total,
      open,
      inProgress,
      resolved,
      highPriority,
      resolutionRate,
    };
  },

  getFilteredTickets: () => {
    const { tickets, filters } = get();
    let result = [...tickets];

    // Status filter
    if (filters.status !== "ALL") {
      result = result.filter((t) => t.status === filters.status);
    }

    // Priority filter
    if (filters.priority !== "ALL") {
      result = result.filter((t) => t.priority === filters.priority);
    }

    // Search query filter (customer name, email, subject, ticket ID, description)
    if (filters.search && filters.search.trim() !== "") {
      const query = filters.search.toLowerCase().trim();
      result = result.filter(
        (t) =>
          t.id.toLowerCase().includes(query) ||
          t.subject.toLowerCase().includes(query) ||
          t.customer.name.toLowerCase().includes(query) ||
          t.customer.email.toLowerCase().includes(query) ||
          (t.customer.company && t.customer.company.toLowerCase().includes(query)) ||
          (t.description && t.description.toLowerCase().includes(query))
      );
    }

    // Sorting
    const priorityWeight = { High: 3, Medium: 2, Low: 1 };
    result.sort((a, b) => {
      if (filters.sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (filters.sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      if (filters.sortBy === "priority") {
        const weightDiff = (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0);
        if (weightDiff !== 0) return weightDiff;
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

    return result;
  },

  getSelectedTicket: () => {
    const { tickets, selectedTicketId } = get();
    if (!selectedTicketId) return null;
    return tickets.find((t) => t.id === selectedTicketId) || null;
  },
}));
