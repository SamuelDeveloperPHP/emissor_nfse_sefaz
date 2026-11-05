import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
    ticketsList: [],
    error: {}
};

const TicketsSlice = createSlice({
    name: 'TicketsSlice',
    initialState,
    reducers: {
        getTicketsList: (state: any, action: any) => {
            state.ticketsList = action.payload;

        },

        addNewTicket: (state: any, action: any) => {
            state.ticketsList.push(action.payload);
            state.isTicketCreated = true;
            state.isTicketAdd = true;
            state.isTicketAddFail = false;
        },

        deleteTicket: (state: any, action: any) => {
            state.ticketsList = state.ticketsList.filter(
                (ticket: any) => ticket.id.toString() !== action.payload.toString()
            );
            state.isTicketDelete = true;
            state.isTicketDeleteFail = false;
        },

        updateTicket: (state: any, action: any) => {
            state.ticketsList = state.ticketsList.map((ticket: any) =>
                ticket.id === action.payload.id
                    ? { ...ticket, ...action.payload }
                    : ticket
            );
            state.isTicketUpdate = true;
            state.isTicketUpdateFail = false;
        }
    },
});
export const { getTicketsList, addNewTicket, deleteTicket, updateTicket } = TicketsSlice.actions;
export default TicketsSlice.reducer;



