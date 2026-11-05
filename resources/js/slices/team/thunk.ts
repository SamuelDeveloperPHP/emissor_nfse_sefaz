
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addTeamData, deleteTeamData, getTeamData, updateTeamData } from "./reducer";
import { team } from "../../common/data";

export const onGetTeamData = () => async (dispatch:any) => {
    try {
        dispatch(getTeamData(team));
    } catch (error) {
        return error;
    }
}

export const onAddTeamData = (data:any) => async (dispatch:any) => {
    try {
        dispatch(addTeamData(data));
        toast.success("Team Data Added Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Team Data Added Failed", { autoClose: 3000 });
        return error;
    }
}

export const onDeleteTeamData = (data:any) => async (dispatch:any) => {
    try {
        dispatch(deleteTeamData(data));
        toast.success("Team Data Delete Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Team Data Delete Failed", { autoClose: 3000 });
        return error;
    }
}


export const onUpdateTeamData = (data:any) => async (dispatch:any) => {
    try {
        dispatch(updateTeamData(data));
        toast.success("Team Data Updated Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Team Data Updated Failed", { autoClose: 3000 });
        return error;
    }
}