import { createSlice } from "@reduxjs/toolkit";
export const initialState :any= {
  products: [],
  orders: [],
  sellers: [],
  customers: [],
  error: {},
};

const EcommerceSlice = createSlice({
  name: 'EcommerceSlice',
  initialState,
  reducers: {
    getSellers: (state:any, action:any) => {
      state.sellers = action.payload;
    },

    getProducts: (state:any, action:any) => {
      state.products = action.payload;
    },

    addNewProduct: (state:any, action:any) => {
      state.products.push(action.payload);
      
    },

    deleteProducts : (state:any, action:any) => {
      state.products = (state.products || []).filter((product:any) => product.id.toString() !== action.payload.toString());
    },

    getCustomers: (state:any, action:any) => {
      state.customers = action.payload;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
    },

    addNewCustomer : (state:any, action:any) => {
      state.customers.push(action.payload);
      state.isCustomerCreated = true;
    },

    updateCustomer: (state:any, action:any) => {
      state.customers = state.customers.map((customer:any) =>
            customer.id === action.payload.id
              ? { ...customer, ...action.payload }
              : customer
      );
    },

    deleteCustomer: (state:any, action:any) => {
      state.customers = state.customers.filter(
              (customer:any) => customer.id.toString() !== action.payload.toString()
            );
    },
  },
});
export const {getSellers, getProducts, addNewProduct, deleteProducts, getCustomers, addNewCustomer, updateCustomer, deleteCustomer} = EcommerceSlice.actions;
export default EcommerceSlice.reducer;


