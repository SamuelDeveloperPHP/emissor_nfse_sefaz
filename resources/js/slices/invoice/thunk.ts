
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewInvoice, deleteInvoice, getInvoices } from "./reducer";
import { invoiceTable } from "../../common/data";

export const onGetInvoices= () => async (dispatch:any) => {
  try {
    dispatch(getInvoices(invoiceTable))
  } catch (error) {
    return error;
  }
}


export const onAddNewInvoice = (data:any) => async (dispatch:any) => {
  try {
    dispatch(addNewInvoice(data))
    toast.success("Invoice Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Invoice Added Failed", { autoClose: 3000 });
    return error;
  }
}

export const onDeleteInvoice = (data:any) => async (dispatch:any) => {
  try {
    dispatch(deleteInvoice(data))
    toast.success("Invoice Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Invoice Delete Failed", { autoClose: 3000 });
    return error;
  }
}

