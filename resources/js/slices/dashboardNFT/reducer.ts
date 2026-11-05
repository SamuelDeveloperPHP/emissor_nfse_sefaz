import { createSlice } from "@reduxjs/toolkit";
export const initialState : any = {
  marketplaceData: [],
  error: {}
};

const DashboardNFTSlice = createSlice({
  name: 'DashboardNFT',
  initialState,
  reducers :{
    getMarketChartsDatas: (state:any, action:any) => {
      state.marketplaceData = action.payload;
  },
}
});
export const {getMarketChartsDatas} = DashboardNFTSlice.actions;
export default DashboardNFTSlice.reducer;