import { allMarketplaceData, halfyearMarketplaceData, monthMarketplaceData, yearMarketplaceData } from "../../common/data"
import { getMarketChartsDatas } from "./reducer"

export const ongetMarketChartsDatas = (data:any) => async (dispatch:any) => {
  try {
    if (data === "all") {
      dispatch(getMarketChartsDatas(allMarketplaceData))
    }
    if (data === "month") {
      dispatch(getMarketChartsDatas(monthMarketplaceData))
    }
    if (data === "halfyear") {
      dispatch(getMarketChartsDatas(halfyearMarketplaceData))
    }
    if (data === "year") {
      dispatch(getMarketChartsDatas(yearMarketplaceData))
    }
  } catch (error) {
    return error;
  }
}