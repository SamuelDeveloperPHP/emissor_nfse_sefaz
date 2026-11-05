import { jobApplication, jobCandidates, jobCategories } from "../../common/data/appsJobs";
import { GetCandidateGrid, addCandidate, addCandidateGrid, addNewJobApplicationList, addcategoryList, deleteJobApplicationList, getApplicationList, getCandidateList, getCategoryList, updateJobApplicationList } from "./reducer";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const onGetCategoryList = () => async (dispatch: any) => {
    try {
        dispatch(getCategoryList(jobCategories));
    } catch (error) {
        return error;
    }
}


export const onAddCategoryList = (data : any) => async (dispatch: any) => {
    try {
        dispatch(addcategoryList(data));
        toast.success("Category Added Successfully", { autoClose: 3000 });
    } catch (error) {
      toast.error("Category Added Failed", { autoClose: 3000 });
        return error;
    }
  }

//   job application

export const ongetApplicationList = () => async (dispatch: any) => {
    try {
        dispatch(getApplicationList(jobApplication));
    } catch (error) {
        return error;
    }
}

export const onaddNewJobApplicationList = (data : any) => async (dispatch: any) => {
    try {
        dispatch(addNewJobApplicationList(data));
        toast.success("Job Application Added Successfully", { autoClose: 3000 });
    } catch (error) {
      toast.error("Job Application Added Failed", { autoClose: 3000 });
        return error;
    }
    
  }

export const onupdateJobApplicationList = (data:any) => async (dispatch: any) => {
    try {
        dispatch(updateJobApplicationList(data));
        toast.success("Job Application Updated Successfully", { autoClose: 3000 });
    } catch (error) {
        toast.error("Job Application Updated Failed", { autoClose: 3000 });
        return error;
    }
};

export const ondeleteJobApplicationList = (data:any) => async (dispatch: any) => {
    try {
        dispatch(deleteJobApplicationList(data));
        toast.success("Job Application Deleted Successfully", { autoClose: 3000 });
        return data;
    } catch (error) {
        toast.error("Job Application Deleted Failed", { autoClose: 3000 });
        return error;
    }
};

// candidate List
export const ongetCandidateList = () => async (dispatch: any) => {
    try {
        dispatch(getCandidateList(jobCandidates));
    } catch (error) {
        return error;
    }
}


export const onAddCandidate = (data: any) => async (dispatch:any) => {
    try {
        dispatch(addCandidate(data));
        toast.success("Candidate Added Successfully", { autoClose: 2000 });
    } catch (error) {
        toast.error("Candidate Added Failed", { autoClose: 2000 });
        return error;
    }
}

// candidate grid
export const onGetCandidateGrid = () => async (dispatch: any) => {
    try {
        dispatch(GetCandidateGrid(jobCandidates));
    } catch (error) {
        return error;
    }
    
}

export const onAddCandidateGrid = (data:any) => async (dispatch: any) => {
    try {
        dispatch(addCandidateGrid(data));
        toast.success("Candidate Added Successfully", { autoClose: 2000 });
    } catch (error) {
        toast.error("Candidate Added Failed", { autoClose: 2000 });
        return error;
    }
    
}

