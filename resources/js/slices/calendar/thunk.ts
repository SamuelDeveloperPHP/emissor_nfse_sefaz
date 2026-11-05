import { calenderDefaultCategories, defaultevent, events } from "../../common/data";
import { addNewEvent, deleteEvent, getCategories, getEvents, getUpCommingEvent, updateEvent } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const onGetEvents = () => async (dispatch: any) => {
  try {
    dispatch(getEvents(events));
  } catch (error) {
    return error;
  }
}


export const onGetCategories = () => async (dispatch: any) => {
  try {
    dispatch(getCategories(calenderDefaultCategories));
  } catch (error) {
    return error;
  }
}


export const onGetUpCommingEvent = () => async (dispatch: any) => {
  try {
    dispatch(getUpCommingEvent(defaultevent));
  } catch (error) {
    return error;
  }
}


export const onAddNewEvent = (data: any) => async (dispatch: any) => {

  try {
    dispatch(addNewEvent(data))
    toast.success("Event Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Event Added Failed", { autoClose: 3000 });
  }
}


export const onDeleteEvent = (data: any) => async (dispatch: any) => {
  try {
    dispatch(deleteEvent(data))
    toast.success("Event Deleted Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Event Deleted Failed", { autoClose: 3000 });
  }
}


export const onUpdateEvent = (data: any) => async (dispatch: any) => {
  try {
    dispatch(updateEvent(data))
    toast.success("Event Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Update Event Failed", { autoClose: 3000 });
  }
}