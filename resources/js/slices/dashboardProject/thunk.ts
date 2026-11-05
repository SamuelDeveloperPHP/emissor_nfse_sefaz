import { allProjectData, allTimeData, halfyearProjectData, lastMonthData, lastWeekData, lastquarterData, monthProjectData, yearProjectData } from "../../common/data"
import { getProjectChartsData, getProjectStatusChartsData } from "./reducer"


export const ongetProjectChartsData = (data:any) => async (dispatch:any) => {
  try {
    if (data === "all") {
      dispatch(getProjectChartsData(allProjectData))
    }
    if (data === "month") {
      dispatch(getProjectChartsData(monthProjectData))
    }
    if (data === "halfyear") {
      dispatch(getProjectChartsData(halfyearProjectData))
    }
    if (data === "year") {
      dispatch(getProjectChartsData(yearProjectData))
    }
  } catch (error) {
    return error;
  }
}

export const ongetProjectStatusChartsData = (data:any) => async (dispatch:any) => {
  try {
    if (data === "all") {
      dispatch(getProjectStatusChartsData(allTimeData))
    }
    if (data === "week") {
      dispatch(getProjectStatusChartsData(lastWeekData))
    }
    if (data === "month") {
      dispatch(getProjectStatusChartsData(lastMonthData))
    }
    if (data === "quarter") {
      dispatch(getProjectStatusChartsData(lastquarterData))
    }
  } catch (error) {
    return error;
  }
}