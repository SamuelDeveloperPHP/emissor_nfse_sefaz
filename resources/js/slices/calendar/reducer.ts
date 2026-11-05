import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
  events: [],
  categories: [],
  upcommingevents: [],
  error: {}
};


const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    getEvents: (state: any, action: any) => {
      state.events = action.payload;
    },

    getCategories: (state: any, action: any) => {
      state.categories = action.payload;
    },

    getUpCommingEvent: (state: any, action: any) => {
      state.upcommingevents = action.payload;
    },

    addNewEvent: (state: any, action: any) => {
      state.events.push(action.payload);
    },

    deleteEvent: (state: any, action: any) => {
      state.events = state.events.filter(
        (event: any) => event.id.toString() !== action.payload.toString()
      );
    },

    updateEvent: (state: any, action: any) => {
      state.events = (state.events || []).map((event: any) =>
        event.id.toString() === action.payload.id.toString()
          ? { ...event, ...action.payload }
          : event
      );

    },
  }
});
export const { getEvents, getCategories, getUpCommingEvent, addNewEvent, deleteEvent, updateEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
