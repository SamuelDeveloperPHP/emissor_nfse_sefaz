
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteProjectList, getProjectList } from "./reducer";
import { projectList } from "../../common/data";



export const onGetProjectList = () => async (dispatch:any) => {
    try {
        dispatch(getProjectList(projectList));
    } catch (error) {
        return error;
    }
}


export const onDeleteProjectList = (data :any)  => async (dispatch:any) => {
    try {
        dispatch(deleteProjectList(data));
        toast.success("project-list Delete Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("project-list Delete Failed", { autoClose: 3000 });
        return error;
    }
}