import { currentYearBalanceData, decData, janData, lastMonthBalanceData, lastWeekBalanceData, monthlyDealData, novData, octData, todayBalanceData, todayDealData, weeklyDealData, yealyDealData } from "../../common/data"
import { getBalanceChartsData, getDialChartsData, getSalesChartsData } from "./reducer"


export const ongetBalanceChartsData = (data: any) => async (dispatch: any) => {
  try {
    if (data === "today") {
      dispatch(getBalanceChartsData(todayBalanceData))
    }
    if (data === "lastWeek") {
      dispatch(getBalanceChartsData(lastWeekBalanceData))
    }
    if (data === "lastMonth") {
      dispatch(getBalanceChartsData(lastMonthBalanceData))
    }
    if (data === "currentYear") {
      dispatch(getBalanceChartsData(currentYearBalanceData))
    }
  } catch (error) {
    return error;
  }
}

export const ongetDialChartsData = (data: any) => async (dispatch: any) => {
  try {
    if (data === "today") {
      dispatch(getDialChartsData(todayDealData))
    }
    if (data === "weekly") {
      dispatch(getDialChartsData(weeklyDealData))
    }
    if (data === "monthly") {
      dispatch(getDialChartsData(monthlyDealData))
    }
    if (data === "yearly") {
      dispatch(getDialChartsData(yealyDealData))
    }
  }
  catch (error) {
    return error;
  }
}

export const ongetSalesChartsData = (data: any) => async (dispatch: any) => {
  try {
    if (data === "oct") {
      dispatch(getSalesChartsData(octData))
    }
    if (data === "nov") {
      dispatch(getSalesChartsData(novData))
    }
    if (data === "dec") {
      dispatch(getSalesChartsData(decData))
    }
    if (data === "jan") {
      dispatch(getSalesChartsData(janData))
    }
  }
  catch (error) {
    return error;
  }
}