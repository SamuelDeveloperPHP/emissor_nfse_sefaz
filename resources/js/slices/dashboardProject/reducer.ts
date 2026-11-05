import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  projectData: [],
  projectStatusData: [],
  error: {}
};


const DashboardProjectSlice = createSlice({
  name: 'DashboardProject',
  initialState,
  reducers: {
    getProjectChartsData: (state:any, action:any) => {
      state.projectData = action.payload;
    },
    getProjectStatusChartsData: (state:any, action:any) => {
      state.projectStatusData = action.payload;
    }
  }
});
export const {getProjectChartsData, getProjectStatusChartsData} = DashboardProjectSlice.actions;
export default DashboardProjectSlice.reducer;