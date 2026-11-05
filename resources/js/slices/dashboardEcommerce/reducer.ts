import { createSlice } from "@reduxjs/toolkit";
export const initialState : any = {
  revenueData: [],
  error: {}
};
const DashboardEcommerceSlice = createSlice({
  name: 'DashboardEcommerce',
  initialState,
  reducers: {
    getRevenueChartsData: (state:any, action:any) => {
      state.revenueData = action.payload;
    },
  },
});
export const {getRevenueChartsData} = DashboardEcommerceSlice.actions;
export default DashboardEcommerceSlice.reducer;