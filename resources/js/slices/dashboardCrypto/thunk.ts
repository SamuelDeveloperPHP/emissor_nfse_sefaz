import { MarketGraphAll, MarketGraphHour, MarketGraphMonth, MarketGraphWeek, MarketGraphYear, btcPortfolioData, euroPortfolioData, usdPortfolioData } from "../../common/data";
import { getMarketChartsData, getPortfolioChartsData } from "./reducer";


export const ongetPortfolioChartsData = (data:any) => async (dispatch:any) => {
  try {
    if (data === "btc") {
      dispatch(getPortfolioChartsData(btcPortfolioData))
    }
    if (data === "usd") {
      dispatch(getPortfolioChartsData(usdPortfolioData))
    }
    if (data === "euro") {
      dispatch(getPortfolioChartsData(euroPortfolioData))
    }
  } catch (error) {
    return error;
  }
}

export const ongetMarketChartsData = (data:any) => async (dispatch:any) => {
  try {
    if (data === "all") {
      dispatch(getMarketChartsData(MarketGraphAll))
    }
    if (data === "year") {
      dispatch(getMarketChartsData(MarketGraphYear))
    }
    if (data === "month") {
      dispatch(getMarketChartsData(MarketGraphMonth))
    }
    if (data === "week") {
      dispatch(getMarketChartsData(MarketGraphWeek))
    }
    if (data === "hour") {
      dispatch(getMarketChartsData(MarketGraphHour))
    }
  } catch (error) {
    return error;
  }
}