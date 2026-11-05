
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewFile, addNewFolder, deleteFile, deleteFolder, getFiles, getFolders, updateFile, updateFolder } from "./reducer";
import { folderList, recentFile } from "../../common/data";

export const onGetFolders = () => async (dispatch: any) => {
  try {
    dispatch(getFolders(folderList));
  } catch (error) {
    return error;
  }
}


export const onGetFiles = () => async (dispatch: any) => {
  try {
    dispatch(getFiles(recentFile));
  } catch (error) {
    return error;
  }
}


export const onAddNewFolder = (data: any) => async (dispatch: any) => {
  try {
    dispatch(addNewFolder(data));
    toast.success("Folder Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Folder Added Failed", { autoClose: 3000 });
    return error;
  }
}

export const onAddNewFile = (data: any) => async (dispatch: any) => {
  try {
    dispatch(addNewFile(data));
    toast.success("File Added Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("File Added Failed", { autoClose: 3000 });
    return error;
  }
}


export const onDeleteFolder = (data: any) => async (dispatch: any) => {
  try {
    dispatch(deleteFolder(data));
    toast.success("Order Deleted Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Order Deleted Failed", { autoClose: 3000 });
    return error;
  }
}

export const onDeleteFile = (data: any) => async (dispatch: any) => {
  try {
    dispatch(deleteFile(data));
    toast.success("File Delete Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("File Delete Failed", { autoClose: 3000 });
    return error;
  }
}


export const onupdateFolder = (data: any) => async (dispatch: any) => {
  try {
    dispatch(updateFolder(data));
    toast.success("Folder Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("Folder Updated Failed", { autoClose: 3000 });
    return error;
  }
}

export const onupdateFile = (data: any) => async (dispatch: any) => {
  try {
    dispatch(updateFile(data));
    toast.success("File Updated Successfully", { autoClose: 3000 });
  } catch (error) {
    toast.error("File Updated Failed", { autoClose: 3000 });
    return error;
  }
}

