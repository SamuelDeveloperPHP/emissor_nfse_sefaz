import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCardData, addNewTask, deleteKanban, deleteTask, getTaskList, getTasks, updateCardData, updateTask } from "./reducer";
import { allTask, tasklist } from "../../common/data";


export const ongetTaskList = () => async (dispatch: any) => {
    try {
        dispatch(getTaskList(allTask))
    } catch (error) {
        return error;
    }
}

export const onaddNewTask = (data: any) => async (dispatch: any) => {
    try {
        dispatch(addNewTask(data))
        toast.success("Task Added Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Task Added Failed", { autoClose: 3000 });
        return error;
    }
}


export const ondeleteTask = (data: any) => async (dispatch: any) => {
    try {
        dispatch(deleteTask(data))
        toast.success("Task Deleted Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Task Deleted Failed", { autoClose: 3000 });
                return error;
    }
}


export const onupdateTask = (data: any) => async (dispatch: any) => {
    try {
        dispatch(updateTask(data))
        toast.success("Task Updated Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Task Updated Failed", { autoClose: 3000 });
        return error;
    }
}

// Kanban Board

export const onGetTasks = () => async (dispatch:any) => {
    try {
        dispatch(getTasks(tasklist))
    } catch (error) {
        return error;
    }
}

export const onAddCardData = (data:any) => async (dispatch:any) => {
    try {
        dispatch(addCardData(data))
        toast.success("Card Add Successfully", { autoClose: 2000 })
    } catch (error) {
        toast.error("Card Add Failded", { autoClose: 2000 })
        return error;
    }
}

export const onUpdateCardData = (data:any) => async (dispatch:any) => {
    try {
        dispatch(updateCardData(data))
        toast.success("Card Update Successfully", { autoClose: 2000 })
    } catch (error) {
        toast.error("Card Update Failded", { autoClose: 2000 })
        return error;
    }
}

export const OnDeleteKanban = (data:any) => async (dispatch:any) => {
    try {
        dispatch(deleteKanban(data))
        toast.success("Card Delete Successfully", { autoClose: 2000 })
    } catch (error) {
        toast.error("Card Delete Failded", { autoClose: 2000 })
        return error;
    }
}
