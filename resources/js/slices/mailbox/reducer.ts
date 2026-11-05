import { createSlice } from "@reduxjs/toolkit";


export const initialState: any = {
  mailDetails: [],
  error: {},
  isLoader: false
};

const MailBoxSlice = createSlice({
  name: 'MailBoxSlice',
  initialState,
  reducers: {

    getMailDetails: (state: any, action: any) => {
      state.mailDetails = action.payload;

    },

    unreadMail: (state: any, action: any) => {
      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload) {
          const updatedMail = mail.unread === true ? false : true;
          return { ...mail, unread: updatedMail };
        }
        return mail;
      });
      state.isMailDetailsDeleted = false;
    },


    deleteMail: (state: any, action: any) => {
      state.mailDetails = state.mailDetails.filter(
        (mail: any) => mail.forId !== action.payload
      );
      state.isMailDetailsDeleted = false;
    },

    trashMail: (state: any, action: any) => {
      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload) {
          return { ...mail, category: "trash" };
        }
        return mail;
      });
      state.isMailDetailsDeleted = false;
    },

    staredMail: (state: any, action: any) => {
      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload) {
          const newCategory = mail.category === "starred" ? "inbox" : "starred";
          return { ...mail, category: newCategory };
        }
        return mail;
      });

      state.isMailDetailsDeleted = false;
    },

    labelMail: (state: any, action: any) => {
      state.mailDetails = state.mailDetails.map((mail: any) => {
        if (mail.forId === action.payload.response) {
          return { ...mail, label: action.payload.label };
        }
        return mail;
      });

      state.isMailDetailsDeleted = false;
    }
  }
});
export const { getMailDetails, unreadMail, deleteMail, trashMail, staredMail, labelMail } = MailBoxSlice.actions;
export default MailBoxSlice.reducer;


