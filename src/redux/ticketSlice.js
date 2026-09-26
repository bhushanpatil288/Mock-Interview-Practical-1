import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  try {
    const saved = localStorage.getItem("tickets_state");
    return saved ? JSON.parse(saved) : { tickets: [], loading: false, error: null };
  } catch {
    return { tickets: [], loading: false, error: null };
  }
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState: loadInitialState(),
  reducers: {
    createTicket: (state, action) => {
      state.tickets.push(action.payload);
    },
    assignTicket: (state, action) => {
      const ticket = state.tickets.find((item) => item.id === action.payload.id);
      if (ticket) {
        ticket.assignedTo = action.payload.assignedTo;
        ticket.assignedToId = action.payload.assignedToId;
      }
    },
    updateTicketStatus: (state, action) => {
      const ticket = state.tickets.find((item) => item.id === action.payload.id);
      if (ticket) ticket.status = action.payload.status;
    },
    deleteClosedTicket: (state, action) => {
      const ticket = state.tickets.find((item) => item.id === action.payload);
      const statusLabels = ["open", "in-progress", "resolved", "closed"];
      const status = typeof ticket?.status === "number"
        ? statusLabels[ticket.status - 1]
        : String(ticket?.status ?? "").toLowerCase();

      if (ticket && status.replace(/[^a-z]/g, "") === "closed") {
        state.tickets = state.tickets.filter((item) => item.id !== action.payload);
      }
    }
  }
});

export const { createTicket, assignTicket, updateTicketStatus, deleteClosedTicket } = ticketSlice.actions;
export default ticketSlice.reducer;