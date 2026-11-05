import { createSlice } from "@reduxjs/toolkit";
export const initialState: any = {
  invoices: [],
  error: {},
};


const InvoiceSlice = createSlice({
  name: 'InvoiceSlice',
  initialState,
  reducers: {

    getInvoices: (state: any, action: any) => {
      state.invoices = action.payload;
      state.isInvoiceCreated = false;
      state.isInvoiceSuccess = true;
    },

    addNewInvoice: (state: any, action: any) => {
      state.invoices.push(action.payload);
      state.isInvoiceCreated = true;
    },

    deleteInvoice: (state: any, action: any) => {
      state.invoices = state.invoices.filter(
        (invoice: any) => invoice.id.toString() !== action.payload.toString()
      );
    }
  },
});
export const { getInvoices, addNewInvoice, deleteInvoice } = InvoiceSlice.actions
export default InvoiceSlice.reducer;