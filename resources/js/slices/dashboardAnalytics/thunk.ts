import { allData, allaudiencesMetricsData, currentYearDeviceData, currentyearaudiencesCountryData, halfyearData, halfyearaudiencesMetricsData, lastMonthDeviceData, lastMonthaudiencesCountryData, lastWeekDeviceData, lastWeekaudiencesCountryData, monthData, monthaudiencesMetricsData, todayDeviceData, todayaudiencesCountryData, yaeraudiencesMetricsData } from "../../common/data";
import { getAllData, getAudiencesMetricsChartsData, getAudiencesSessionsChartsData, getUserDeviceChartsData } from "./reducer";

export const ongetAllData = (data: any) => async (dispatch: any) => {

  try {
    if (data === "all") {
      dispatch(getAllData(allData));
    }
    if (data === "halfyearly") {
      dispatch(getAllData(halfyearData));
    }
    if (data === "monthly") {
      dispatch(getAllData(monthData));
    }
  } catch (error) {
    return error;
  }
}



export const ongetAudiencesMetricsChartsData = (data: any) => async (dispatch: any) => {
  try {

    if (data === "all") {
      dispatch(getAudiencesMetricsChartsData(allaudiencesMetricsData))
    }
    if (data === "monthly") {
      dispatch(getAudiencesMetricsChartsData(monthaudiencesMetricsData))
    }
    if (data === "halfyearly") {
      dispatch(getAudiencesMetricsChartsData(halfyearaudiencesMetricsData))
    }
    if (data === "yearly") {
      dispatch(getAudiencesMetricsChartsData(yaeraudiencesMetricsData))
    }
  } catch (error) {
    return error;
  }
}

export const ongetUserDeviceChartsData = (data: any) => async (dispatch: any) => {
  try {
    if (data === "today") {
      dispatch(getUserDeviceChartsData(todayDeviceData));
    }
    if (data === "lastWeek") {
      dispatch(getUserDeviceChartsData(lastWeekDeviceData));
    }
    if (data === "lastMonth") {
      dispatch(getUserDeviceChartsData(lastMonthDeviceData));
    }
    if (data === "currentYear") {
      dispatch(getUserDeviceChartsData(currentYearDeviceData));
    }
  } catch (error) {
    return error;
  }
}

export const ongetAudiencesSessionsChartsData = (data: any) => async (dispatch: any) => {
  try {
    if (data === "today") {
      dispatch(getAudiencesSessionsChartsData(todayaudiencesCountryData))
    }
    if (data === "lastWeek") {
      dispatch(getAudiencesSessionsChartsData(lastWeekaudiencesCountryData))
    }
    if (data === "lastMonth") {
      dispatch(getAudiencesSessionsChartsData(lastMonthaudiencesCountryData))
    }
    if (data === "currentYear") {
      dispatch(getAudiencesSessionsChartsData(currentyearaudiencesCountryData))
    }
  } catch (error) {
    return error;
  }
}