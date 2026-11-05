
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteMail, getMailDetails, labelMail, staredMail, trashMail, unreadMail } from "./reducer";
import { mailbox } from "../../common/data";


export const ongetMailDetails = () => async (dispatch: any) => {
  try {
    dispatch(getMailDetails(mailbox));
  } catch (error) {
    return error;
  }

}

export const onunreadMail = (data: any) => async (dispatch: any) => {
  try {
    dispatch(unreadMail(data))
    // toast.success("Mail Added Favorite Successfully", { autoClose: 3000 });
  } catch (error) {
    // toast.error("Mail Deleted Favorite Failed", { autoClose: 3000 });
    return error;
  }
}

export const ondeleteMail = (data: any) => async (dispatch: any) => {
  try {
    dispatch(deleteMail(data))
    toast.success("Mail Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Mail Delete Failed", { autoClose: 3000 });
    return error;
  }
}

export const ontrashMail = (data: any) => async (dispatch: any) => {
  try {
    dispatch(trashMail(data))
    toast.success("Mail Moved Trash Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Mail Moved Trash Failed", { autoClose: 3000 });
    return error;
  }
}

export const onlabelMail = (data:any) => async (dispatch:any) => {
  try {
    dispatch(labelMail(data))
  } catch (error) {
    return error;
  }
}

export const onstaredMail = (data:any) => async (dispatch:any) => {
  try {
    dispatch(staredMail(data))
    // toast.success("Mail Added Favorite Successfully", { autoClose: 3000 });
  } catch (error) {
    // toast.error("Mail removed Favorite Failed", { autoClose: 3000 });
    return error;
  }
}

