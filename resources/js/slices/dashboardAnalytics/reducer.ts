import { createSlice } from "@reduxjs/toolkit";

export const initialState : any = {
  chartData: [],
  audiencesMetricsData: [],
  userDeviceData: [],
  audiencesSessionsData: [],
  error: {}
};

const DashboardAnalyticsSlice = createSlice({
  name: 'DashboardAnalytics',
  initialState,
  reducers: {

    getAllData: (state:any, action:any) => {
      state.chartData = action.payload;
    },
    
    getAudiencesMetricsChartsData: (state:any, action:any) => {
      state.audiencesMetricsData = action.payload;
    },

    getUserDeviceChartsData: (state:any, action:any) => {
      state.userDeviceData = action.payload;
    },

    getAudiencesSessionsChartsData: (state:any, action:any) => {
      state.audiencesSessionsData = action.payload;
    },

  },
});
export const {getAllData, getAudiencesMetricsChartsData, getUserDeviceChartsData, getAudiencesSessionsChartsData} = DashboardAnalyticsSlice.actions;
export default DashboardAnalyticsSlice.reducer;
  
