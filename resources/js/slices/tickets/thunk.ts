import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewTicket, deleteTicket, getTicketsList, updateTicket } from "./reducer";
import { ticketsTable } from "../../common/data";


export const onGetTicketsList = () => async (dispatch: any) => {
    try {
        dispatch(getTicketsList(ticketsTable));
    } catch (error) {
        return error;
    }
}

export const onAddNewTicket = (data: any) => async (dispatch: any) => {
    try {
        dispatch(addNewTicket(data))
        toast.success("Ticket Added Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Ticket Added Failed", { autoClose: 3000 });;
        return error;
    }
}


export const ondeleteTicket = (data: any) => async (dispatch: any) => {
    try {
        dispatch(deleteTicket(data))
        toast.success("Ticket Delete Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Ticket Delete Failed", { autoClose: 3000 });
        return error;
    }
}


export const onupdateTicket = (data: any) => async (dispatch: any) => {
    try {
        dispatch(updateTicket(data))
        toast.success("Ticket Updated Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Ticket Updated Failed", { autoClose: 3000 });
        return error;
    }
}
