import { createSlice } from "@reduxjs/toolkit";
export const initialState : any = {
  balanceOverviewData: [],
  dialTypeData: [],
  salesForecastData: [],
  error: {}
};


const DashboardCRMSlice = createSlice({
  name: 'DashboardCRM',
  initialState,
  reducers: {

    getBalanceChartsData: (state:any, action:any) => {
      state.balanceOverviewData = action.payload;
    },
    
    getDialChartsData: (state:any, action:any) => {
      state.dialTypeData = action.payload;
    },

    getSalesChartsData: (state:any, action:any) => {
      state.salesForecastData = action.payload;
    },
  },
});
export const {getBalanceChartsData, getDialChartsData, getSalesChartsData} = DashboardCRMSlice.actions;
export default DashboardCRMSlice.reducer;