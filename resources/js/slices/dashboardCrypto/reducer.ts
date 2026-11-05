import { createSlice } from "@reduxjs/toolkit";

export const initialState : any = {
  portfolioData: [],
  marketData: [],
  error: {}
};


const DashboardCryptoSlice = createSlice({
  name: 'DashboardCrypto',
  initialState,
  reducers : {

    getPortfolioChartsData: (state:any, action:any) => {
      state.portfolioData = action.payload;
    },
    getMarketChartsData: (state:any, action:any) => {
      state.marketData = action.payload;
    }
  }
});

export const {getPortfolioChartsData, getMarketChartsData } = DashboardCryptoSlice.actions;
export default DashboardCryptoSlice.reducer;
