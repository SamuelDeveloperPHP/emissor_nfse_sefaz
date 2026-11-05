import { allRevenueData, halfYearRevenueData, monthRevenueData, yearRevenueData } from "../../common/data";
import { getRevenueChartsData } from "./reducer";


export const ongetRevenueChartsData = (data:any) =>  async (dispatch : any) => {
  try {
    if (data === "all") {
      dispatch(getRevenueChartsData(allRevenueData))
    }
    if (data === "month") {
      dispatch(getRevenueChartsData(monthRevenueData))
    }
    if (data === "halfyear") {
      dispatch(getRevenueChartsData(halfYearRevenueData))
    }
    if (data === "year") {
      dispatch(getRevenueChartsData(yearRevenueData))
    }
  } catch (error) {
    return error;
  }
};