import { createSlice } from "@reduxjs/toolkit";

export const initialState: any = {
    categoryList: [],
    appList: [],
    candidatelist: [],
    candidategrid: [],
    error: {},
};

const Jobslice: any = createSlice({
    name: 'Jobs',
    initialState,
    reducers: {
        getCategoryList: (state: any, action: any) => {
            state.categoryList = action.payload;
        },
        addcategoryList: (state: any, action: any) => {
            state.categoryList.unshift(action.payload);
        },

        getApplicationList: (state: any, action: any) => {
            state.appList = action.payload;
        },

        addNewJobApplicationList: (state: any, action: any) => {
            state.appList.push(action.payload)
        },

        deleteJobApplicationList: (state: any, action: any) => {
            state.appList = state.appList.filter(
                (job: any) => job.id !== action.payload
            );
        },

        updateJobApplicationList: (state: any, action: any) => {
            state.appList = state.appList.map((job: any) =>
                job.id === action.payload.id
                    ? { ...job, ...action.payload }
                    : job
            );
        },

        getCandidateList: (state: any, action: any) => {
            state.candidatelist = action.payload;
        },

        addCandidate: (state: any, action:any) => {
            state.candidatelist.unshift(action.payload);
        },
        // candidate grid

        GetCandidateGrid: (state: any, action: any) => {
            state.candidategrid = action.payload;

        },

        addCandidateGrid: (state: any, action: any) => {
            state.candidategrid.unshift(action.payload);            
        },
    },
});

export const { getCategoryList, addcategoryList, getApplicationList, addNewJobApplicationList, updateJobApplicationList, deleteJobApplicationList, getCandidateList, addCandidate, GetCandidateGrid, addCandidateGrid } = Jobslice.actions;

export default Jobslice.reducer;
