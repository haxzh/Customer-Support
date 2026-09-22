import { INITIAL_TICKETS } from "../data/mockTickets";

const STORAGE_KEY = "omni_support_tickets_in_v2";

// Helper to simulate realistic network delay
const delay = (ms = 350) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to get tickets from localStorage or seed
const getStoredTickets = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read from localStorage:", err);
    return INITIAL_TICKETS;
  }
};

// Helper to write tickets to localStorage
const saveStoredTickets = (tickets) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
  } catch (err) {
    console.error("Failed to write to localStorage:", err);
  }
};

/**
 * Mock REST API Client for Indian Customer Support Desk
 */
export const ticketApi = {
  /**
   * GET /api/v1/tickets
   */
  async fetchTickets({ shouldFail = false } = {}) {
    await delay(350);
    if (shouldFail) {
      throw new Error("HTTP 500: Failed to fetch support tickets from server. Please retry.");
    }
    const tickets = getStoredTickets();
    return [...tickets];
  },

  /**
   * PATCH /api/v1/tickets/:id/status
   */
  async updateStatus(ticketId, newStatus) {
    await delay(200);
    const tickets = getStoredTickets();
    const index = tickets.findIndex((t) => t.id === ticketId);
    if (index === -1) {
      throw new Error(`Ticket #${ticketId} not found`);
    }

    const updated = {
      ...tickets[index],
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };

    tickets[index] = updated;
    saveStoredTickets(tickets);
    return updated;
  },

  /**
   * PATCH /api/v1/tickets/:id/priority
   */
  async updatePriority(ticketId, newPriority) {
    await delay(200);
    const tickets = getStoredTickets();
    const index = tickets.findIndex((t) => t.id === ticketId);
    if (index === -1) {
      throw new Error(`Ticket #${ticketId} not found`);
    }

    const updated = {
      ...tickets[index],
      priority: newPriority,
      updatedAt: new Date().toISOString(),
    };

    tickets[index] = updated;
    saveStoredTickets(tickets);
    return updated;
  },

  /**
   * POST /api/v1/tickets/:id/replies
   */
  async addReply(ticketId, { content, sender = "agent", senderName = "Harsh Vardhan", statusChange }) {
    await delay(250);
    const tickets = getStoredTickets();
    const index = tickets.findIndex((t) => t.id === ticketId);
    if (index === -1) {
      throw new Error(`Ticket #${ticketId} not found`);
    }

    const newMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderName,
      senderAvatar:
        sender === "agent"
          ? "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
      timestamp: new Date().toISOString(),
      content,
    };

    const updated = {
      ...tickets[index],
      conversation: [...tickets[index].conversation, newMessage],
      status: statusChange || tickets[index].status,
      updatedAt: new Date().toISOString(),
    };

    tickets[index] = updated;
    saveStoredTickets(tickets);
    return updated;
  },

  /**
   * POST /api/v1/tickets
   */
  async createTicket(ticketData) {
    await delay(300);
    const tickets = getStoredTickets();
    const nextNum = Math.floor(4900 + Math.random() * 500);
    const newId = `TCK-${nextNum}`;

    const newTicket = {
      id: newId,
      customer: {
        name: ticketData.customerName,
        email: ticketData.customerEmail,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(ticketData.customerName)}`,
        company: ticketData.company || "Enterprise Customer",
        plan: ticketData.plan || "Pro",
        phone: ticketData.phone || "+91 98765 43210",
        timezone: "IST (UTC+5:30)",
        location: ticketData.location || "Bengaluru, India"
      },
      subject: ticketData.subject,
      description: ticketData.description,
      priority: ticketData.priority || "Medium",
      status: "Open",
      category: ticketData.category || "Payment Gateway & UPI",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      assignedTo: {
        name: "Harsh Vardhan",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        role: "Lead Operations"
      },
      tags: ticketData.tags || ["New", "India Desk"],
      conversation: [
        {
          id: `msg-${Date.now()}`,
          sender: "customer",
          senderName: ticketData.customerName,
          senderAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(ticketData.customerName)}`,
          timestamp: new Date().toISOString(),
          content: ticketData.description
        }
      ]
    };

    const updatedList = [newTicket, ...tickets];
    saveStoredTickets(updatedList);
    return newTicket;
  },

  /**
   * DELETE /api/v1/tickets/:id
   */
  async deleteTicket(ticketId) {
    await delay(200);
    const tickets = getStoredTickets();
    const filtered = tickets.filter((t) => t.id !== ticketId);
    saveStoredTickets(filtered);
    return { success: true, id: ticketId };
  },

  /**
   * Reset data to initial state
   */
  async resetToDemo() {
    await delay(250);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
    return [...INITIAL_TICKETS];
  }
};
