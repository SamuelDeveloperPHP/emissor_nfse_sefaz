import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
  chats: [],
  messages: [],
  error: {},
  loading: true
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {

    getDirectContact: (state: any, action: any) => {
      state.chats = action.payload;
  },

  getMessages: (state: any, action: any) => {
    state.messages = action.payload;
},

addMessage: (state: any, action: any) => {
  state.messages.map((data: any) => data.usermessages.push(action.payload));
},

deleteMessage: (state: any, action: any) => {
  state.messages = (state.messages || []).map((data: any) => {
           const updateUserMsg = data.usermessages.filter((userMsg: any) => userMsg.id !== action.payload);
           return { ...data, usermessages: updateUserMsg }
         })
 },
  },
});
export const { getDirectContact, getMessages, addMessage, deleteMessage} = chatSlice.actions;
export default chatSlice.reducer;

